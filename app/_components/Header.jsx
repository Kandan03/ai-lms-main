import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.svg"} width={30} height={30} alt="Logo" />
        <h1 className="text-xl font-semibold">LearnEase</h1>
      </Link>
      <Link href={"/dashboard"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default Header;
