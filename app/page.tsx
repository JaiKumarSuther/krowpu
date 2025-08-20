"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FreelancerFeed from "@/components/freelancer/FreelancerFeed";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const { isLoggedIn, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Small delay to ensure AuthContext is initialized
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.role === "client") {
      router.push('/client/dashboard');
    }
  }, [isLoggedIn, user?.role, router]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!isLoggedIn) return <Dashboard />;

  if (user?.role === "client") {
    return <div>Redirecting to client dashboard...</div>;
  }
  if (user?.role === "freelancer") return <FreelancerFeed />;

  return <Dashboard />;
}
