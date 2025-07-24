"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import GreenButton from "@/components/buttons/GreenButton";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate login success
    localStorage.setItem("isLoggedIn", "true"); // ✅ Save flag
    window.location.href = "/";
  };

  const inputClasses =
    "w-full border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-4 py-3 text-[hsl(222.2_84%_4.9%)]  bg-[hsl(0_0%_100%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_40%_96.1%))]  py-12">
      <div className="w-full max-w-[480px] bg-[hsl(0_`0%_100%)/0.8] backdrop-blur-sm rounded-xl shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)]   p-8">
        <h1 className="text-2xl font-semibold text-[hsl(222.2_84%_4.9%)]  mb-8 text-center">
          Log in to KROWPU
        </h1>

        {/* OAuth Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
          {[
            { icon: <FcGoogle size={18} />, text: "Continue with Google" },
            { icon: <FaApple size={18} />, text: "Continue with Apple" },
          ].map((btn, idx) => (
            <button
              key={idx}
              type="button"
              className="flex-1 border text-black border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-4 py-3 text-sm font-medium bg-[hsl(0_0%_100%)]  hover:bg-[hsl(210_40%_96.1%)]  transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
            >
              {btn.icon}
              <span className="hidden sm:inline">{btn.text}</span>
              <span className="sm:hidden">{btn.text.split(" ")[2]}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center w-full mb-6">
          <div className="flex-1 h-px bg-[hsl(214.3_31.8%_91.4%)] "></div>
          <span className="px-3 text-sm text-[hsl(215.4_16.3%_46.9%)] ">
            Or
          </span>
          <div className="flex-1 h-px bg-[hsl(214.3_31.8%_91.4%)] "></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputClasses}
            />
            {errors.email && (
              <p className="text-[hsl(0_84.2%_60.2%)]  text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={inputClasses}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(222.2_84%_4.9%)]  transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-[hsl(0_84.2%_60.2%)]  text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <GreenButton type="submit" label="Log In" className="w-full" />
        </form>

        <p className="mt-6 text-sm text-[hsl(215.4_16.3%_46.9%)]  text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/select-role"
            className="text-[hsl(160_84%_39%)]  font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
