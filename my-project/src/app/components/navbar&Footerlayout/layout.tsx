"use client";
import React, { ReactNode } from "react";

import NavBar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
