"use client"

import { AuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

export function AuthProvider({children}: React.PropsWithChildren ){
  const [user, setUser] = useState<{ id?: string }>();

  return (
    <AuthContext.Provider value={{ user: { id: user?.id }, setUser }}>
    {children}
    </AuthContext.Provider>
  )
}