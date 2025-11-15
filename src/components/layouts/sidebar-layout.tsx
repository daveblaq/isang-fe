"use client";
import React, { Fragment, useState } from "react";
import Sidebar from "@/components/common/sidebar";
import Header from "@/components/common/header";

export default function DashLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            title={title}
          />

          <main className="flex-1 overflow-y-auto bg-white px-6 pb-8 pt-4">
            <div className="mx-auto max-w-screen-2xl">{children}</div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}
