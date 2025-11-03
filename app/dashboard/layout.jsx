import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="md:ml-64 p-10">
        <Header />
        {children}
        </div>
    </div>
  );
};

export default DashboardLayout;
