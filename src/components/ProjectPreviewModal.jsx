import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Monitor, ShieldCheck, Smartphone, X } from 'lucide-react';
import { cn } from '../lib/cn';

export default function ProjectPreviewModal({ project, onClose }) {
    const [device, setDevice] = useState('desktop');
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const previousFocusRef = useRef(null);

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
                className="relative flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.6rem] bg-background shadow-2xl"
            >
                <header className="flex items-start justify-between gap-5 border-b border-primary/10 bg-white px-5 py-4 sm:px-7">
                    <div>
                        <div className="mb-1 flex items-center gap-2 font-data text-[0.58rem] font-bold uppercase tracking-[0.16em] text-teal">
                            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                            Static, safety-first preview
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

                <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[1fr_18rem]">
                    <div className="min-h-0 overflow-y-auto p-4 sm:p-7">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div
                                role="group"
                                aria-label="Preview viewport"
                                className="inline-flex w-fit rounded-full border border-primary/10 bg-white p-1"
                            >
                                <button
                                    type="button"
                                    onClick={() => setDevice('desktop')}
                                    aria-pressed={device === 'desktop'}
                                    className={cn(
                                        'flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition',
                                        device === 'desktop' ? 'bg-primary text-white' : 'text-muted hover:text-primary'
                                    )}
                                >
                                    <Monitor className="h-4 w-4" aria-hidden="true" />
                                    Desktop
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDevice('mobile')}
                                    aria-pressed={device === 'mobile'}
                                    className={cn(
                                        'flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition',
                                        device === 'mobile' ? 'bg-primary text-white' : 'text-muted hover:text-primary'
                                    )}
                                >
                                    <Smartphone className="h-4 w-4" aria-hidden="true" />
                                    Mobile
                                </button>
                            </div>
                            <p className="text-xs leading-5 text-muted">
                                Screenshots are portfolio records. The live site may have changed.
                            </p>
                        </div>

                        <div
                            className={cn(
                                'mx-auto overflow-hidden border-[0.55rem] border-primary bg-white shadow-lift',
                                device === 'desktop'
                                    ? 'aspect-[16/10] w-full rounded-2xl'
                                    : 'aspect-[9/16] w-full max-w-[22rem] rounded-[2.25rem]'
                            )}
                        >
                            <PreviewImage key={`${project.slug}-${device}`} project={project} preview={preview} />
                        </div>
                    </div>

                    <aside className="border-t border-primary/10 bg-white p-6 lg:border-l lg:border-t-0 lg:p-7">
                        <p className="font-data text-[0.58rem] font-bold uppercase tracking-[0.16em] text-accent">
                            What you are viewing
                        </p>
                        <p className="mt-4 text-sm leading-6 text-muted">
                            {project.summary}
                        </p>
                        <div className="mt-6 border-t border-primary/10 pt-6">
                            <p className="text-xs leading-5 text-muted">
                                Client sites are not loaded inside this page. That avoids frame-policy failures,
                                unwanted third-party scripts, and confusing form or analytics behavior.
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

function PreviewImage({ project, preview }) {
    const [failed, setFailed] = useState(false);

    if (!preview?.src || failed) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-primary p-8 text-center text-white">
                <ShieldCheck className="h-8 w-8 text-sun" aria-hidden="true" />
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
                    {project.fallback}
                </p>
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 text-sm font-bold text-sun underline underline-offset-4"
                >
                    Open the live site instead
                </a>
            </div>
        );
    }

    return (
        <img
            src={preview.src}
            alt={preview.alt || `${project.client} ${project.previewMode} preview`}
            className="h-full w-full object-cover object-top"
            onError={() => setFailed(true)}
        />
    );
}
