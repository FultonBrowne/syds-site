"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full md:w-auto px-4 fixed top-0 left-1/2 translate-x-[-50%] md:rounded-lg bg-purple-100/80 backdrop-blur-sm md:border-border md:border-2 md:mt-4 z-50">
      <div className="flex justify-center items-center h-16">
        <div className="flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-purple-700 ${
                pathname === link.href
                  ? "text-purple-900 font-medium"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
