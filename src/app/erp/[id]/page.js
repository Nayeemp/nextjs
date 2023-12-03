"use client";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  console.log("pathname = ", pathname);

  return <div className="container">Your id - {pathname}</div>;
}
