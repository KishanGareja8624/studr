import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div
      className="flex h-screen"
    >
      {/* <div>
        <Sidebar />
      </div> */}
      <div className="flex flex-col flex-auto">
        {/* <div>
          <Navbar />
        </div> */}
        <main className="flex-1 flex overflow-hidden shadow-around bg-bg">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
