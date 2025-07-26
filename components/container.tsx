interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return <main className={className || 'py-6 sm:py-10'}>{children}</main>;
}
