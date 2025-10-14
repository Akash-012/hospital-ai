import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DietKitchen = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Diet & Kitchen</h1>
        <p className="text-muted-foreground mt-2">Manage patient diets, menus, and kitchen operations</p>
      </div>

      <Tabs defaultValue="diet" className="space-y-4">
        <TabsList>
          <TabsTrigger value="diet">Diet Orders</TabsTrigger>
          <TabsTrigger value="menu">Menu Planning</TabsTrigger>
          <TabsTrigger value="kitchen">Kitchen Management</TabsTrigger>
        </TabsList>

        <TabsContent value="diet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Diet Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Diet order module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Menu Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Menu management module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kitchen">
          <Card>
            <CardHeader>
              <CardTitle>Kitchen Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Kitchen management module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DietKitchen;
