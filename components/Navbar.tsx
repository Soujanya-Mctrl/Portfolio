"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#qualifications" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled
      setIsScrolled(currentScrollY > 50);

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed left-1/2 z-50 transition-all duration-300 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-[120%] opacity-0"
        } ${isScrolled
          ? "top-4 w-[95%] max-w-5xl -translate-x-1/2 rounded-full border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
          : "top-0 w-full -translate-x-1/2"
        }`}
    >
      <div className="relative h-16 px-6 md:px-8">

        {/* LEFT: Logo */}
        <div className="absolute left-25 top-1/2 h-1 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Soujanya</span>
          </Link>
        </div>

        {/* CENTER: Nav Items */}
        <div className="absolute left-1/2 top-0 h-16 flex items-center -translate-x-1/2 transform">
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT: Theme Toggle */}
        <div className="absolute right-20 top-0 h-16 flex items-center">
          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
}
