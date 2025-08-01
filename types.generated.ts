export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type Course = {
  coursePurchases: Array<CoursePurchase>;
  description: Scalars['String']['output'];
  duration: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  lessons: Array<Lesson>;
  lessonsCount: Scalars['Int']['output'];
  owner: User;
  price: Scalars['Int']['output'];
  reviews: Array<Review>;
  reviewsCount: Scalars['Int']['output'];
  students: Array<User>;
  thumbnail: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  trailer: Maybe<Scalars['String']['output']>;
  trailerDuration: Maybe<Scalars['Int']['output']>;
};


export type CourseLessonsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
};


export type CourseReviewsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
};

export type CoursePurchase = {
  course: Course;
  id: Scalars['Int']['output'];
  purchasedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CreateReviewInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type Lesson = {
  completedBy: Array<User>;
  count: Scalars['Int']['output'];
  course: Course;
  description: Scalars['String']['output'];
  duration: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  reviews: Array<Review>;
  reviewsCount: Scalars['Int']['output'];
  thumbnail: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Maybe<Scalars['String']['output']>;
};


export type LessonReviewsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  createReview: Review;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};

export type Query = {
  course: Course;
  courses: Array<Course>;
  lesson: Maybe<Lesson>;
  lessons: Array<Lesson>;
  review: Review;
  reviews: Array<Review>;
  user: Maybe<User>;
  users: Array<User>;
};


export type QueryCourseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLessonArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLessonsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Review = {
  content: Scalars['String']['output'];
  course: Course;
  id: Scalars['Int']['output'];
  lesson: Lesson;
  rate: Scalars['Int']['output'];
  reviewer: User;
};

export type User = {
  avatar: Maybe<Scalars['String']['output']>;
  completedCourseLessons: Array<Lesson>;
  completedLessons: Array<Lesson>;
  coursePurchases: Array<CoursePurchase>;
  createdCourses: Array<Course>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastCoursePurchases: Array<CoursePurchase>;
  lastWatchedLesson: Maybe<Lesson>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  purchasedCourses: Array<Course>;
  reviews: Array<Review>;
};


export type UserCompletedCourseLessonsArgs = {
  courseId: Scalars['Int']['input'];
};


export type UserLastCoursePurchasesArgs = {
  limit: Scalars['Int']['input'];
};

export type CoursePurchaseFieldsFragment = { id: number, course: { id: number, title: string, description: string, thumbnail: string, duration: number, trailer: string, trailerDuration: number, lessonsCount: number, reviewsCount: number }, user: { id: number, name: string, email: string, avatar: string } };

export type CourseFieldsFragment = { id: number, title: string, description: string, thumbnail: string, duration: number, trailer: string, trailerDuration: number, lessonsCount: number, reviewsCount: number };

export type LessonFieldsFragment = { id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number };

export type ReviewFieldsFragment = { id: number, content: string, rate: number };

export type UserFieldsFragment = { id: number, name: string, email: string, avatar: string };

export type GetCourseLessonsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  limit: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCourseLessonsQuery = { course: { lessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number }> } };

export type GetCourseReviewsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCourseReviewsQuery = { course: { reviews: Array<{ id: number, content: string, rate: number, reviewer: { id: number, name: string, email: string, avatar: string } }> } };

export type GetCourseQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCourseQuery = { course: { id: number, title: string, description: string, thumbnail: string, duration: number, trailer: string, trailerDuration: number, lessonsCount: number, reviewsCount: number, students: Array<{ id: number, name: string, email: string, avatar: string, completedLessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number, course: { id: number, title: string, description: string, thumbnail: string, duration: number, trailer: string, trailerDuration: number, lessonsCount: number, reviewsCount: number } }> }>, lessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number }>, owner: { id: number, name: string, email: string, avatar: string }, reviews: Array<{ id: number, content: string, rate: number, reviewer: { id: number, name: string, email: string, avatar: string } }> } };

export type GetLessonReviewsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetLessonReviewsQuery = { lesson: { reviews: Array<{ id: number, content: string, rate: number, reviewer: { id: number, name: string, email: string, avatar: string } }> } };

export type GetLessonQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetLessonQuery = { lesson: { id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number, course: { id: number, title: string, description: string, thumbnail: string, duration: number, trailer: string, trailerDuration: number, lessonsCount: number, reviewsCount: number, owner: { id: number, name: string, email: string, avatar: string }, students: Array<{ id: number, name: string, email: string, avatar: string }> } } };

export type GetUserCourseCompletedLessonsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  courseId: Scalars['Int']['input'];
}>;


export type GetUserCourseCompletedLessonsQuery = { user: { completedCourseLessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number }> } };

export type GetUserLastPurchasedCoursesQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetUserLastPurchasedCoursesQuery = { user: { lastCoursePurchases: Array<{ id: number, course: { id: number, title: string, description: string, thumbnail: string, duration: number, trailer: string, trailerDuration: number, lessonsCount: number, reviewsCount: number, lessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number }>, owner: { id: number, name: string, email: string, avatar: string } }, user: { id: number, name: string, email: string, avatar: string } }> } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserQuery = { user: { id: number, name: string, email: string, avatar: string, completedLessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number, course: { id: number, title: string, description: string, thumbnail: string, duration: number, trailer: string, trailerDuration: number, lessonsCount: number, reviewsCount: number } }>, lastWatchedLesson: { id: number, url: string, thumbnail: string, title: string, description: string, duration: number, count: number, reviewsCount: number } } };
