"use client";

import { type ReactNode, useState, useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";


interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user ?? null);
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-poppins">
      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 bottom-0 w-[260px] bg-white p-5 shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleMobileSidebar={toggleMobileSidebar} user={user} />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
