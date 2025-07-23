"use client";

import { useState } from "react";
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import GreenButton from "@/components/buttons/GreenButton";

interface SignUpFormProps {
  role: "client" | "freelancer";
  onSuccess: () => void;
}

const SignUpForm = ({ role, onSuccess }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    agreeTerms: false,
    subscribeEmails: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (role === "client" && !formData.country)
      newErrors.country = "Country selection is required.";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the Terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      onSuccess();
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const inputClasses =
    "w-full border border-[hsl(214.3_31.8%_91.4%)] rounded-lg px-4 py-3 text-[hsl(222.2_84%_4.9%)] bg-[hsl(0_0%_100%)] placeholder:text-[hsl(215.4_16.3%_46.9%)] focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] focus:border-transparent transition-all duration-200";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_40%_96.1%))] py-12">
      <div className="w-full max-w-[480px] bg-[hsl(0_0%_100%)/0.8] backdrop-blur-sm rounded-xl shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] p-8">
        <h1 className="text-2xl font-semibold text-[hsl(222.2_84%_4.9%)] mb-8 text-center">
          {role === "client"
            ? "Sign up to hire talent"
            : "Sign up to find events"}
        </h1>

        <div className="flex flex-col sm:flex-row sm:gap-4 gap-3 w-full mb-6">
          {[
            { icon: <FcGoogle size={18} />, text: "Continue with Google" },
            { icon: <FaApple size={18} />, text: "Continue with Apple" },
          ].map((btn, idx) => (
            <button
              key={idx}
              type="button"
              className="flex-1 min-w-0 text-black sm:min-w-[0] border border-[hsl(214.3_31.8%_91.4%)] rounded-lg px-4 py-3 text-sm font-medium bg-[hsl(0_0%_100%)] hover:bg-[hsl(210_40%_96.1%)] transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]"
            >
              {btn.icon}
              <span className="hidden sm:inline">{btn.text}</span>
              <span className="sm:hidden">{btn.text.split(" ")[2]}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center w-full mb-6">
          <div className="flex-1 h-px bg-[hsl(214.3_31.8%_91.4%)]"></div>
          <span className="px-3 text-sm text-[hsl(215.4_16.3%_46.9%)]">Or</span>
          <div className="flex-1 h-px bg-[hsl(214.3_31.8%_91.4%)]"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            {["firstName", "lastName"].map((field) => (
              <div className="flex-1" key={field}>
                <input
                  type="text"
                  placeholder={
                    field === "firstName" ? "First name" : "Last name"
                  }
                  value={
                    typeof formData[field as keyof typeof formData] === "string"
                      ? (formData[field as keyof typeof formData] as string)
                      : ""
                  }
                  onChange={(e) => handleChange(field, e.target.value)}
                  className={inputClasses}
                />
                {errors[field] && (
                  <p className="text-[hsl(0_84.2%_60.2%)] text-xs mt-1">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <input
              type="email"
              placeholder="Work email address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClasses}
            />
            {errors.email && (
              <p className="text-[hsl(0_84.2%_60.2%)] text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={inputClasses}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)] hover:text-[hsl(222.2_84%_4.9%)] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-[hsl(0_84.2%_60.2%)] text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {role === "client" && (
            <>
              <select
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className={inputClasses}
              >
                <option value="">Select Country</option>
                <option value="pakistan">Pakistan</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="india">India</option>
              </select>
              {errors.country && (
                <p className="text-[hsl(0_84.2%_60.2%)] text-xs mt-1">
                  {errors.country}
                </p>
              )}

              <label className="flex cursor-pointer items-start gap-3 text-sm text-[hsl(215.4_16.3%_46.9%)]">
                <input
                  type="checkbox"
                  checked={formData.subscribeEmails}
                  onChange={(e) =>
                    handleChange("subscribeEmails", e.target.checked)
                  }
                  className="accent-[hsl(160_84%_39%)] mt-1"
                />
                Send me emails with tips on how to find talent that fits my
                needs.
              </label>
            </>
          )}

          <label className="flex cursor-pointer items-start gap-3 text-sm text-[hsl(215.4_16.3%_46.9%)]">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => handleChange("agreeTerms", e.target.checked)}
              className="accent-[hsl(160_84%_39%)] mt-1"
            />
            <span>
              Yes, I understand and agree to the{" "}
              <Link
                href="#"
                className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
              >
                Terms of Service
              </Link>
              , including the{" "}
              <Link
                href="#"
                className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
              >
                User Agreement
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-[hsl(0_84.2%_60.2%)] text-xs mt-1">
              {errors.agreeTerms}
            </p>
          )}

          <GreenButton
            type="submit"
            label="Create an account"
            className="w-full"
          />
        </form>

        <p className="mt-6 text-sm text-[hsl(215.4_16.3%_46.9%)] text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[hsl(160_84%_39%)] font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
