interface SectionGroupProps {
  children: React.ReactNode;
  spacing?: number; // Tailwind spacing scale: 4, 6, 8, 12, etc.
  className?: string;
}

export function SectionGroup({ children, spacing = 12, className = '' }: SectionGroupProps) {
  const spacingClass = `space-y-${spacing} sm:space-y-${spacing + 4}`;

  return (
    <div className={`max-w-7xl mx-auto px-3 sm:px-4 ${spacingClass} ${className}`}>{children}</div>
  );
}
