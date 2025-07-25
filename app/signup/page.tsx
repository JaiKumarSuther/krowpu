"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import SignUpForm from "@/components/forms/SignUpForm";

const InnerSignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [role, setRole] = useState<"client" | "freelancer" | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get("role");

    if (roleParam === "client" || roleParam === "freelancer") {
      setRole(roleParam);
      setIsValid(true);
    } else {
      router.replace("/select-role");
    }
  }, [searchParams, router]);

  const handleSuccess = () => {
    if (!role) return;

    // ✅ Store login state and role
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);

    // ✅ Redirect based on role
    if (role === "freelancer") {
      router.push("/freelancer");
    } else {
      window.location.href = "/";
    }
  };

  if (!isValid || !role) return null;

  return <SignUpForm role={role} onSuccess={handleSuccess} />;
};

const SignUpPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <InnerSignUpPage />
  </Suspense>
);

export default SignUpPage;
