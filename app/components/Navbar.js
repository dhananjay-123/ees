"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Navigator", href: "/" },
    { name: "Technical Logic", href: "/logic" },
    { name: "Credits", href: "/credits" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full h-16 bg-[#F1F5F9]/80 backdrop-blur-md border-b border-[#E2E8F0] z-[2000] px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#059669]/20">
            <img src="../../logo.webp" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-black tracking-tighter text-xl italic uppercase text-[#0F172A]">
            BREATHE<span className="text-[#059669]">PATH</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative py-1 ${pathname === link.href ? "text-[#059669]" : "text-[#64748B] hover:text-[#0F172A]"
                }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#059669] rounded-full animate-in fade-in duration-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden p-2 text-[#64748B] hover:bg-[#E2E8F0] rounded-xl transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-[#F1F5F9] z-[1999] p-8 flex flex-col gap-8 sm:hidden animate-in slide-in-from-top-2 duration-300">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${pathname === link.href ? "text-[#059669]" : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Background Dimmer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0F172A]/10 backdrop-blur-sm z-[1998] sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}