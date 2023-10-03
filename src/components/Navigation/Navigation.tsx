"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidPlaneTakeOff } from "react-icons/bi";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const { status, data } = useSession();

  const handleLoginClick = () => signIn();

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    signOut();
  };

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        divRef.current &&
        !divRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    addEventListener("mousedown", handleClickOutside);
    addEventListener("keydown", handleEscape);
    return () => {
      removeEventListener("keydown", handleEscape);
      removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center lg:border-b lg:border-primaryLighter">
      <Link href="/" className="flex items-center gap-1">
        <BiSolidPlaneTakeOff size={28} />
        <h1 className="text-gray-900 text-xl">Traveling</h1>
      </Link>

      {status === "unauthenticated" && (
        <button
          className="text-gray-900 text-base font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}

      {status === "authenticated" && data.user && (
        <div className="flex items-center gap-3 border-primaryLighter border border-solid rounded-full p-2 px-3 relative">
          <Image
            height={35}
            width={35}
            src={data.user.image!}
            alt={data.user.name!}
            className="rounded-full shadow-md"
          />
          <div ref={divRef}>
            <AiOutlineMenu
              size={24}
              onClick={handleMenuClick}
              className="cursor-pointer"
            />
          </div>

          {isMenuOpen && (
            <nav
              className="absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center  text-gray-900 text-sm font-semibold text-center z-50"
              ref={divRef}
            >
              <Link
                className="pb-2 border-b border-primary border-solid"
                href="/my-trips"
                onClick={() => setIsMenuOpen(false)}
              >
                Minhas viagens
              </Link>

              <button className="pt-2" onClick={handleLogoutClick}>
                Logout
              </button>
            </nav>
          )}
        </div>
      )}
    </header>
  );
};

export default Navigation;
