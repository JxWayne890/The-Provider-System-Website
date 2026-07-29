import { useEffect, useRef, useState } from 'react';
import { ExternalLink, LoaderCircle, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/cn';
import { supportsLivePreview } from '../lib/projectPreview';

const viewportWidths = {
    desktop: 1440,
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
                key={`${project.slug}-${device}`}
                project={project}
                device={device}
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

function LiveProjectFrame({ project, device, className }) {
    const stageRef = useRef(null);
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
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
        >
            {!loaded && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-[#eef3f8] text-primary">
                    <div className="text-center">
                        <LoaderCircle className="mx-auto h-6 w-6 animate-spin text-accent" aria-hidden="true" />
                        <p className="mt-3 font-data text-[0.52rem] uppercase tracking-[0.12em] text-primary/55">
                            Loading live site
                        </p>
                    </div>
                </div>
            )}
            <iframe
                src={project.liveUrl}
                title={`Live website preview of ${project.client}`}
                loading="lazy"
                tabIndex={0}
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allow="autoplay; fullscreen; picture-in-picture"
                onLoad={() => setLoaded(true)}
                className="block border-0 bg-white"
                style={{
                    width: `${viewportWidth}px`,
                    height: `${viewportHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    opacity: stageSize.width ? 1 : 0,
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
