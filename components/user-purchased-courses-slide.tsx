"use client";

import { fetchUserPurchasedCourses } from "@/repositories/fetchUserPurchasedCourses";
import { Course } from "@/types.generated";
import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import { Swiper, SwiperSlide } from "swiper/react";
import { CourseCard } from "./ui/course-card";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IUserPurchasedCoursesSlideStateProps {
  userPurchasedCourses: Course[];
}

interface UserPurchasedCoursesSlideProps {
  userId?: number;
  client?: GraphQLClient;
}

export function UserPurchasedCoursesSlide({
  userId,
  client,
}: UserPurchasedCoursesSlideProps) {
  const [state, setState] =
    useState<IUserPurchasedCoursesSlideStateProps | null>(null);

  useEffect(() => {
    if (!client || !userId) return;

    fetchUserPurchasedCourses({
      client,
      id: userId,
    }).then((userPurchasedCourses) =>
      setState((prev) => ({ ...prev, userPurchasedCourses }))
    );
  }, [userId]);

  return (
    <>
      <div className="relative">
        <div className="prev absolute top-1/2 z-10 -translate-y-1/2 hover:scale-[113%] hover:bg-black/30  cursor-pointer duration-200 transition-all p-1 bg-black/20 rounded-full -left-12">
          <ChevronLeft />
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true, el: ".pagination" }}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
        >
          {state?.userPurchasedCourses.map((course) => {
            return (
              <SwiperSlide key={course.id}>
                <CourseCard key={course.id} course={course} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="next absolute top-1/2 z-10 -translate-y-1/2 hover:scale-[113%] hover:bg-black/30 cursor-pointer duration-200 transition-all p-1 bg-black/20 rounded-full -right-12">
          <ChevronRight />
        </div>
      </div>
      <div className="pagination mt-8 flex justify-center gap-2"></div>
    </>
  );
}
