import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Pill, DollarSign, UserCheck, Bed } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,284",
      icon: Users,
      variant: "primary" as const,
      trend: { value: "12% from last month", isPositive: true },
    },
    {
      title: "Active IPD",
      value: "142",
      icon: Bed,
      variant: "secondary" as const,
      trend: { value: "8% from last week", isPositive: true },
    },
    {
      title: "OPD Today",
      value: "89",
      icon: Activity,
      variant: "success" as const,
      trend: { value: "3% from yesterday", isPositive: false },
    },
    {
      title: "Revenue Today",
      value: "₹2.4L",
      icon: DollarSign,
      variant: "warning" as const,
      trend: { value: "18% from yesterday", isPositive: true },
    },
  ];

  const quickStats = [
    { label: "Visitors Today", value: "156", icon: UserCheck },
    { label: "Pharmacy Sales", value: "₹84K", icon: Pill },
    { label: "Lab Tests", value: "47", icon: Activity },
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
            <div className="space-y-4">
              {[
                { time: "10:30 AM", action: "New patient registration", patient: "John Doe", type: "OPD" },
                { time: "10:15 AM", action: "Discharge completed", patient: "Sarah Smith", type: "IPD" },
                { time: "10:00 AM", action: "Lab report ready", patient: "Mike Johnson", type: "Lab" },
                { time: "09:45 AM", action: "Surgery scheduled", patient: "Emma Wilson", type: "OT" },
                { time: "09:30 AM", action: "Pharmacy order", patient: "Robert Brown", type: "Pharmacy" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.patient}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <span className="text-xs font-medium text-primary">{activity.type}</span>
                  </div>
                </div>
              ))}
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
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-semibold mb-3">Bed Occupancy</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">General Ward</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ICU</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
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
              {[
                { time: "11:00 AM", doctor: "Dr. Smith", patient: "Alice Cooper" },
                { time: "11:30 AM", doctor: "Dr. Johnson", patient: "Bob Martin" },
                { time: "12:00 PM", doctor: "Dr. Williams", patient: "Carol Davis" },
              ].map((appt, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{appt.time}</p>
                    <p className="text-xs text-muted-foreground">{appt.patient}</p>
                  </div>
                  <span className="text-xs text-primary">{appt.doctor}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "INV-1234", amount: "₹12,500", patient: "John Doe" },
                { id: "INV-1235", amount: "₹8,300", patient: "Jane Smith" },
                { id: "INV-1236", amount: "₹15,700", patient: "Mike Wilson" },
              ].map((bill, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{bill.id}</p>
                    <p className="text-xs text-muted-foreground">{bill.patient}</p>
                  </div>
                  <span className="font-bold text-warning">{bill.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: "Low Stock", item: "Paracetamol 500mg", status: "critical" },
                { type: "Equipment", item: "X-Ray Machine #2", status: "warning" },
                { type: "Expiry Alert", item: "5 items expiring soon", status: "warning" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.item}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.status === 'critical' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
