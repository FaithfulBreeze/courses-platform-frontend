import { Star } from 'lucide-react';

export default function StarRating({ rate }: { rate: number }) {
  return (
    <div
      className="flex items-center space-x-0.5 text-yellow-500"
      aria-label={`Rating: ${rate} out of 5`}
    >
      {[...Array(5)].map((_, i) => (
        <Star className="w-3 sm:w-5 md:w-6" key={i} fill={i < rate ? 'currentColor' : 'none'} />
      ))}
    </div>
  );
}
