import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export const useProtectedRoute = (context: {
  user: {
    id?: string;
  };
  setUser?: Dispatch<
    SetStateAction<
      | {
          id?: string;
        }
      | undefined
    >
  >;
}) => {
  if (!context.user.id) redirect("/auth");
};
