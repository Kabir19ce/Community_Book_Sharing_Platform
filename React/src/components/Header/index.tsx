"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar, { passive: true });
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  return (
    <header
      className={`header top-0 left-0 w-full flex items-center z-20 transition ${
        sticky
          ? "fixed bg-white/80 backdrop-blur-sm dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-3 lg:py-5">
        {/* Logo */}
        

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center" aria-label="Go to homepage">
          <Image
            src="/images/CBSP.png"
            alt="CBSP Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>
          
       
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Header;
