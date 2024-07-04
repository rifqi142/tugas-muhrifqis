"use client";

import { NAV_LINKS } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogIn, Users, Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 lg:px-10 3xl:px-0 py-5 bg-white z-30">
      <Link
        href="/"
        className="flex flex-row items-center"
        onClick={() => setIsMenuOpen(false)}
      >
        <Image src="/assets/logo-salon.png" alt="logo" width={30} height={20} />
        <span className="font-bold text-base xl:text-2xl ml-2 text-blue-30">
          Sea Salon
        </span>
      </Link>

      {/* Menu Icon for mobile */}
      <div className="lg:hidden">
        <Menu
          size={24}
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Navigation Links for large screens */}
      <ul className="hidden lg:flex h-full gap-12">
        {NAV_LINKS.map((nav) => (
          <Link
            href={nav.href}
            key={nav.key}
            className="regular-16 text-blue-40 flex items-center justify-center cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {nav.label}
          </Link>
        ))}
      </ul>

      <div className="hidden lg:flex flex-row gap-2 xl:gap-4">
        <Link href="/register" passHref onClick={() => setIsMenuOpen(false)}>
          <Button size="sm" variant="outline">
            <Users size={16} className="mr-2 h-4 w-4" />
            Register
          </Button>
        </Link>

        <Link href="/login" passHref onClick={() => setIsMenuOpen(false)}>
          <Button size="sm" className="bg-blue-40">
            <LogIn size={16} className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
      </div>

      {/* Navigation Links for mobile */}
      {isMenuOpen && (
        <ul className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-20">
          <div className="flex flex-row gap-2 xl:gap-4">
            <Link href="/register" passHref>
              <Button size="sm" variant="outline">
                <Users size={16} className="mr-2 h-4 w-4" />
                Register
              </Button>
            </Link>

            <Link href="/login" passHref>
              <Button size="sm" className="bg-blue-40">
                <LogIn size={16} className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
          {NAV_LINKS.map((nav) => (
            <Link
              href={nav.href}
              key={nav.key}
              className="regular-16 text-blue-40 flex items-center justify-center cursor-pointer pb-1.5 transition-all hover:font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {nav.label}
            </Link>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
