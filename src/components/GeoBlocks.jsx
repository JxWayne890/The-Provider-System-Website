const getTheme = (theme) => {
    const isDark = theme === 'dark';

    return {
        eyebrow: isDark ? 'text-accent' : 'text-accent',
        title: isDark ? 'text-white' : 'text-primary',
        intro: isDark ? 'text-white/60' : 'text-muted',
        card: isDark
            ? 'bg-white/[0.04] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)]'
            : 'bg-white border border-muted/10 shadow-xl shadow-muted/5',
        label: isDark ? 'text-white' : 'text-primary',
        copy: isDark ? 'text-white/70' : 'text-muted',
        tableWrap: isDark
            ? 'bg-white/[0.04] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)]'
            : 'bg-white border border-muted/10 shadow-xl shadow-muted/5',
        th: isDark ? 'bg-white/[0.04] text-white/70 border-white/10' : 'bg-primary text-white/75 border-primary/20',
        td: isDark ? 'border-white/10 text-white/70' : 'border-muted/10 text-muted',
        note: isDark ? 'text-white/55' : 'text-muted/80',
    };
};

export function GeoCapsuleGrid({ eyebrow, title, intro, capsules, theme = 'light', className = '' }) {
    const styles = getTheme(theme);

    return (
        <div className={className}>
            {(eyebrow || title || intro) && (
                <div className="mb-8">
                    {eyebrow && (
                        <span className={`font-data text-xs uppercase tracking-[0.24em] ${styles.eyebrow}`}>
                            {eyebrow}
                        </span>
                    )}
                    {title && (
                        <h2 className={`font-heading font-bold text-3xl md:text-4xl mt-3 ${styles.title}`}>
                            {title}
                        </h2>
                    )}
                    {intro && (
                        <p className={`font-heading text-base md:text-lg leading-relaxed max-w-3xl mt-4 ${styles.intro}`}>
                            {intro}
                        </p>
                    )}
                </div>
            )}

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {capsules.map((capsule) => (
                    <div key={capsule.label} className={`rounded-[2rem] p-6 md:p-7 ${styles.card}`}>
                        <dt className={`font-data text-xs uppercase tracking-[0.18em] ${styles.eyebrow}`}>
                            {capsule.label}
                        </dt>
                        <dd className={`font-heading text-base md:text-lg leading-relaxed mt-4 ${styles.copy}`}>
                            {capsule.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export function GeoQuestionGrid({ eyebrow, title, intro, items, theme = 'light', className = '' }) {
    const styles = getTheme(theme);

    return (
        <div className={className}>
            {(eyebrow || title || intro) && (
                <div className="mb-8">
                    {eyebrow && (
                        <span className={`font-data text-xs uppercase tracking-[0.24em] ${styles.eyebrow}`}>
                            {eyebrow}
                        </span>
                    )}
                    {title && (
                        <h2 className={`font-heading font-bold text-3xl md:text-4xl mt-3 ${styles.title}`}>
                            {title}
                        </h2>
                    )}
                    {intro && (
                        <p className={`font-heading text-base md:text-lg leading-relaxed max-w-3xl mt-4 ${styles.intro}`}>
                            {intro}
                        </p>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map((item) => (
                    <article key={item.question} className={`rounded-[2rem] p-6 md:p-7 ${styles.card}`}>
                        <h3 className={`font-heading font-bold text-xl leading-tight ${styles.label}`}>
                            {item.question}
                        </h3>
                        <p className={`font-heading text-base leading-relaxed mt-4 ${styles.copy}`}>
                            {item.answer}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}

export function GeoComparisonTable({
    eyebrow,
    title,
    intro,
    columns,
    rows,
    note,
    theme = 'light',
    className = '',
}) {
    const styles = getTheme(theme);

    return (
        <div className={className}>
            {(eyebrow || title || intro) && (
                <div className="mb-8">
                    {eyebrow && (
                        <span className={`font-data text-xs uppercase tracking-[0.24em] ${styles.eyebrow}`}>
                            {eyebrow}
                        </span>
                    )}
                    {title && (
                        <h2 className={`font-heading font-bold text-3xl md:text-4xl mt-3 ${styles.title}`}>
                            {title}
                        </h2>
                    )}
                    {intro && (
                        <p className={`font-heading text-base md:text-lg leading-relaxed max-w-3xl mt-4 ${styles.intro}`}>
                            {intro}
                        </p>
                    )}
                </div>
            )}

            <div className={`rounded-[2rem] overflow-hidden ${styles.tableWrap}`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column}
                                        scope="col"
                                        className={`px-5 py-4 text-left font-data text-xs uppercase tracking-[0.18em] border-b ${styles.th}`}
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row[0]}>
                                    {row.map((cell, index) => (
                                        <td
                                            key={`${row[0]}-${index}`}
                                            className={`px-5 py-4 align-top font-heading text-sm md:text-base leading-relaxed border-t ${styles.td} ${index === 0 ? 'font-bold' : ''}`}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {note && (
                <p className={`font-heading text-sm md:text-base leading-relaxed mt-4 ${styles.note}`}>
                    {note}
                </p>
            )}
        </div>
    );
}
