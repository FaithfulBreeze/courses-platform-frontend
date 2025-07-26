interface WelcomeBannerProps {
  name: string;
}

export function WelcomeBanner({ name }: WelcomeBannerProps) {
  return (
    <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg min-h-[200px] sm:min-h-[240px] flex flex-col sm:flex-row items-center justify-between p-4 sm:p-8 gap-4">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Welcome back, {name} 👋</h2>
        <p className="text-sm sm:text-lg text-gray-300">Ready to continue where you left off?</p>
      </div>
      <div className="w-full sm:w-48 h-24 sm:h-28 bg-black/30 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs sm:text-sm text-center">Last watched lesson</span>
      </div>
    </section>
  );
}
