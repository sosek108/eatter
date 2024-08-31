'use client';
import React, { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  href: string;
  text: string;
};

const NavLink: FunctionComponent<Props> = ({ href, text }) => {
  const pathname = usePathname();

  return (
    <Link href={href} className={`transition-colors hover:text-foreground ${pathname === href ? 'text-foreground' : 'text-muted-foreground'}`}>
      {text}
    </Link>
  );
};

export default NavLink;
