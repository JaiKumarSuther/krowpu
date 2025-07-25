"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [openModal, setOpenModal] = useState<"terms" | "user" | "privacy" | null>(null);
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
    if (!validate()) return;

    // ✅ Save to localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);

    // ✅ Continue to parent redirect handler
    onSuccess();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const closeModal = () => setOpenModal(null);

  const inputClasses =
    "w-full border border-[hsl(214.3_31.8%_91.4%)] rounded-lg px-4 py-3 text-[hsl(222.2_84%_4.9%)] bg-[hsl(0_0%_100%)] placeholder:text-[hsl(215.4_16.3%_46.9%)] focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] focus:border-transparent transition-all duration-200";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_40%_96.1%))] py-12">
      {/* Terms of Service Modal */}
      <Dialog open={openModal === "terms"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_100%)]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(222.2_84%_4.9%)]">Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-[hsl(222.2_84%_4.9%)]">
            <p className="font-medium">Last Updated: January 1, 2024</p>
            
            <div>
              <h3 className="font-semibold mb-2">1. Introduction</h3>
              <p className="text-sm leading-relaxed">
                Welcome to our platform. These Terms of Service govern your use of our website and services. 
                By accessing or using our service, you agree to be bound by these terms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. User Responsibilities</h3>
              <p className="text-sm leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. 
                You agree to accept responsibility for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Content Ownership</h3>
              <p className="text-sm leading-relaxed">
                You retain ownership of any content you submit or display on our platform. 
                However, by posting content, you grant us a worldwide, non-exclusive license to use, 
                reproduce, and display such content.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Prohibited Activities</h3>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li>Violating any laws or regulations</li>
                <li>Posting false or misleading information</li>
                <li>Engaging in fraudulent activities</li>
                <li>Uploading viruses or malicious code</li>
                <li>Harassing other users</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Termination</h3>
              <p className="text-sm leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={closeModal}
                className="bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
              >
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Agreement Modal */}
      <Dialog open={openModal === "user"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_100%)]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(222.2_84%_4.9%)]">User Agreement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-[hsl(222.2_84%_4.9%)]">
            <p className="font-medium">Effective Date: January 1, 2024</p>
            
            <div>
              <h3 className="font-semibold mb-2">1. Account Registration</h3>
              <p className="text-sm leading-relaxed">
                To access certain features, you must register for an account. You agree to provide accurate 
                and complete information and keep your account information updated.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Service Modifications</h3>
              <p className="text-sm leading-relaxed">
                We reserve the right to modify or discontinue the Service at any time without notice. 
                We shall not be liable to you or any third party for any modification, suspension, 
                or discontinuance of the Service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Payments and Fees</h3>
              <p className="text-sm leading-relaxed">
                Certain services may require payment. You agree to pay all applicable fees and taxes. 
                All payments are non-refundable unless otherwise stated.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Dispute Resolution</h3>
              <p className="text-sm leading-relaxed">
                Any disputes arising from this agreement will be resolved through binding arbitration 
                rather than in court, except that you may assert claims in small claims court if your claims qualify.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Governing Law</h3>
              <p className="text-sm leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the state 
                where our company is registered, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={closeModal}
                className="bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
              >
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}
      <Dialog open={openModal === "privacy"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_100%)]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(222.2_84%_4.9%)]">Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-[hsl(222.2_84%_4.9%)]">
            <p className="font-medium">Last Revised: January 1, 2024</p>
            
            <div>
              <h3 className="font-semibold mb-2">1. Information We Collect</h3>
              <p className="text-sm leading-relaxed">
                We collect personal information you provide when registering, such as name, email, 
                and payment details. We also automatically collect usage data through cookies and 
                similar technologies.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. How We Use Information</h3>
              <p className="text-sm leading-relaxed">
                We use your information to provide and improve our services, process transactions, 
                communicate with you, and for security and fraud prevention.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Information Sharing</h3>
              <p className="text-sm leading-relaxed">
                We do not sell your personal information. We may share information with service 
                providers, for legal compliance, or during business transfers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Data Security</h3>
              <p className="text-sm leading-relaxed">
                We implement appropriate security measures to protect your information. However, 
                no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Your Rights</h3>
              <p className="text-sm leading-relaxed">
                You may access, correct, or delete your personal information. You can opt-out of 
                marketing communications and manage cookie preferences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6. Children&apos;s Privacy</h3>
              <p className="text-sm leading-relaxed">
                Our service is not intended for children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={closeModal}
                className="bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
              >
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-[480px] bg-[hsl(0_0%_100%)/0.8] backdrop-blur-sm rounded-xl shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] p-8">
        <h1 className="text-2xl font-semibold text-[hsl(222.2_84%_4.9%)] mb-8 text-center">
          {role === "client"
            ? "Sign up to hire talent"
            : "Sign up to find events"}
        </h1>

        {/* OAuth */}
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-3 w-full mb-6">
          {[{ icon: <FcGoogle size={18} />, text: "Continue with Google" }, { icon: <FaApple size={18} />, text: "Continue with Apple" }].map((btn, idx) => (
            <button
              key={idx}
              type="button"
              className="flex-1 border border-[hsl(214.3_31.8%_91.4%)] text-black rounded-lg px-4 py-3 text-sm font-medium bg-[hsl(0_0%_100%)] hover:bg-[hsl(210_40%_96.1%)] transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]"
            >
              {btn.icon}
              <span className="hidden sm:inline">{btn.text}</span>
              <span className="sm:hidden">{btn.text.split(" ")[2]}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center w-full mb-6">
          <div className="flex-1 h-px bg-[hsl(214.3_31.8%_91.4%)]" />
          <span className="px-3 text-sm text-[hsl(215.4_16.3%_46.9%)]">Or</span>
          <div className="flex-1 h-px bg-[hsl(214.3_31.8%_91.4%)]" />
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

              <label className="flex items-start gap-3 text-sm text-[hsl(215.4_16.3%_46.9%)]">
                <input
                  type="checkbox"
                  checked={formData.subscribeEmails}
                  onChange={(e) =>
                    handleChange("subscribeEmails", e.target.checked)
                  }
                  className="accent-[hsl(160_84%_39%)] mt-1"
                />
                Send me emails with tips on how to find talent that fits my needs.
              </label>
            </>
          )}

          <label className="flex items-start gap-3 text-sm text-[hsl(215.4_16.3%_46.9%)]">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => handleChange("agreeTerms", e.target.checked)}
              className="accent-[hsl(160_84%_39%)] mt-1"
            />
            <span>
              Yes, I understand and agree to the{" "}
              <button 
                type="button"
                onClick={() => setOpenModal("terms")}
                className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
              >
                Terms of Service
              </button>
              , including the{" "}
              <button 
                type="button"
                onClick={() => setOpenModal("user")}
                className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
              >
                User Agreement
              </button>{" "}
              and{" "}
              <button 
                type="button"
                onClick={() => setOpenModal("privacy")}
                className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
              >
                Privacy Policy
              </button>
              .
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-[hsl(0_84.2%_60.2%)] text-xs mt-1">
              {errors.agreeTerms}
            </p>
          )}

          <GreenButton type="submit" label="Create an account" className="w-full" />
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