import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Roster = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roster Management</h1>
        <p className="text-muted-foreground mt-2">Manage staff duty schedules and shifts</p>
      </div>

      <Tabs defaultValue="doctors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="doctors">Doctor Roster</TabsTrigger>
          <TabsTrigger value="nurses">Nursing Staff</TabsTrigger>
          <TabsTrigger value="shifts">Shift Management</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Duty Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Doctor roster module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nurses">
          <Card>
            <CardHeader>
              <CardTitle>Nursing Staff Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nursing roster module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts">
          <Card>
            <CardHeader>
              <CardTitle>Shift Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Shift management module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Roster;
