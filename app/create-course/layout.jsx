"use client";
import React, { useState } from "react";
import Header from "@/components/admin/Header";

function CreateCourseLayout({ children }) {
  return (
    <div>
      <>
        <Header />
        {children}
      </>
    </div>
  );
}

export default CreateCourseLayout;
