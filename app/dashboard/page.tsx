"use client"

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { AuthProvider } from "@/providers/AuthProvider";
import { useContext } from "react";

export default function Dashboard() {
    const authContext = useContext(AuthProvider)
    useProtectedRoute(authContext)


    return (
        <h1>Logged!</h1>
    )
}