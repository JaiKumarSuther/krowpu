"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings, Bell, Menu, X } from "lucide-react";
import GreenButton from "@/components/buttons/GreenButton";
import { useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLogin = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLogin === "true");
  }, []);

  const navItems = [
    { name: "Events", id: "events-section" },
    { name: "About Us", id: "about-section" },
    { name: "Pricing", id: "pricing-section" },
  ];

  const router = useRouter();

  const mobileMenuClasses = [
    "md:hidden overflow-hidden transition-all duration-300 border-t border-[hsl(140_20%_90%)] ",
    menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  if (!mounted) return null; // prevent flicker and delay
  return (
    <header className="w-full bg-[hsl(0_0%_100%)]  border-b border-[hsl(140_20%_90%)]  shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 px-6">
          <Link
            href="/"
            className="text-[hsl(140_75%_20%)]  font-extrabold italic text-2xl hover:text-[hsl(140_80%_15%)]  transition-colors duration-150"
          >
            <Image
              src="/images/krowpu.png"
              alt="Impactful Events"
              width={120}
              height={40}
              className="w-30 object-cover"
              priority
            />
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-[hsl(222.2_84%_4.9%)] hover:text-[hsl(140_75%_20%)] transition-colors duration-150 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)]  transition-colors duration-150">
                <Settings
                  size={18}
                  className="text-[hsl(215.4_16.3%_46.9%)] "
                />
              </button>
              <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)]  transition-colors duration-150">
                <Bell size={18} className="text-[hsl(215.4_16.3%_46.9%)] " />
              </button>
              <div
                className="w-9 h-9 bg-[hsl(140_60%_85%)]  rounded-full flex items-center justify-center cursor-pointer hover:bg-[hsl(140_75%_20%)/0.2] transition-colors duration-150"
                onClick={() => {
                  try {
                    router.push("/freelancer/profile");
                  } catch (error) {
                    console.error("Navigation failed", error);
                  }
                }}
              >
                <span className="text-[hsl(140_75%_20%)]  font-semibold text-sm">
                  U
                </span>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-[hsl(222.2_84%_4.9%)]  font-medium hover:text-[hsl(140_75%_20%)]  transition-colors duration-150"
              >
                Log In
              </Link>
              <Link href="/select-role">
                <GreenButton label="Sign Up" />
              </Link>
            </div>
          )}

          <button
            className="p-2 rounded-md hover:bg-[hsl(140_30%_95%)]  transition-colors md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={mobileMenuClasses}>
          <div className="flex flex-col px-6 py-4 gap-4 bg-[hsl(0_0%_100%)] ">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-[hsl(222.2_84%_4.9%)] hover:text-[hsl(140_75%_20%)] transition-colors duration-150 font-medium"
              >
                {item.name}
              </button>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center gap-4 pt-4 border-t border-[hsl(140_20%_90%)] ">
                <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)]  transition-colors">
                  <Settings
                    size={18}
                    className="text-[hsl(215.4_16.3%_46.9%)] "
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)]  transition-colors">
                  <Bell size={18} className="text-[hsl(215.4_16.3%_46.9%)] " />
                </button>
                <div
                  className="w-8 h-8 bg-[hsl(140_60%_85%)]  rounded-full flex items-center justify-center"
                  onClick={() => {
                    try {
                      router.push("/freelancer/profile");
                    } catch (error) {
                      console.error("Navigation failed", error);
                    }
                  }}
                >
                  <span className="text-[hsl(140_75%_20%)]  font-semibold text-sm">
                    J
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t border-[hsl(140_20%_90%)] ">
                <Link
                  href="/login"
                  className="text-[hsl(222.2_84%_4.9%)]  font-medium hover:text-[hsl(140_75%_20%)]  transition-colors duration-150"
                >
                  Log In
                </Link>
                <Link href="/select-role">
                  <GreenButton label="Sign Up" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
