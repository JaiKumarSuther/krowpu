"use client";

import { useEffect, useState } from "react";
import ClientFeed from "@/components/client/ClientFeed";
import FreelancerFeed from "@/components/freelancer/FreelancerFeed";
import Dashboard from "@/components/Dashboard";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<"client" | "freelancer" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedRole = localStorage.getItem("userRole"); // must be set on login/signup

    setIsLoggedIn(loggedIn);
    setRole(storedRole === "client" || storedRole === "freelancer" ? storedRole : null);
    setLoading(false);
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!isLoggedIn) return <Dashboard />;

  if (role === "client") return <ClientFeed />;
  if (role === "freelancer") return <FreelancerFeed />;

  return <Dashboard />;
}
