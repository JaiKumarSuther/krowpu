"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings, Bell, Menu, X, Search } from "lucide-react";
import GreenButton from "@/components/buttons/GreenButton";
import { useRouter } from "next/navigation";
import { IoChatboxOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const navItems = [
    { name: "Events", id: "events-section" },
    { name: "Pricing", id: "pricing-section" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const mobileMenuClasses = `md:hidden ${menuOpen ? "block" : "hidden"}`;

  return (
    <motion.header 
      className="w-full bg-white border-b border-[hsl(140_20%_90%)] shadow-sm sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
            </motion.div>

            {!isLoggedIn && (
              <motion.nav 
                className="hidden md:flex gap-6 items-center ml-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      const el = document.getElementById(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-gray-800 hover:text-[hsl(140_75%_20%)] transition-colors duration-150 font-medium text-sm uppercase tracking-wider"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <motion.div 
                className="hidden md:flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {user?.role === "freelancer" && (
                  <motion.button
                    className="text-sm text-gray-700 hover:text-[hsl(140_75%_20%)] transition-colors"
                    onClick={() => router.push("/freelancer/saved-jobs")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Saved Jobs
                  </motion.button>
                )}
                <motion.button
                  className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors"
                  onClick={() => router.push("/chat")}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoChatboxOutline
                    size={18}
                    className="text-[hsl(215.4_16.3%_46.9%)]"
                  />
                </motion.button>
                <motion.button 
                  className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Settings
                    size={18}
                    className="text-[hsl(215.4_16.3%_46.9%)]"
                  />
                </motion.button>
                <motion.button 
                  className="p-2 rounded-full hover:bg-[hsl(140_30%_95%)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell size={18} className="text-[hsl(215.4_16.3%_46.9%)]" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-md text-sm text-[hsl(160_84%_39%)] hover:underline"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
                <motion.div
                  className="w-9 h-9 bg-[hsl(140_60%_85%)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[hsl(140_75%_20%)/0.2] transition-colors duration-150"
                  onClick={() => {
                    if (user?.role === "client") {
                      router.push("/client/profile");
                    } else {
                      router.push("/freelancer/profile");
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-[hsl(140_75%_20%)] font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="hidden md:flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="text-gray-800 font-medium hover:text-[hsl(140_75%_20%)] transition-colors duration-150"
                  >
                    Log In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/select-role">
                    <GreenButton label="Sign Up" />
                  </Link>
                </motion.div>
              </motion.div>
            )}

            <motion.button
              className="p-2 rounded-md hover:bg-[hsl(140_30%_95%)] transition-colors md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              className={mobileMenuClasses}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="flex flex-col px-6 py-4 gap-4 bg-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
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
                          onClick={() => {
                            if (user?.role === "client") {
                              router.push("/client/profile");
                            } else {
                              router.push("/freelancer/profile");
                            }
                          }}
                        >
                          <span className="text-[hsl(140_75%_20%)] font-semibold text-sm">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <span className="font-medium text-gray-800">{user?.name || 'User'}</span>
                      </div>
                      <button
                        className="text-sm text-[hsl(160_84%_39%)] hover:underline"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                    {user?.role === "freelancer" && (
                      <button
                        className="text-left text-sm text-gray-700 hover:text-[hsl(140_75%_20%)] transition-colors py-2"
                        onClick={() => {
                          router.push("/freelancer/saved-jobs");
                          setMenuOpen(false);
                        }}
                      >
                        Saved Jobs
                      </button>
                    )}
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
                        <Bell size={18} className="text-[hsl(215.4_16.3%_46.9%)]" />
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
