interface SectionBlockProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionBlock({
  title,
  subtitle,
  action,
  children,
  className = '',
}: SectionBlockProps) {
  return (
    <section className={`mb-12 sm:mb-16 ${className}`}>
      <div
        className={`mb-4 sm:mb-6 ${action ? 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4' : ''}`}
      >
        <div>
          <h3 className="text-sm sm:text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action && <div className="text-left sm:text-right">{action}</div>}
      </div>
      {children}
    </section>
  );
}
