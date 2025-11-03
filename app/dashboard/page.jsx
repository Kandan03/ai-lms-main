'use client';

import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("uid", user.uid);
      } else {
        console.log("user is logged out");
      }
    });
    return () => unsub();
  }, []);

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
    <div>
      Dashboard
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
