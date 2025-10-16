import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Pill, DollarSign, UserCheck, Bed } from "lucide-react";

export default function Dashboard() {
  // Fetch real-time statistics
  const { data: patients } = useQuery({
    queryKey: ['patients-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: activeIPD } = useQuery({
    queryKey: ['active-ipd'],
    queryFn: async () => {
      const { count } = await supabase
        .from('ipd_admissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'admitted');
      return count || 0;
    }
  });

  const { data: todayRevenue } = useQuery({
    queryKey: ['today-revenue'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('bills')
        .select('total_amount')
        .gte('bill_date', today)
        .eq('status', 'paid');
      return data?.reduce((sum, bill) => sum + Number(bill.total_amount), 0) || 0;
    }
  });

  const { data: todayVisitors } = useQuery({
    queryKey: ['today-visitors'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { count } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true })
        .gte('check_in_time', today);
      return count || 0;
    }
  });

  const { data: todayPharmacySales } = useQuery({
    queryKey: ['today-pharmacy-sales'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('pharmacy_sales')
        .select('total_amount')
        .gte('sale_date', today);
      return data?.reduce((sum, sale) => sum + Number(sale.total_amount), 0) || 0;
    }
  });

  const { data: todayLabTests } = useQuery({
    queryKey: ['today-lab-tests'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { count } = await supabase
        .from('lab_orders')
        .select('*', { count: 'exact', head: true })
        .gte('order_date', today);
      return count || 0;
    }
  });

  const { data: recentAppointments } = useQuery({
    queryKey: ['recent-appointments'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('appointments')
        .select(`
          *,
          patients (full_name),
          staff!appointments_doctor_id_fkey (full_name)
        `)
        .eq('appointment_date', today)
        .order('appointment_time', { ascending: true })
        .limit(3);
      return data || [];
    }
  });

  const { data: pendingBills } = useQuery({
    queryKey: ['pending-bills'],
    queryFn: async () => {
      const { data } = await supabase
        .from('bills')
        .select(`
          *,
          patients (full_name)
        `)
        .eq('status', 'pending')
        .order('bill_date', { ascending: false })
        .limit(3);
      return data || [];
    }
  });

  const { data: lowStockItems } = useQuery({
    queryKey: ['low-stock-items'],
    queryFn: async () => {
      const { data } = await supabase
        .from('pharmacy_inventory')
        .select('*')
        .lt('stock_quantity', 'reorder_level')
        .limit(3);
      return data || [];
    }
  });

  const stats = [
    {
      title: "Total Patients",
      value: patients?.toString() || "0",
      icon: Users,
      variant: "primary" as const,
    },
    {
      title: "Active IPD",
      value: activeIPD?.toString() || "0",
      icon: Bed,
      variant: "secondary" as const,
    },
    {
      title: "OPD Today",
      value: recentAppointments?.length.toString() || "0",
      icon: Activity,
      variant: "success" as const,
    },
    {
      title: "Revenue Today",
      value: `₹${((todayRevenue || 0) / 1000).toFixed(1)}K`,
      icon: DollarSign,
      variant: "warning" as const,
    },
  ];

  const quickStats = [
    { label: "Visitors Today", value: todayVisitors?.toString() || "0", icon: UserCheck },
    { label: "Pharmacy Sales", value: `₹${((todayPharmacySales || 0) / 1000).toFixed(0)}K`, icon: Pill },
    { label: "Lab Tests", value: todayLabTests?.toString() || "0", icon: Activity },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Real-time activity feed coming soon
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAppointments && recentAppointments.length > 0 ? (
                recentAppointments.map((appt: any) => (
                  <div key={appt.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{appt.appointment_time}</p>
                      <p className="text-xs text-muted-foreground">{appt.patients?.full_name}</p>
                    </div>
                    <span className="text-xs text-primary">{appt.staff?.full_name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No appointments today</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingBills && pendingBills.length > 0 ? (
                pendingBills.map((bill: any) => (
                  <div key={bill.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{bill.bill_number}</p>
                      <p className="text-xs text-muted-foreground">{bill.patients?.full_name}</p>
                    </div>
                    <span className="font-bold text-warning">₹{Number(bill.total_amount).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No pending bills</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems && lowStockItems.length > 0 ? (
                lowStockItems.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">Low Stock</p>
                      <p className="text-xs text-muted-foreground">{item.medicine_name}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive">
                      critical
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No alerts</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
