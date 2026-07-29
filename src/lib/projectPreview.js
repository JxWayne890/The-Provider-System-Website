export function supportsLivePreview(project) {
    return Boolean(project?.livePreview && project?.liveUrl);
}

const warmedOrigins = new Set();

export function warmProjectPreview(project) {
    if (typeof document === 'undefined' || !supportsLivePreview(project)) return;

    let origin;
    try {
        origin = new URL(project.liveUrl).origin;
    } catch {
        return;
    }

    if (warmedOrigins.has(origin)) return;
    warmedOrigins.add(origin);

    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = origin;
    document.head.appendChild(dnsPrefetch);

    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = origin;
    document.head.appendChild(preconnect);
}
