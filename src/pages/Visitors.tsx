import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function Visitors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visitor Management</h1>
        <p className="text-muted-foreground">
          Track and manage hospital visitors
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Check-in Visitor</CardTitle>
            <CardDescription>Register new visitor entry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="visitorName">Visitor Name *</Label>
                <Input id="visitorName" placeholder="Enter visitor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitorMobile">Mobile Number *</Label>
                <Input id="visitorMobile" type="tel" placeholder="Enter mobile" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patientVisit">Patient to Visit *</Label>
                <Input id="patientVisit" placeholder="Search patient" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Ward/Department" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Input id="purpose" placeholder="Enter purpose" />
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline">Reset</Button>
              <Button>Check-in Visitor</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Today's Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Visitors</span>
                <span className="text-2xl font-bold text-primary">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Check-ins</span>
                <span className="text-2xl font-bold">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Checked-out</span>
                <span className="text-2xl font-bold">132</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Visitors</CardTitle>
          <CardDescription>Currently checked-in visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Rajesh Kumar", patient: "Anita Kumar", checkIn: "10:30 AM", duration: "1h 45m", purpose: "Family Visit" },
              { name: "Priya Sharma", patient: "Ramesh Sharma", checkIn: "11:15 AM", duration: "1h", purpose: "Medical Discussion" },
              { name: "Amit Patel", patient: "Sunita Patel", checkIn: "11:45 AM", duration: "30m", purpose: "Emergency Visit" },
              { name: "Neha Singh", patient: "Vikram Singh", checkIn: "12:00 PM", duration: "15m", purpose: "Document Submission" },
            ].map((visitor, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{visitor.name}</p>
                    <Badge variant="secondary">{visitor.duration}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Visiting: {visitor.patient} • {visitor.purpose}
                  </p>
                  <p className="text-xs text-muted-foreground">Check-in: {visitor.checkIn}</p>
                </div>
                <Button variant="outline" size="sm">Check-out</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
