import crypto from 'node:crypto';

const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const BING_BASE_URL = 'https://ssl.bing.com/webmaster/api.svc/json';

export default async function handler(request, response) {
  setSecurityHeaders(response);

  if (request.method !== 'GET') {
    return sendJson(response, 405, { error: 'Method not allowed' });
  }

  const tokenError = requireAccessToken(request);
  if (tokenError) {
    return sendJson(response, tokenError.status, { error: tokenError.message });
  }

  const url = new URL(request.url, `https://${request.headers.host || 'analytics.local'}`);
  const range = normalizeRange(url.searchParams.get('range') || '28d');
  const endDate = toDateString(addDays(new Date(), -3));
  const startDate = toDateString(addDays(new Date(endDate), -(range.days - 1)));

  const [google, bing] = await Promise.all([
    getGoogleSearchConsole({ startDate, endDate }),
    getBingWebmaster()
  ]);

  return sendJson(response, 200, {
    generatedAt: new Date().toISOString(),
    range: {
      key: range.key,
      label: range.label,
      startDate,
      endDate
    },
    site: {
      name: process.env.SITE_NAME || 'The Provider System',
      url: process.env.PUBLIC_SITE_URL || 'https://theprovidersystem.com/'
    },
    google,
    bing,
    combined: combineProviders(google, bing)
  });
}

function requireAccessToken(request) {
  const expected = process.env.ANALYTICS_ACCESS_TOKEN;
  if (!expected) {
    return { status: 503, message: 'ANALYTICS_ACCESS_TOKEN is not configured.' };
  }

  const header = request.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token || token !== expected) {
    return { status: 401, message: 'Unauthorized analytics request.' };
  }

  return null;
}

function setSecurityHeaders(response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  response.setHeader('X-Content-Type-Options', 'nosniff');
}

function sendJson(response, status, body) {
  response.statusCode = status;
  response.end(JSON.stringify(body));
}

function normalizeRange(range) {
  const options = {
    '7d': { key: '7d', label: 'Last 7 days', days: 7 },
    '28d': { key: '28d', label: 'Last 28 days', days: 28 },
    '90d': { key: '90d', label: 'Last 90 days', days: 90 }
  };
  return options[range] || options['28d'];
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

async function getGoogleSearchConsole({ startDate, endDate }) {
  const configured = Boolean(process.env.GSC_SITE_URL && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);

  if (!configured) {
    return emptyProvider('google', 'Google Search Console credentials are not configured.');
  }

  try {
    const accessToken = await getGoogleAccessToken();
    const [dates, queries, pages, devices, countries] = await Promise.all([
      queryGoogle(accessToken, { startDate, endDate, dimensions: ['date'], rowLimit: 250 }),
      queryGoogle(accessToken, { startDate, endDate, dimensions: ['query'], rowLimit: 50 }),
      queryGoogle(accessToken, { startDate, endDate, dimensions: ['page'], rowLimit: 50 }),
      queryGoogle(accessToken, { startDate, endDate, dimensions: ['device'], rowLimit: 10 }),
      queryGoogle(accessToken, { startDate, endDate, dimensions: ['country'], rowLimit: 25 })
    ]);

    return {
      id: 'google',
      name: 'Google Search Console',
      configured: true,
      error: null,
      totals: sumRows(dates.rows || []),
      trends: normalizeRows(dates.rows || [], 'date'),
      queries: normalizeRows(queries.rows || [], 'query'),
      pages: normalizeRows(pages.rows || [], 'page'),
      devices: normalizeRows(devices.rows || [], 'device'),
      countries: normalizeRows(countries.rows || [], 'country')
    };
  } catch (error) {
    return emptyProvider('google', error.message || 'Google Search Console request failed.');
  }
}

async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(JSON.stringify({
    iss: process.env.GOOGLE_CLIENT_EMAIL,
    scope: GOOGLE_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600
  }));
  const unsignedJwt = `${header}.${claims}`;
  const key = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);
  const signature = crypto.createSign('RSA-SHA256').update(unsignedJwt).sign(key, 'base64url');
  const assertion = `${unsignedJwt}.${signature}`;

  const result = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });

  const json = await result.json();
  if (!result.ok) {
    throw new Error(json.error_description || json.error || 'Could not create Google access token.');
  }
  return json.access_token;
}

function normalizePrivateKey(value = '') {
  return value.replace(/\\n/g, '\n');
}

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

async function queryGoogle(accessToken, body) {
  const siteUrl = encodeURIComponent(process.env.GSC_SITE_URL);
  const result = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      startDate: body.startDate,
      endDate: body.endDate,
      dimensions: body.dimensions,
      rowLimit: body.rowLimit,
      dataState: 'final'
    })
  });

  const json = await result.json();
  if (!result.ok) {
    throw new Error(json.error?.message || 'Search Console query failed.');
  }
  return json;
}

