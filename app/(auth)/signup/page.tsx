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
      router.replace("/role-selection");
    }
  }, [searchParams, router]);

  const handleSuccess = () => {
    if (role === "freelancer") {
      router.push("/freelancer");
    } else {
      router.push("/client");
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
