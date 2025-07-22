import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

interface ITabProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<any>>;
  tabs: { key: string; label: string; icon: any }[];
}

export default function Tab({ activeTab, setActiveTab, tabs }: ITabProps) {
  return (
    <div className="relative max-w-7xl mx-auto px-4 pt-6">
      <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700 relative">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="relative cursor-pointer pb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              <Icon
                size={16}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : ''
                }`}
              />
              <span className={`${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-600 dark:bg-blue-400 rounded"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
