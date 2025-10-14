import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NursingDesk = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nursing Care Desk</h1>
        <p className="text-muted-foreground mt-2">Patient care, vitals, and nursing documentation</p>
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="vitals">Vitals Chart</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="notes">Nursing Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Patient assignment module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Vitals tracking module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medication Administration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Medication tracking module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Nursing Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nursing documentation module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NursingDesk;
