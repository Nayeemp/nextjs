"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Navbar() {
  const pathname = usePathname();
  // console.log("pathname = ", pathname);

  // useEffect(() => {
  //   console.log("mounting");
  // });

  return (
    <header className="bg-slate-100 flex justify-center items-center shadow-md px-7 mb-5">
      <Link
        href="/"
        className={`py-3 px-5 hover:bg-gray-300 cursor-pointer border-x ${
          pathname === "/" && "bg-green-400"
        }`}
      >
        Home
      </Link>

      <Link
        href="/articles"
        className={`py-3 px-5 hover:bg-gray-300 cursor-pointer border-x ${
          pathname === "/articles" && "bg-green-400"
        }`}
      >
        Articles
      </Link>

      <Link
        href="articles-client"
        className={`py-3 px-5 hover:bg-gray-300 cursor-pointer border-x ${
          pathname === "/articles-client" && "bg-green-400"
        }`}
      >
        Articles in Client side
      </Link>

      <Link
        href="erp"
        className={`py-3 px-5 hover:bg-gray-300 cursor-pointer border-x ${
          pathname === "/erp" && "bg-green-400"
        }`}
      >
        Erp
      </Link>
    </header>
  );
}

export default Navbar;
