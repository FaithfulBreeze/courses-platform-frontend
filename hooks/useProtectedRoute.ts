import { IAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export const useProtectedRoute = (context: IAuthContext) => {
  if (!context.user.id) redirect("/auth");
};
