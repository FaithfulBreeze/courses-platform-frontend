"use client"

import { AuthContext } from "@/contexts/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useContext, useEffect } from "react";

export default function Dashboard() {
    const authContext = useContext(AuthContext)
    useEffect(() => useProtectedRoute(authContext), [])

    return (
        <h1>Logged! {authContext.user.id}</h1>
    )
}