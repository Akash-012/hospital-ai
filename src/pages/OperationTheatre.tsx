import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OperationTheatre = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operation Theatre (OT)</h1>
        <p className="text-muted-foreground mt-2">Manage OT schedules, procedures, and records</p>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">OT Schedule</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
          <TabsTrigger value="records">Surgery Records</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's OT Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">OT scheduling module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures">
          <Card>
            <CardHeader>
              <CardTitle>Ongoing Procedures</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Procedure tracking module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Surgery Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Surgery records module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationTheatre;
