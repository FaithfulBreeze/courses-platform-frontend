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
  const storedData = localStorage.getItem("user");
  if (!storedData) redirect("/auth");
  const user = JSON.parse(storedData);
  if(!user.id) redirect("/auth");
  context.setUser?.(user)
};
