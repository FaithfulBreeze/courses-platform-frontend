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
  duration: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lessons: Array<Lesson>;
  owner: User;
  reviews: Array<Review>;
  students: Array<User>;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  trailer: Maybe<Scalars['String']['output']>;
  trailerDuration: Maybe<Scalars['Int']['output']>;
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
  course: Course;
  description: Scalars['String']['output'];
  duration: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
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
  lesson: Lesson;
  lessons: Array<Lesson>;
  review: Review;
  reviews: Array<Review>;
  user: User;
  users: Array<User>;
};


export type QueryCourseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLessonArgs = {
  id: Scalars['Int']['input'];
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
  rate: Scalars['Int']['output'];
  reviewer: User;
};

export type User = {
  avatar: Maybe<Scalars['String']['output']>;
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


export type UserLastCoursePurchasesArgs = {
  limit: Scalars['Int']['input'];
};

export type CoursePurchaseFieldsFragment = { id: number, course: { id: number, title: string, description: string, thumbnail: string, duration: string, trailer: string, trailerDuration: number }, user: { id: number, name: string, email: string, avatar: string } };

export type CourseFieldsFragment = { id: number, title: string, description: string, thumbnail: string, duration: string, trailer: string, trailerDuration: number };

export type LessonFieldsFragment = { id: number, url: string, thumbnail: string, title: string, description: string, duration: string };

export type ReviewFieldsFragment = { id: number, content: string, rate: number };

export type UserFieldsFragment = { id: number, name: string, email: string, avatar: string };

export type GetCourseQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCourseQuery = { course: { id: number, title: string, description: string, thumbnail: string, duration: string, trailer: string, trailerDuration: number, students: Array<{ id: number, name: string, email: string, avatar: string, completedLessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: string, course: { id: number, title: string, description: string, thumbnail: string, duration: string, trailer: string, trailerDuration: number } }> }>, lessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: string }>, owner: { id: number, name: string, email: string, avatar: string }, reviews: Array<{ id: number, content: string, rate: number, reviewer: { id: number, name: string, email: string, avatar: string } }> } };

export type GetUserLastPurchasedCoursesQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetUserLastPurchasedCoursesQuery = { user: { lastCoursePurchases: Array<{ id: number, course: { id: number, title: string, description: string, thumbnail: string, duration: string, trailer: string, trailerDuration: number, lessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: string }>, owner: { id: number, name: string, email: string, avatar: string } }, user: { id: number, name: string, email: string, avatar: string } }> } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserQuery = { user: { id: number, name: string, email: string, avatar: string, completedLessons: Array<{ id: number, url: string, thumbnail: string, title: string, description: string, duration: string, course: { id: number, title: string, description: string, thumbnail: string, duration: string, trailer: string, trailerDuration: number } }>, lastWatchedLesson: { id: number, url: string, thumbnail: string, title: string, description: string, duration: string } } };
