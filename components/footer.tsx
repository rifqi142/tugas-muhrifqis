import { SOCIAL_LINKS } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="w-full py-2 px-5 xl:px-20">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 xl:gap-5">
          {SOCIAL_LINKS.map((social) => (
            <Link
              href={social.href}
              key={social.key}
              rel="noopener"
              target="_blank"
              passHref
            >
              <Image
                src={social.image}
                alt={social.key}
                width={20}
                height={20}
                className="cursor-pointer hover:opacity-70 transition-all"
              />
            </Link>
          ))}
        </div>
        <p className="regular-12 xl:regular-16 text-muted-foreground">
          Copyright &copy; 2021 Sea Salon.
        </p>
      </div>
    </section>
  );
};

export default Footer;
