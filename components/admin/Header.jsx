import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Link href={"/dashboard"}>User
      </Link>
    </div>
  );
};

export default Header;
