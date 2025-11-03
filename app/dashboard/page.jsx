'use client';

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";

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

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
