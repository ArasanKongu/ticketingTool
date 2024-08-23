"use client";
import React, { ReactNode } from "react";
import NavBar from "./navbar";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <NavBar />
      <section className="w-full bg-background flex h-[calc(100vh-3.1rem)]">
        <Sidebar />
        <div className="flex-1 overflow-y-hidden">{children}</div>
      </section>
    </main>
  );
};
export default PageLayout;
