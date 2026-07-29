import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/cn';
import { supportsLivePreview, warmProjectPreview } from '../lib/projectPreview';

const viewportWidths = {
    desktop: 1728,
    mobile: 390,
};

export default function ProjectPreviewSurface({
    project,
    device,
    mode,
    preview,
    imageFailed,
    onImageError,
    snapshotScrollRef,
    heightClass,
}) {
    const sharedFrameClass = cn(
        'project-preview-surface mx-auto bg-white shadow-[0_18px_50px_rgba(3,20,39,0.2)]',
        heightClass,
        device === 'desktop'
            ? 'w-full rounded-lg'
            : 'w-full max-w-[21rem] rounded-[1.8rem] border-[0.45rem] border-primary'
    );

    if (mode === 'live' && supportsLivePreview(project)) {
        return (
            <LiveProjectFrame
                project={project}
                device={device}
                preview={preview}
                imageFailed={imageFailed}
                onImageError={onImageError}
                className={sharedFrameClass}
            />
        );
    }

    return (
        <div
            ref={snapshotScrollRef}
            tabIndex={0}
            aria-label={`Scrollable ${device} launch snapshot of ${project.client}`}
            className={cn(
                sharedFrameClass,
                'project-preview-scroll overflow-y-auto overscroll-contain focus-visible:outline-primary'
            )}
        >
            {!preview?.src || imageFailed ? (
                <ProjectPreviewFallback project={project} />
            ) : (
                <img
                    key={`${project.slug}-${device}`}
                    src={preview.src}
                    alt={preview.alt || `${project.client} ${device} launch snapshot`}
                    className="block h-auto w-full"
                    onError={onImageError}
                />
            )}
        </div>
    );
}

function LiveProjectFrame({ project, device, preview, imageFailed, onImageError, className }) {
    const stageRef = useRef(null);
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const [loadedUrl, setLoadedUrl] = useState('');
    const loaded = loadedUrl === project.liveUrl;

    useEffect(() => {
        warmProjectPreview(project);
    }, [project]);

    useLayoutEffect(() => {
        const stage = stageRef.current;
        if (!stage) return undefined;

        const updateSize = () => {
            setStageSize({
                width: stage.clientWidth,
                height: stage.clientHeight,
            });
        };

        updateSize();
        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', updateSize);
            return () => window.removeEventListener('resize', updateSize);
        }

        const observer = new ResizeObserver(updateSize);
        observer.observe(stage);
        return () => observer.disconnect();
    }, []);

    const viewportWidth = viewportWidths[device] || viewportWidths.desktop;
    const scale = stageSize.width
        ? Math.min(stageSize.width / viewportWidth, 1)
        : 1;
    const viewportHeight = stageSize.height
        ? Math.ceil(stageSize.height / Math.max(scale, 0.01))
        : device === 'mobile'
            ? 720
            : 900;

    return (
        <div
            ref={stageRef}
            className={cn(className, 'relative overflow-hidden')}
            aria-label={`Live ${device} preview of ${project.client}`}
            aria-busy={!loaded}
        >
            {!loaded && (
                <div className="absolute inset-0 z-10 overflow-hidden bg-[#eef3f8]" aria-hidden="true">
                    {preview?.src && !imageFailed ? (
                        <img
                            src={preview.src}
                            alt=""
                            fetchPriority="high"
                            className="block h-auto min-h-full w-full object-cover object-top"
                            onError={onImageError}
                        />
                    ) : (
                        <div className="h-full w-full animate-pulse bg-[linear-gradient(110deg,#e6edf4_20%,#f8fafc_45%,#e6edf4_70%)] bg-[length:240%_100%]" />
                    )}
                    <span className="absolute inset-x-0 top-0 h-0.5 origin-left animate-pulse bg-accent/80" />
                </div>
            )}
            <iframe
                src={project.liveUrl}
                title={`Live website preview of ${project.client}`}
                loading="eager"
                fetchPriority="high"
                tabIndex={0}
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allow="autoplay; fullscreen; picture-in-picture"
                onLoad={() => setLoadedUrl(project.liveUrl)}
                className={cn(
                    'block border-0 bg-white transition-opacity duration-200',
                    loaded ? 'opacity-100' : 'opacity-0'
                )}
                style={{
                    width: `${viewportWidth}px`,
                    height: `${viewportHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    visibility: stageSize.width ? 'visible' : 'hidden',
                }}
            />
        </div>
    );
}

function ProjectPreviewFallback({ project }) {
    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center bg-primary p-8 text-center text-white">
            <ShieldCheck className="h-8 w-8 text-sun" aria-hidden="true" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">{project.fallback}</p>
            <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sun underline underline-offset-4"
            >
                Open the live site instead
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
        </div>
    );
}
