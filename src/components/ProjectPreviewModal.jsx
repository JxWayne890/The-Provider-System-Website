import { useEffect, useRef, useState } from 'react';
import {
    ExternalLink,
    Monitor,
    ShieldCheck,
    Smartphone,
    X,
} from 'lucide-react';
import ProjectPreviewSurface from './ProjectPreviewSurface';
import { cn } from '../lib/cn';

export default function ProjectPreviewModal({ project, onClose }) {
    const [device, setDevice] = useState('desktop');
    const [failedPreviewKey, setFailedPreviewKey] = useState(null);
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const previousFocusRef = useRef(null);
    const previewViewportRef = useRef(null);

    useEffect(() => {
        previousFocusRef.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const dialog = dialogRef.current;
        const handleKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }
            if (event.key !== 'Tab' || !dialog) return;

            const focusable = dialog.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        dialog?.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            dialog?.removeEventListener('keydown', handleKey);
            previousFocusRef.current?.focus?.();
        };
    }, [onClose]);

    const preview = project.preview?.[device];
    const previewKey = `${project.slug}-${device}`;
    const imageFailed = failedPreviewKey === previewKey;

    useEffect(() => {
        if (previewViewportRef.current) previewViewportRef.current.scrollTop = 0;
    }, [device, project.slug]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-dark/80 backdrop-blur-sm"
                aria-label="Close project preview"
            />
            <section
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`preview-title-${project.slug}`}
                className="relative flex max-h-[94dvh] w-full max-w-[96rem] flex-col overflow-hidden rounded-[1.6rem] bg-background shadow-2xl"
            >
                <header className="flex items-start justify-between gap-5 border-b border-primary/10 bg-white px-5 py-4 sm:px-7">
                    <div>
                        <div className="mb-1 flex items-center gap-2 font-data text-[0.58rem] font-bold uppercase tracking-[0.16em] text-teal">
                            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                            Project preview
                        </div>
                        <h2 id={`preview-title-${project.slug}`} className="text-xl font-bold text-primary sm:text-2xl">
                            {project.client}
                        </h2>
                    </div>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        className="grid h-11 w-11 flex-none place-items-center rounded-full border border-primary/15 bg-background text-primary"
                        aria-label="Close preview"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </header>

                <div className="flex min-h-0 flex-1 flex-col xl:grid xl:grid-cols-[minmax(0,1fr)_17rem]">
                    <div className="min-h-0 overflow-y-auto p-4 sm:p-7">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                <div
                                    role="group"
                                    aria-label="Preview viewport"
                                    className="inline-flex w-fit rounded-full border border-primary/10 bg-white p-1"
                                >
                                    <button
                                        type="button"
                                        title="Desktop preview"
                                        onClick={() => setDevice('desktop')}
                                        aria-label="Show desktop preview"
                                        aria-pressed={device === 'desktop'}
                                        className={cn(
                                            'grid h-10 w-10 place-items-center rounded-full transition',
                                            device === 'desktop' ? 'bg-primary text-white' : 'text-muted hover:text-primary'
                                        )}
                                    >
                                        <Monitor className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        title="Mobile preview"
                                        onClick={() => setDevice('mobile')}
                                        aria-label="Show mobile preview"
                                        aria-pressed={device === 'mobile'}
                                        className={cn(
                                            'grid h-10 w-10 place-items-center rounded-full transition',
                                            device === 'mobile' ? 'bg-primary text-white' : 'text-muted hover:text-primary'
                                        )}
                                    >
                                        <Smartphone className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs leading-5 text-muted">
                                Scroll through the stored launch view, or open the current live site in a new tab.
                            </p>
                        </div>

                        <ProjectPreviewSurface
                            project={project}
                            device={device}
                            mode="snapshot"
                            preview={preview}
                            imageFailed={imageFailed}
                            onImageError={() => setFailedPreviewKey(previewKey)}
                            snapshotScrollRef={previewViewportRef}
                            heightClass={device === 'desktop' ? 'h-[min(58dvh,38rem)]' : 'h-[62dvh]'}
                        />
                    </div>

                    <aside className="border-t border-primary/10 bg-white p-6 xl:border-l xl:border-t-0 xl:p-7">
                        <p className="font-data text-[0.58rem] font-bold uppercase tracking-[0.16em] text-accent">
                            What you are viewing
                        </p>
                        <p className="mt-4 text-sm leading-6 text-muted">
                            {project.summary}
                        </p>
                        <div className="mt-6 border-t border-primary/10 pt-6">
                            <p className="text-xs leading-5 text-muted">
                                This stored desktop or mobile view keeps the portfolio reliable even when a client site blocks third-party embedding. Use the button below for the current public experience.
                            </p>
                        </div>
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary mt-6 w-full"
                        >
                            Open live site
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </aside>
                </div>
            </section>
        </div>
    );
}
