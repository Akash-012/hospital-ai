import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Laboratory = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Laboratory Information System (LIMS)</h1>
        <p className="text-muted-foreground mt-2">Manage lab tests, samples, and results</p>
      </div>

      <Tabs defaultValue="tests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tests">Test Requests</TabsTrigger>
          <TabsTrigger value="samples">Sample Collection</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Test Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Laboratory module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="samples">
          <Card>
            <CardHeader>
              <CardTitle>Sample Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sample tracking module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Results entry module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Lab Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Reports module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Laboratory;
