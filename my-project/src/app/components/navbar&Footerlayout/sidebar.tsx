"use client";
import { createElement, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { SideBarMenus, menuItems } from "./config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function hasTwoForwardSlashes(inputString: string): boolean {
  const regex = /\//g;
  const matches = inputString.match(regex);
  return matches ? matches.length >= 2 : false;
}

export function separateAtSecondSlash(inputString: string): string[] {
  const regex = /\//g;
  const matches = inputString.match(regex);

  if (matches && matches.length >= 2) {
    const indexOfSecondSlash = inputString.indexOf(
      "/",
      inputString.indexOf("/") + 1
    );
    if (indexOfSecondSlash !== -1) {
      const firstPart = inputString.slice(0, indexOfSecondSlash);
      const secondPart = inputString.slice(indexOfSecondSlash + 1);
      return [firstPart, secondPart];
    }
  }

  return [];
}

const sideBarOpenState = "UiState.isNavigationCollapsed.1";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof localStorage !== "undefined" &&
      localStorage.getItem(sideBarOpenState)
      ? localStorage.getItem(sideBarOpenState) === "true"
      : true
  );
  const pathname = usePathname();

  const renderMenuItem = (menu: SideBarMenus) => {
    const isActive = hasTwoForwardSlashes(pathname)
      ? separateAtSecondSlash(pathname)[0] === menu.link
      : pathname === menu.link;

    switch (menu.onAction) {
      case "settings":
      default:
        return (
          <Link
            href={menu.link}
            key={menu.name}
            className={`flex items-center justify-start font-medium h-7 rounded-md hover:bg-background hover:text-primary ${
              sidebarOpen ? " pl-1 w-[8rem] " : " justify-center w-[1.75rem] "
            }  ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground"
            }`}
            style={{
              transitionProperty: "width, opacity",
              transitionDuration: "0.5s",
              transitionTimingFunction: "ease-linear",
            }}
          >
            <div className="flex flex-row items-center gap-x-1">
              {menu.icon &&
                createElement(menu.icon, { size: menu.iconSize ?? "20" })}
              <span
                className={`flex items-center justify-center text-xs overflow-hidden truncate ${
                  !sidebarOpen && "hidden"
                }`}
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-linear",
                  maxHeight: sidebarOpen ? "2rem" : "0",
                }}
              >
                {menu.name}
              </span>
            </div>
          </Link>
        );
    }
  };

  return (
    <div className="hidden md:flex z-10 top-0 ">
      <div
        className={`scrollbar-none ${
          sidebarOpen ? "w-36" : "w-12 relative"
        } bg-background pt-2 px-2 relative text-foreground border-r border-divider transition-width-opacity`}
        style={{
          transitionProperty: "width, opacity",
          transitionDuration: "0.5s",
          transitionTimingFunction: "ease-linear",
        }}
      >
        <div className="flex flex-col gap-y-1.5">
          {menuItems.map((menu) => renderMenuItem(menu))}
        </div>
        <button
          className="bg-primary shadow-sm absolute w-[1.5rem] h-[1.5rem] -right-[.68rem] bottom-[5.5rem] rounded-full justify-center"
          onClick={() => {
            localStorage.setItem(sideBarOpenState, String(!sidebarOpen));
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <IoIosArrowBack
            className={`w-[1rem] h-[1rem] text-primary-foreground justify-center ml-1 cursor-pointer ${
              !sidebarOpen && "rotate-180"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
