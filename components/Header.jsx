"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-session", { method: "POST" });
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Logo />
      {!checking && (
        user ? (
          <div className="flex gap-2">
            <Link href={"/dashboard"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href={"/login"}>
              <Button variant="outline">Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button>Get Started</Button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default Header;
