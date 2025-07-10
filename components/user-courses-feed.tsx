"use client";

import { fetchUserPurchasedCourses } from "@/repositories/fetchUserPurchasedCourses";
import { Course } from "@/types.generated";
import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

interface IUserCourseFeedStateProps {
  userPurchasedCourses: Course[];
}

interface UserCoursesFeedProps {
  userId?: string;
  client?: GraphQLClient;
}

export function UserCoursesFeed({ userId, client }: UserCoursesFeedProps) {
  const [state, setState] = useState<IUserCourseFeedStateProps | null>(null);

  useEffect(() => {
    if (!client || !userId) return;

    fetchUserPurchasedCourses({
      client,
      id: parseInt(userId),
    }).then((userPurchasedCourses) =>
      setState((prev) => ({ ...prev, userPurchasedCourses })),
    );
  }, []);

  return (
    <div className="flex gap-10">
      {state?.userPurchasedCourses.map((course) => {
        return (
          <div>
            <img src={course.thumbnail} />
            <h1>{course.name}</h1>
            <p>{course.description}</p>
          </div>
        );
      })}
    </div>
  );
}
