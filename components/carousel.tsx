import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React from 'react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  skeletonCount?: number;
  renderSkeleton?: (index: number) => React.ReactNode;
}

export function Carousel<T>({
  items,
  renderItem,
  loading = false,
  skeletonCount = 3,
  renderSkeleton,
}: CarouselProps<T>) {
  return (
    <div>
      <div className="relative w-full">
        <div className="prev absolute hidden lg:block top-1/2 z-10 -translate-y-1/2 hover:scale-[113%] hover:bg-black/30 cursor-pointer duration-200 transition-all p-1 bg-black/20 rounded-full -left-6 md:-left-12">
          <ChevronLeft />
        </div>

        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true, el: '.pagination' }}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <SwiperSlide key={`skeleton-${i}`}>
                  {renderSkeleton ? (
                    renderSkeleton(i)
                  ) : (
                    <div className="w-full h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl aspect-video" />
                  )}
                </SwiperSlide>
              ))
            : items.map((item, index) => (
                <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
              ))}
        </Swiper>

        <div className="next absolute hidden lg:block top-1/2 z-10 -translate-y-1/2 hover:scale-[113%] hover:bg-black/30 cursor-pointer duration-200 transition-all p-1 bg-black/20 rounded-full -right-6 md:-right-12">
          <ChevronRight />
        </div>
      </div>
      <div className="pagination mt-6 flex justify-center gap-2"></div>
    </div>
  );
}
