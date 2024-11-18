import {
  Sidebar as SidebarCN,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSignOutMutation } from "@/redux/apis/auth.api";
import {
  ArrowLeft,
  Layers,
  Layers2,
  Aperture,
  LayoutDashboard,
  ShoppingBag,
  Store,
  Users,
  PaintbrushVertical,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Layers2,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    title: "Collections",
    href: "/admin/collections",
    icon: Aperture,
  },
  {
    title: "Variants",
    href: "/admin/variants",
    icon: PaintbrushVertical,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Shop",
    href: "/shop",
    icon: Store,
  },
];

function Sidebar() {
  const location = useLocation();
  const [signout] = useSignOutMutation();
  return (
    <SidebarCN className="" variant="sidebar">
      <SidebarHeader className="h-16 flex flex-row items-center px-4">
        <img src="/assets/logo.png" alt="" className="w-8" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span>Admin</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full hover:bg-brand-600 hover:text-primary-foreground",
                      {
                        "bg-brand-600 text-primary-foreground":
                          location.pathname === link.href,
                      }
                    )}
                  >
                    <Link to={link.href}>
                      <link.icon />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton variant="outline" onClick={() => signout()}>
          <ArrowLeft className="h-4 w-4" />
          Sign out
        </SidebarMenuButton>
      </SidebarFooter>
    </SidebarCN>
  );
}

export default Sidebar;
