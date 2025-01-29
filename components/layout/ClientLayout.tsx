"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import { MobileSidebar } from "./MobileSidebar";
import { DesktopSidebar } from "./DesktopSidebar";
import { SharedHeader } from "./SharedHeader";
import Aside from "./Aside";

type TClientLayout = {
  user: User;
  children: Readonly<React.ReactNode>;
};

export function ClientLayout({ user, children }: TClientLayout) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function openSidebar() {
    return setSidebarOpen((prev) => true);
  }
  function closeSidebar() {
    return setSidebarOpen((prev) => false);
  }

  return (
    <div className="relative">
      <MobileSidebar
        user={user}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <DesktopSidebar
        user={user}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="lg:pl-20">
        <SharedHeader
          user={user}
          sidebarOpen={sidebarOpen}
          closeSidebar={closeSidebar}
          openSidebar={openSidebar}
        />
        <main className="xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            {children}
          </div>
        </main>
      </div>

      <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-vodafone-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <Aside />
      </aside>
    </div>
  );
}
