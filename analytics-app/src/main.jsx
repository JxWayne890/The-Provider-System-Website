import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Eye,
  KeyRound,
  LineChart,
  Lock,
  MousePointerClick,
  RefreshCcw,
  Search,
  Settings,
  TrendingUp
} from 'lucide-react';
import './styles.css';

const ACCESS_STORAGE_KEY = 'provider_analytics_access_token';
const ranges = [
  { key: '7d', label: '7 days' },
  { key: '28d', label: '28 days' },
  { key: '90d', label: '90 days' }
];

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(ACCESS_STORAGE_KEY) || '');
  const [range, setRange] = useState('28d');
  const [state, setState] = useState({ loading: false, error: '', data: null });

  const isUnlocked = Boolean(token);

  const loadAnalytics = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: '' }));
    try {
      const result = await fetch(`/api/analytics?range=${range}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await result.json();
      if (!result.ok) {
        throw new Error(json.error || 'Analytics request failed.');
      }
      setState({ loading: false, error: '', data: json });
    } catch (error) {
      setState({ loading: false, error: error.message, data: null });
    }
  }, [range, token]);

  useEffect(() => {
    if (!isUnlocked) return;
    loadAnalytics();
  }, [isUnlocked, loadAnalytics]);

  function handleUnlock(value) {
    localStorage.setItem(ACCESS_STORAGE_KEY, value);
    setToken(value);
  }

  function handleLock() {
    localStorage.removeItem(ACCESS_STORAGE_KEY);
    setToken('');
    setState({ loading: false, error: '', data: null });
  }

  if (!isUnlocked) {
    return <LoginScreen onUnlock={handleUnlock} />;
  }

  return (
    <DashboardShell
      range={range}
      setRange={setRange}
      state={state}
      onRefresh={loadAnalytics}
      onLock={handleLock}
    />
  );
}

function LoginScreen({ onUnlock }) {
  const [value, setValue] = useState('');

  function submit(event) {
    event.preventDefault();
    if (value.trim()) {
      onUnlock(value.trim());
    }
  }

  return (
    <main className="login-screen">
      <section className="login-panel">
        <div className="brand-lockup">
          <div>
            <span className="script">The</span>
            <strong>PROVIDER</strong>
            <span className="system">SYSTEM</span>
          </div>
        </div>
        <div className="login-copy">
          <span className="eyebrow">Private search dashboard</span>
          <h1>Analytics for the searches that find your business.</h1>
          <p>
            Enter your analytics access token to view Google Search Console and Bing
            Webmaster data for The Provider System.
          </p>
        </div>
        <form className="login-form" onSubmit={submit}>
          <label htmlFor="access-token">Access token</label>
          <div className="token-row">
            <KeyRound aria-hidden="true" size={18} />
            <input
              id="access-token"
              type="password"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Paste private token"
              autoComplete="current-password"
            />
          </div>
          <button type="submit">
            <Lock size={17} aria-hidden="true" />
            Open Dashboard
          </button>
        </form>
      </section>
    </main>
  );
}

function DashboardShell({ range, setRange, state, onRefresh, onLock }) {
  const data = state.data;
  const google = data?.google;
  const bing = data?.bing;
  const combined = data?.combined;
  const googleReady = Boolean(google?.configured && !google?.error);
  const bingReady = Boolean(bing?.configured && !bing?.error);
  const allProvidersReady = googleReady && bingReady;
  const queryEmptyCopy = allProvidersReady
    ? 'No search queries yet. Google and Bing are connected; new verified properties can take 24 to 48 hours before search data appears.'
    : 'No search queries yet. Connect Google/Bing credentials or wait for search data.';

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="script">The</span>
          <strong>PROVIDER</strong>
          <span>SYSTEM</span>
        </div>
        <nav className="nav-stack" aria-label="Analytics sections">
          <a href="#overview"><BarChart3 size={16} /> Overview</a>
          <a href="#queries"><Search size={16} /> Searches</a>
          <a href="#pages"><Activity size={16} /> Pages</a>
          <a href="#setup"><Settings size={16} /> Setup</a>
        </nav>
        <button className="lock-button" type="button" onClick={onLock}>
          <Lock size={15} aria-hidden="true" />
          Lock dashboard
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">analytics.theprovidersystem.com</span>
            <h1>Search Performance Dashboard</h1>
            <p>
              Google Search Console and Bing Webmaster visibility for search terms,
              pages, clicks, impressions, CTR, and average position.
            </p>
          </div>
          <div className="toolbar">
            <div className="segmented" aria-label="Date range">
              {ranges.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={range === item.key ? 'active' : ''}
                  onClick={() => setRange(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="refresh" type="button" onClick={onRefresh} disabled={state.loading}>
              <RefreshCcw size={16} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </header>

        {state.error && (
          <StatusBanner tone="danger" title="Dashboard could not load">
            {state.error}
          </StatusBanner>
        )}

        {!state.error && state.loading && !data && <LoadingState />}

        {data && (
          <>
            <section className="provider-row" id="setup">
              <ProviderStatus provider={google} />
              <ProviderStatus provider={bing} />
              <div className="status-card">
                <div className="status-icon neutral"><ExternalLink size={18} /></div>
                <div>
                  <h3>Site tracked</h3>
                  <p>{data.site.url}</p>
                  <span>{data.range.startDate} to {data.range.endDate}</span>
                </div>
              </div>
            </section>

            <section className="kpi-grid" id="overview">
              <MetricCard label="Combined Clicks" value={formatNumber(combined.totals.clicks)} icon={MousePointerClick} />
              <MetricCard label="Combined Impressions" value={formatNumber(combined.totals.impressions)} icon={Eye} />
              <MetricCard label="Combined CTR" value={formatPercent(combined.totals.ctr)} icon={TrendingUp} />
              <MetricCard label="Google Avg Position" value={formatPosition(google.totals.position)} icon={LineChart} />
            </section>

            <section className="panel trend-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Google trend</span>
                  <h2>Clicks and impressions over time</h2>
                </div>
                <span className="subtle">{google.trends.length || 0} daily points</span>
              </div>
              <TrendChart rows={google.trends} />
            </section>

            <section className="two-column">
              <DataTable
                id="queries"
                title="What People Search"
                eyebrow="Combined Google + Bing"
                rows={combined.queries}
                primaryLabel="Search query"
                empty={queryEmptyCopy}
              />
              <DataTable
                id="pages"
                title="Pages Being Found"
                eyebrow="Combined Google + Bing"
                rows={combined.pages}
                primaryLabel="Page"
                empty="No page data yet."
              />
            </section>

            <section className="two-column">
              <DataTable
                title="Google Devices"
                eyebrow="Search Console"
                rows={google.devices}
                primaryLabel="Device"
                empty="No device data available."
              />
              <DataTable
                title="Google Countries"
                eyebrow="Search Console"
                rows={google.countries}
                primaryLabel="Country"
                empty="No country data available."
              />
            </section>

            <section className="setup-panel">
              <div>
                <span className="eyebrow">connection status</span>
                <h2>{allProvidersReady ? 'Data sources connected' : 'What still needs credentials'}</h2>
                <p>
                  {allProvidersReady
                    ? 'Google Search Console and Bing Webmaster Tools are connected. New verified properties can take 24 to 48 hours before queries, pages, and trend rows appear.'
                    : 'This app is ready for real data, but the APIs need private credentials stored in the Vercel project for the analytics subdomain.'}
                </p>
              </div>
              <ul>
                {allProvidersReady ? (
                  <>
                    <li><code>Google Search Console</code> is connected through the service account.</li>
                    <li><code>Bing Webmaster Tools</code> is verified and connected through the API key.</li>
                    <li>Current reporting window: {data.range.startDate} to {data.range.endDate}.</li>
                  </>
                ) : (
                  <>
                    <li><code>ANALYTICS_ACCESS_TOKEN</code> protects the dashboard.</li>
                    <li><code>GOOGLE_CLIENT_EMAIL</code> and <code>GOOGLE_PRIVATE_KEY</code> power Search Console.</li>
                    <li><code>BING_API_KEY</code> powers Bing Webmaster Tools.</li>
                    <li><code>GSC_SITE_URL</code> and <code>BING_SITE_URL</code> must match verified properties.</li>
                  </>
                )}
              </ul>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function ProviderStatus({ provider }) {
  const ready = provider?.configured && !provider?.error;
  return (
    <div className="status-card">
      <div className={`status-icon ${ready ? 'ready' : 'warning'}`}>
        {ready ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
      </div>
      <div>
        <h3>{provider?.name}</h3>
        <p>{ready ? 'Connected and returning data.' : provider?.error || 'Not connected yet.'}</p>
        <span>{ready ? 'Live provider' : 'Needs env setup'}</span>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <article className="metric-card">
      <div className="metric-icon">
        {React.createElement(icon, { size: 20, 'aria-hidden': true })}
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function DataTable({ id, title, eyebrow, rows, primaryLabel, empty }) {
  return (
    <section className="panel" id={id}>
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <span className="subtle">{rows.length} rows</span>
      </div>
      {rows.length === 0 ? (
        <div className="empty-state">{empty}</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{primaryLabel}</th>
                <th>Clicks</th>
                <th>Impressions</th>
                <th>CTR</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 12).map((row) => (
                <tr key={row.key}>
                  <td>
                    <span className="row-key">{row.key}</span>
                    {row.providers && <small>{row.providers.join(' + ')}</small>}
                  </td>
                  <td>{formatNumber(row.clicks)}</td>
                  <td>{formatNumber(row.impressions)}</td>
                  <td>{formatPercent(row.ctr)}</td>
                  <td>{formatPosition(row.position)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function TrendChart({ rows }) {
  const points = useMemo(() => {
    if (!rows.length) return '';
    const width = 720;
    const height = 180;
    const max = Math.max(...rows.map((row) => row.clicks), 1);
    return rows
      .map((row, index) => {
        const x = rows.length === 1 ? 0 : (index / (rows.length - 1)) * width;
        const y = height - (row.clicks / max) * height;
        return `${x},${y}`;
      })
      .join(' ');
  }, [rows]);

  if (!rows.length) {
    return <div className="empty-chart">No Google trend data yet.</div>;
  }

  return (
    <svg className="trend-chart" viewBox="0 0 720 210" role="img" aria-label="Search clicks trend">
      <defs>
        <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff9f1c" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke="#ff9f1c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,180 ${points} 720,180`} fill="url(#trendFill)" />
      <line x1="0" y1="180" x2="720" y2="180" stroke="#d9e0ea" />
    </svg>
  );
}

function StatusBanner({ tone, title, children }) {
  return (
    <div className={`status-banner ${tone}`}>
      <AlertTriangle size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-state">
      <RefreshCcw className="spin" size={20} />
      Loading analytics...
    </div>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(Math.round(Number(value) || 0));
}

function formatPercent(value) {
  return `${((Number(value) || 0) * 100).toFixed(1)}%`;
}

function formatPosition(value) {
  const number = Number(value);
  return number > 0 ? number.toFixed(1) : '-';
}

createRoot(document.getElementById('root')).render(<App />);
