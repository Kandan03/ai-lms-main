import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <Image src="/logo.svg" width={30} height={30} alt="Logo" />
    <h1 className="text-xl font-semibold">LearnEase</h1>
  </Link>
);

export default Logo;