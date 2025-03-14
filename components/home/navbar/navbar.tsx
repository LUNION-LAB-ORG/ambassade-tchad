"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Search, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Head() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems: {
    name: string;
    link?: string;
    children?:
      | {
          name: string;
          link: string;
        }[]
      | undefined;
  }[] = [
    { name: "Accueil", link: "/" },
    {
      name: "L'Ambassade",
      link: "/ambassade",
    },
    { name: "Services consulaires", link: "/consulaire" },
    { name: "Investir au Tchad", link: "https://anie.td/accueil/qui-sommes-nous/" },
    
    {
      name: "Tourisme",

      children: [
        { name: "Site touristique", link: "/tourisme" },
        { name: "Le Tchad", link: "/tourisme/tchad-s" },
        {
          name: "les peuples et cultures",
          link: "/tourisme/peuples-et-cultures",
        },
      ],
    },
    // { name: "Menus", link: "/menus" },
  ];

  return (
    <div className="w-full bg-primary p-4">
      {/* Navbar container */}
      <div className="flex justify-between md:justify-center gap-0 md:gap-6 items-center max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="Embassy of Chad Logo"
            width={80}
            height={80}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-col text-white">
          {/* En-tête */}
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                AMBASSADE DU TCHAD CÔTE D&apos;IVOIRE
              </span>
            </div>

            {/* Langues + Recherche */}
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <Link
                  href="/fr"
                  className="text-sm text-red-500 hover:underline"
                >
                  FR
                </Link>
                <span className="text-sm text-white">|</span>
                <Link href="/en" className="text-sm text-white hover:underline">
                  EN
                </Link>
              </div>

              <div className="flex items-center bg-[#123682] rounded-full px-6 py-1">
                <Search className="text-white" size={24} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent text-white placeholder-white/70 focus:outline-none ml-2 w-52 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Contacts + Menu */}
          <div className="border-t border-white flex justify-between items-center gap-4 mt-4 pt-2">
            {/* Contacts */}
            <div className="flex flex-col text-white">
              <span className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm">Tel: +225 27 22 39 49 13</span>
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-sm">
                  Email: ambassade.tchadabj@ambatchad.ci
                </span>
              </span>
            </div>

            {/* Menu Desktop */}
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((menu, index) => {
                  return (
                    <NavigationMenuItem key={index}>
                      {menu.children && !menu.link ? (
                        <>
                          <NavigationMenuTrigger className="bg-primary hover:bg-primary">
                            <span
                              key={menu.name}
                              className="text-sm px-2 text-white hover:text-[#123682] transition-colors font-medium"
                            >
                              {menu.name}
                            </span>
                          </NavigationMenuTrigger>

                          <NavigationMenuContent className="z-10">
                            <ul className="grid w-[600px] bg-primary  gap-3 p-4">
                              {menu?.children?.map((child, x) => {
                                return (
                                  <Link
                                    href={child.link}
                                    className="text-white hover:text-primary hover:bg-white p-2 rounded-lg"
                                    key={x}
                                  >
                                    {child.name}
                                  </Link>
                                );
                              })}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          key={menu.name}
                          href={menu.link ?? ""}
                          className={`text-sm px-2 ${
                            pathname === menu.link
                              ? "bg-white text-[#00205B] rounded-full"
                              : "text-white hover:bg-[#123682] rounded-full transition-colors"
                          }`}
                        >
                          {menu.name}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center text-white mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.link ?? ""}
              className="py-2 text-lg w-full text-center border-b border-white"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
