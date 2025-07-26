interface PlaceholderPanelProps {
  text: string;
  className?: string;
}

export function PlaceholderPanel({ text, className = '' }: PlaceholderPanelProps) {
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-6 h-32 sm:h-40 flex items-center justify-center text-gray-400 text-xs sm:text-sm ${className}`}
    >
      {text}
    </div>
  );
}
