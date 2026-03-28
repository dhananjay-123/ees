"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Navigator", href: "/" },
    { name: "Technical Logic", href: "/logic" },
    { name: "Credits", href: "/credits" },
  ];

  return (
    <nav className="fixed top-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 z-[100] px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-emerald-600 rounded flex items-center justify-center text-white font-black italic">A</div>
        <span className="font-black tracking-tighter text-xl italic uppercase">
          AERO<span className="text-emerald-600">GRADIENT</span>
        </span>
      </div>

      <div className="flex gap-10">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[10px] font-bold uppercase tracking-widest transition-all relative py-1 ${
              pathname === link.href ? "text-emerald-600" : "text-slate-400 hover:text-slate-900"
            }`}
          >
            {link.name}
            {pathname === link.href && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
            )}
          </Link>
        ))}
      </div>
      
      <div className="hidden lg:block text-[9px] font-black text-slate-300 uppercase tracking-widest">
        Ver 2.6.0
      </div>
    </nav>
  );
}