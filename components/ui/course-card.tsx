import { Course } from "@/types.generated";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

export function CourseCard(course: Course) {
  return (
    <Card className="group relative p-0 w-[400px] cursor-pointer">
      <img
        src={course.thumbnail}
        alt=""
        width={400}
        height={225}
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="w-full h-full rounded-xl bg-black/60 opacity-0 absolute group-hover:opacity-100 duration-100">
        <div className="w-full px-10 absolute top-1/2 left-1/2 -translate-[50%]">
          <CardTitle className="text-center text-white">{course.name}</CardTitle>
          <CardDescription className="text-center text-white">{course.description}</CardDescription>
        </div>
      </div>
      <div>
        <h1>{course.owner?.name}</h1>
      </div>
    </Card>
  );
}
