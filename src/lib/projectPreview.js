export function supportsLivePreview(project) {
    return Boolean(project?.livePreview && project?.liveUrl);
}

export function getDefaultPreviewMode(project) {
    return supportsLivePreview(project) ? 'live' : 'snapshot';
}
