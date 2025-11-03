"use client";
import { FileStack, Home, LogOut, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "../ui/logo";

function SideBar() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <Home />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <FileStack />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <Shield />,
      path: "/dashboard/upgrade",
    },
  ];
  const path = usePathname();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-session", { method: "POST" });
      await signOut(auth);
      router.push("/");
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Logo />
      <hr className="my-5" />

      <ul>
        {Menu.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                item.path === path ? "bg-gray-100 text-black" : ""
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-10 w-[80%]">
        <Button onClick={handleLogout}>Logout</Button>
        <h2 className="text-sm my-2"> Out of 5 Course created</h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimted course generate
        </h2>
      </div>
    </div>
  );
}

export default SideBar;
