"use client";
import React, { ReactNode } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <NavBar />
      <section className="w-full bg-background flex h-[calc(100vh-3.1rem)]">
        <Sidebar/>
      <div className="flex-1 overflow-y-auto">{children}</div>
      </section>
      <Footer />
    </main>
  );
};
export default PageLayout;
