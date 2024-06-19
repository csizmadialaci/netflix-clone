"use client";
import Link from "next/link";
import Logo from "../../public/netflix_logo.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BellIcon, ChevronsLeft, Rows, SearchIcon } from "lucide-react";
import UserNav from "./UserNav";
import { useState } from "react";
import SearchBar from "./SearchBar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LinkProps {
  name: string;
  href: string;
}

const links: LinkProps[] = [
  { name: "Home", href: "/home" },
  { name: "Tv Shows", href: "/home/shows" },
  { name: "Movies", href: "/home/movies" },
  { name: "Recently Added", href: "/home/recently" },
  { name: "My List", href: "/home/user/list" },
];

export default function Navbar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => {
    setSheetOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-6 lg:px-8 flex">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={Logo} alt="Logo" />
        </Link>

        <ul className="hidden lg:flex gap-x-4 ml-14">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-white font-semibold underline text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href={link.href}
                    className="text-gray-300 font-normal text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="hidden lg:flex items-center gap-x-8">
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          <SearchIcon className="w-6 h-6 text-gray-300 cursor-pointer" />
        </button>
        <SearchBar state={open} changeState={setOpen} />

        <BellIcon className="w-6 h-6 text-gray-300 cursor-pointer" />
        <UserNav />
      </div>
      <div className="flex lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <ChevronsLeft height={40} width={40} />
          </SheetTrigger>
          <SheetContent className="bg-black">
            <SheetHeader>
              <SheetTitle>
                <ul className="mt-6 flex flex-col gap-y-6 items-center justify-center">
                  {links.map((link, idx) => (
                    <div key={idx}>
                      {pathName === link.href ? (
                        <li>
                          <Link
                            href={link.href}
                            className="text-white font-semibold underline text-2xl"
                            onClick={closeSheet}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            href={link.href}
                            className="text-gray-300 font-normal text-2xl"
                            onClick={closeSheet}
                          >
                            {link.name}
                          </Link>
                        </li>
                      )}
                    </div>
                  ))}
                </ul>
                <div className="mt-14 flex lg:hidden items-center justify-center gap-x-16">
                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <SearchIcon className="w-10 h-10 text-gray-300 cursor-pointer" />
                  </button>
                  <SearchBar state={open} changeState={setOpen} />

                  <BellIcon className="w-10 h-10 text-gray-300 cursor-pointer" />
                  <UserNav />
                </div>
              </SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
