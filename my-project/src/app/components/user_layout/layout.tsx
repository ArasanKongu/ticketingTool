"use client";

import Image from "next/image";

import React, { ReactNode } from "react";
import imag from "../../../../public/aaa.jpg";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl"
        style={{ height: "500px" }}
      >
        <div className="hidden md:block w-1/2">
          <Image
            src={imag}
            alt="Lovebirds"
            className="w-full h-full object-cover"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
