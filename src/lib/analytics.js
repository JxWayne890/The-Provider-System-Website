const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || 'G-4NN7E5E3Q7';
const ATTRIBUTION_STORAGE_KEY = 'provider-system-attribution-v1';
const UTM_FIELDS = {
    utm_source: 'utmSource',
    utm_medium: 'utmMedium',
    utm_campaign: 'utmCampaign',
    utm_term: 'utmTerm',
    utm_content: 'utmContent',
};

let analyticsInitialized = false;
let pageViewTimer;
let lastTrackedPath = '';

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const isProductionHostname = () => ['theprovidersystem.com', 'www.theprovidersystem.com']
    .includes(window.location.hostname.toLowerCase());

const isValidMeasurementId = (value) => /^G-[A-Z0-9]+$/i.test(value || '');

const currentPagePath = () => window.location.pathname;

const cleanEventValue = (value, maxLength = 160) => String(value || '').trim().slice(0, maxLength);

const safeUrlWithoutQuery = (value) => {
    if (!value) return '';
    try {
        const url = new URL(value, window.location.origin);
        return `${url.origin}${url.pathname}`;
    } catch {
        return '';
    }
};

function readStoredAttribution() {
    try {
        return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || 'null');
    } catch {
        return null;
    }
}

function writeStoredAttribution(attribution) {
    try {
        window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    } catch {
        // Attribution still works for the current page when storage is unavailable.
    }
}

function captureAttribution() {
    if (!isBrowser() || readStoredAttribution()) return;

    const searchParams = new URLSearchParams(window.location.search);
    const attribution = {
        landingPage: currentPagePath(),
        referrer: safeUrlWithoutQuery(document.referrer),
    };

    Object.entries(UTM_FIELDS).forEach(([queryKey, fieldName]) => {
        attribution[fieldName] = cleanEventValue(searchParams.get(queryKey), 200);
    });

    writeStoredAttribution(attribution);
}

export function getLeadAttribution() {
    if (!isBrowser()) {
        return {
            source: 'Website',
            page: '',
            landingPage: '',
            referrer: '',
        };
    }

    captureAttribution();
    const attribution = readStoredAttribution() || {};

    return {
        source: 'Website',
        page: currentPagePath(),
        landingPage: attribution.landingPage || currentPagePath(),
        referrer: attribution.referrer || safeUrlWithoutQuery(document.referrer),
        utmSource: attribution.utmSource || '',
        utmMedium: attribution.utmMedium || '',
        utmCampaign: attribution.utmCampaign || '',
        utmTerm: attribution.utmTerm || '',
        utmContent: attribution.utmContent || '',
    };
}

export function trackEvent(eventName, parameters = {}) {
    if (!analyticsInitialized || typeof window.gtag !== 'function') return;

    const safeParameters = Object.fromEntries(
        Object.entries(parameters)
            .filter(([, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => [key, typeof value === 'string' ? cleanEventValue(value) : value])
    );

    window.gtag('event', eventName, safeParameters);
}

function trackPageView() {
    const pagePath = currentPagePath();
    if (pagePath === lastTrackedPath) return;

    lastTrackedPath = pagePath;
    trackEvent('page_view', {
        page_path: pagePath,
        page_location: window.location.href.split('#')[0],
        page_title: document.title,
    });
}

function schedulePageView() {
    window.clearTimeout(pageViewTimer);
    pageViewTimer = window.setTimeout(trackPageView, 250);
}

function patchHistoryMethod(methodName) {
    const originalMethod = window.history[methodName];
    window.history[methodName] = function patchedHistoryMethod(...args) {
        const result = originalMethod.apply(this, args);
        schedulePageView();
        return result;
    };
}

function handleTrackedClick(event) {
    const target = event.target instanceof Element ? event.target.closest('a[href], button') : null;
    if (!target) return;

    const href = target instanceof HTMLAnchorElement ? target.getAttribute('href') || '' : '';
    const label = cleanEventValue(target.textContent, 100);

    if (href.startsWith('tel:')) {
        trackEvent('phone_click', {
            link_text: label,
            page_path: currentPagePath(),
        });
    }

    let isLeadReviewLink = false;
    if (href) {
        try {
            const url = new URL(href, window.location.origin);
            isLeadReviewLink = url.origin === window.location.origin && url.pathname === '/start';
        } catch {
            isLeadReviewLink = false;
        }
    }

    if (isLeadReviewLink) {
        trackEvent('primary_cta_click', {
            link_text: label,
            link_url: '/start',
            page_path: currentPagePath(),
        });
    }
}

export function initializeAnalytics() {
    if (!isBrowser()) return false;

    captureAttribution();
    if (!isProductionHostname() || !isValidMeasurementId(GA_MEASUREMENT_ID) || analyticsInitialized) {
        return analyticsInitialized;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false,
        anonymize_ip: true,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    script.id = 'provider-system-google-analytics';
    document.head.appendChild(script);

    analyticsInitialized = true;
    patchHistoryMethod('pushState');
    patchHistoryMethod('replaceState');
    window.addEventListener('popstate', schedulePageView);
    document.addEventListener('click', handleTrackedClick, true);
    schedulePageView();

    return true;
}
