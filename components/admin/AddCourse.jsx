"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";

const AddCourse = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (uid) => {
      if (uid) {
        setUser(uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl">
          Hello,{" "}
          <span className="font-bold">
            {user?.displayName || user?.email || "User"}
          </span>
        </h2>
        <p className="text-sm text-gray-500">
          Create new course with AI, Share with friends and Earn from it
        </p>
      </div>
      <Link href={"/create-course"}>
        <Button>+ Create AI Course</Button>
      </Link>
    </div>
  );
};

export default AddCourse;