async function getBingWebmaster() {
  const configured = Boolean(process.env.BING_SITE_URL && process.env.BING_API_KEY);

  if (!configured) {
    return emptyProvider('bing', 'Bing Webmaster API credentials are not configured.');
  }

  try {
    const [queryStats, pageStats, rankTraffic, crawlStats, quota] = await Promise.all([
      queryBing('GetQueryStats', { siteUrl: process.env.BING_SITE_URL }),
      queryBing('GetPageStats', { siteUrl: process.env.BING_SITE_URL }),
      queryBing('GetRankAndTrafficStats', { siteUrl: process.env.BING_SITE_URL }),
      queryBing('GetCrawlStats', { siteUrl: process.env.BING_SITE_URL }),
      queryBing('GetUrlSubmissionQuota', { siteUrl: process.env.BING_SITE_URL })
    ]);

    const queries = normalizeBingRows(unwrapBing(queryStats), 'query');
    const pages = normalizeBingRows(unwrapBing(pageStats), 'page');
    const trafficRows = normalizeBingRows(unwrapBing(rankTraffic), 'date');

    return {
      id: 'bing',
      name: 'Bing Webmaster Tools',
      configured: true,
      error: null,
      totals: sumRows(trafficRows.length ? trafficRows : queries),
      trends: trafficRows,
      queries,
      pages,
      devices: [],
      countries: [],
      crawl: unwrapBing(crawlStats),
      quota: unwrapBing(quota)
    };
  } catch (error) {
    return emptyProvider('bing', error.message || 'Bing Webmaster request failed.');
  }
}

async function queryBing(method, params) {
  const url = new URL(`${BING_BASE_URL}/${method}`);
  url.searchParams.set('apikey', process.env.BING_API_KEY);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const result = await fetch(url);
  const text = await result.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }

  if (!result.ok) {
    throw new Error(json?.error?.message || json?.Message || `${method} failed.`);
  }
  return json;
}

function unwrapBing(payload) {
  return payload?.d ?? payload?.value ?? payload;
}

function normalizeBingRows(raw, fallbackKey) {
  const rows = Array.isArray(raw) ? raw : Array.isArray(raw?.Results) ? raw.Results : [];

  return rows.map((row) => {
    const key = row.Query || row.query || row.Page || row.Url || row.url || row.Date || row.date || row[fallbackKey] || 'Unknown';
    const clicks = numberFrom(row.Clicks ?? row.clicks ?? row.TotalClicks ?? row.ClickCount);
    const impressions = numberFrom(row.Impressions ?? row.impressions ?? row.TotalImpressions ?? row.ImpressionCount);
    const ctr = numberFrom(row.Ctr ?? row.CTR ?? row.ctr ?? (impressions ? clicks / impressions : 0));
    const position = numberFrom(row.AveragePosition ?? row.AvgPosition ?? row.Position ?? row.position);

    return { key: String(key), clicks, impressions, ctr, position };
  });
}

function normalizeRows(rows, keyName) {
  return rows.map((row) => ({
    key: row.keys?.[0] || 'Unknown',
    type: keyName,
    clicks: numberFrom(row.clicks),
    impressions: numberFrom(row.impressions),
    ctr: numberFrom(row.ctr),
    position: numberFrom(row.position)
  }));
}

function sumRows(rows) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.clicks += numberFrom(row.clicks);
      acc.impressions += numberFrom(row.impressions);
      return acc;
    },
    { clicks: 0, impressions: 0 }
  );

  totals.ctr = totals.impressions ? totals.clicks / totals.impressions : 0;
  const positioned = rows.filter((row) => numberFrom(row.position) > 0);
  totals.position = positioned.length
    ? positioned.reduce((sum, row) => sum + numberFrom(row.position), 0) / positioned.length
    : 0;
  return totals;
}

function combineProviders(google, bing) {
  const providers = [google, bing].filter((provider) => provider.configured && !provider.error);
  const rows = providers.flatMap((provider) => provider.queries.map((row) => ({ ...row, provider: provider.name })));
  const pages = providers.flatMap((provider) => provider.pages.map((row) => ({ ...row, provider: provider.name })));

  return {
    totals: sumRows(providers.flatMap((provider) => provider.trends.length ? provider.trends : provider.queries)),
    queries: mergeRows(rows),
    pages: mergeRows(pages)
  };
}

function mergeRows(rows) {
  const merged = new Map();
  rows.forEach((row) => {
    const current = merged.get(row.key) || { key: row.key, clicks: 0, impressions: 0, providers: new Set() };
    current.clicks += numberFrom(row.clicks);
    current.impressions += numberFrom(row.impressions);
    current.providers.add(row.provider);
    merged.set(row.key, current);
  });

  return [...merged.values()]
    .map((row) => ({
      key: row.key,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.impressions ? row.clicks / row.impressions : 0,
      providers: [...row.providers]
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 50);
}

function numberFrom(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function emptyProvider(id, message) {
  return {
    id,
    name: id === 'google' ? 'Google Search Console' : 'Bing Webmaster Tools',
    configured: false,
    error: message,
    totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    trends: [],
    queries: [],
    pages: [],
    devices: [],
    countries: [],
    crawl: null,
    quota: null
  };
}
