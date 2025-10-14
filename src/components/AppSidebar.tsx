import { NavLink } from "react-router-dom";
import {
  Users,
  Stethoscope,
  CreditCard,
  Pill,
  UserCheck,
  FlaskConical,
  Activity,
  Calendar,
  LayoutDashboard,
  FileText,
  Package,
  Utensils,
  ClipboardList,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const mainModules = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "RADT", url: "/radt", icon: Users },
  { title: "OPD Consultation", url: "/opd", icon: Stethoscope },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Pharmacy", url: "/pharmacy", icon: Pill },
  { title: "Laboratory", url: "/lab", icon: FlaskConical },
];

const additionalModules = [
  { title: "Visitors", url: "/visitors", icon: UserCheck },
  { title: "Operation Theatre", url: "/ot", icon: Activity },
  { title: "Nursing Desk", url: "/nursing", icon: ClipboardList },
  { title: "Roster", url: "/roster", icon: Calendar },
  { title: "Diet & Kitchen", url: "/diet", icon: Utensils },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">MediCore</h2>
            <p className="text-xs text-sidebar-foreground/70">Hospital Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainModules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Additional Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {additionalModules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
