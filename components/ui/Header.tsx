"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings, Bell, Menu, X, Search } from "lucide-react";
import GreenButton from "@/components/buttons/GreenButton";
import { useRouter } from "next/navigation";
import { IoChatboxOutline } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  interface SearchEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSearch = (e: SearchEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const mobileMenuClasses = [
    "md:hidden overflow-hidden transition-all duration-300 border-t border-[hsl(140_20%_90%)]",
    menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  if (!mounted) return null;

  return (
    <header className="w-full bg-white border-b border-[hsl(140_20%_90%)] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[hsl(140_75%_20%)] font-extrabold italic text-2xl hover:text-[hsl(140_80%_15%)] transition-colors duration-150"
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

            <nav className="hidden md:flex gap-6 items-center ml-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-800 hover:text-[hsl(140_75%_20%)] transition-colors duration-150 font-medium text-sm uppercase tracking-wider"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center bg-[hsl(140_30%_95%)] rounded-full px-4 py-1.5 transition-all duration-300"
                >
                  <Search size={18} className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="bg-transparent border-none outline-none w-48 text-gray-700 placeholder-gray-400 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors"
                >
                  <Search size={18} className="text-gray-500" />
                </button>
              )}
            </div>

            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3">
                <button
                  className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors"
                  onClick={() => router.push("/chat")}
                >
                  <IoChatboxOutline
                    size={18}
                    className="text-[hsl(215.4_16.3%_46.9%)]"
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors">
                  <Settings
                    size={18}
                    className="text-[hsl(215.4_16.3%_46.9%)]"
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors">
                  <Bell size={18} className="text-[hsl(215.4_16.3%_46.9%)]" />
                </button>
                <button
                  className="p-2 rounded-md text-sm text-[hsl(160_84%_39%)] hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <div
                  className="w-9 h-9 bg-[hsl(140_60%_85%)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[hsl(140_75%_20%)/0.2] transition-colors duration-150"
                  onClick={() => router.push("/freelancer/profile")}
                >
                  <span className="text-[hsl(140_75%_20%)] font-semibold text-sm">
                    U
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-gray-800 font-medium hover:text-[hsl(140_75%_20%)] transition-colors duration-150"
                >
                  Log In
                </Link>
                <Link href="/select-role">
                  <GreenButton label="Sign Up" />
                </Link>
              </div>
            )}

            <button
              className="p-2 rounded-md hover:bg-[hsl(140_30%_95%)] transition-colors md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className={mobileMenuClasses}>
          <div className="flex flex-col px-6 py-4 gap-4 bg-white">
            {/* Search - Mobile */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[hsl(140_30%_95%)] rounded-full px-4 py-2 mb-2"
            >
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search events..."
                className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                  setMenuOpen(false);
                }}
                className="text-gray-800 hover:text-[hsl(140_75%_20%)] transition-colors duration-150 font-medium py-2"
              >
                {item.name}
              </button>
            ))}

            {isLoggedIn ? (
              <div className="flex flex-col gap-4 pt-4 border-t border-[hsl(140_20%_90%)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 bg-[hsl(140_60%_85%)] rounded-full flex items-center justify-center"
                      onClick={() => router.push("/freelancer/profile")}
                    >
                      <span className="text-[hsl(140_75%_20%)] font-semibold text-sm">
                        U
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">User</span>
                  </div>
                  <button
                    className="text-sm text-[hsl(160_84%_39%)] hover:underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors"
                    onClick={() => router.push("/chat")}
                  >
                    <IoChatboxOutline
                      size={18}
                      className="text-[hsl(215.4_16.3%_46.9%)]"
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors">
                    <Settings
                      size={18}
                      className="text-[hsl(215.4_16.3%_46.9%)]"
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors">
                    <Bell
                      size={18}
                      className="text-[hsl(215.4_16.3%_46.9%)]"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t border-[hsl(140_20%_90%)]">
                <Link
                  href="/login"
                  className="text-gray-800 font-medium hover:text-[hsl(140_75%_20%)] transition-colors duration-150 py-2 text-center"
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