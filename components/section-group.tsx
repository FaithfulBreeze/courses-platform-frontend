interface SectionGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionGroup({ children, className = '' }: SectionGroupProps) {
  const spacingClass = `space-y-8 sm:space-y-12 md:space-y-16`;

  return (
    <div className={`max-w-7xl mx-auto px-3 sm:px-4 ${spacingClass} ${className}`}>{children}</div>
  );
}
