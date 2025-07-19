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
};

export type Course = {
  description: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lessons: Array<Lesson>;
  name: Scalars['String']['output'];
  owner: User;
  reviews: Array<Review>;
  students: Array<User>;
  thumbnail: Scalars['String']['output'];
};

export type CreateReviewInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type Lesson = {
  course: Course;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  videoThumbnail: Scalars['String']['output'];
  videoUrl: Scalars['String']['output'];
};

export type Mutation = {
  createReview: Review;
  removeReview: Review;
  updateReview: Review;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationRemoveReviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput;
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
  reviewer: User;
};

export type UpdateReviewInput = {
  /** Example field (placeholder) */
  exampleField: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type User = {
  createdCourses: Array<Course>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  purchasedCourses: Array<Course>;
  reviews: Array<Review>;
};

export type CourseFieldsFragment = { id: number, name: string, description: string, thumbnail: string };

export type UserFieldsFragment = { id: number, name: string };

export type GetUserPurchasedCoursesQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserPurchasedCoursesQuery = { user: { purchasedCourses: Array<{ id: number, name: string, description: string, thumbnail: string, owner: { id: number, name: string } }> } };
