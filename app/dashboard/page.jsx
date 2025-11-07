'use client';

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import AddCourse from "@/components/admin/AddCourse";

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
      <AddCourse />
    </div>
  );
};

export default Dashboard;
