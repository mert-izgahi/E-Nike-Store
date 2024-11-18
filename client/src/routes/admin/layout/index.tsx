import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./_components/Sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export { Layout };
