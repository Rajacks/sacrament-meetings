"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "Current Meeting" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 text-sm font-medium">
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href === "/meetings" &&
            pathname.startsWith("/meetings/") &&
            pathname !== "/meetings/current");

        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              active
                ? "text-blue-900 font-bold underline underline-offset-4"
                : "text-slate-600 hover:text-blue-700"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
