"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  console.log("pathname = ", pathname);

  return (
    <header className="bg-slate-100 flex justify-center items-center shadow-md px-7">
      <Link
        href="/"
        className={`py-3 px-5 hover:bg-gray-300 cursor-pointer ${
          pathname === "/" && "bg-green-400"
        }`}
      >
        Home
      </Link>

      <Link
        href="/articles"
        className={`py-3 px-5 hover:bg-gray-300 cursor-pointer ${
          pathname === "/articles" && "bg-green-400"
        }`}
      >
        Articles
      </Link>
    </header>
  );
}

export default Navbar;
