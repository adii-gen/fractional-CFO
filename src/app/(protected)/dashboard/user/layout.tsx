import Sidebar from "@/components/user/sidebar";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SessionProvider>
  );
}
