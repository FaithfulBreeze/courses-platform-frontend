import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function AccessOverlay({ message = 'Purchase or enroll to access lessons' }) {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
        <Lock size={32} />
        <p className="text-center font-medium">{message}</p>
      </div>
    </motion.div>
  );
}
