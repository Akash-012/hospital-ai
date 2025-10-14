import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pharmacy() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pharmacy Management</h1>
        <p className="text-muted-foreground">
          Medicine sales, inventory tracking, and stock management
        </p>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>New Sale</CardTitle>
                <CardDescription>Process pharmacy sales and prescriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="salePatient">Patient ID / Name</Label>
                    <Input id="salePatient" placeholder="Search patient (optional)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionId">Prescription ID</Label>
                    <Input id="prescriptionId" placeholder="Enter prescription ID (optional)" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="medicine">Medicine Name</Label>
                      <Input id="medicine" placeholder="Search medicine" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" placeholder="0" />
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Add</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg divide-y">
                    {[
                      { name: "Paracetamol 500mg", batch: "B2401", qty: 10, price: 5, expiry: "Dec 2025" },
                      { name: "Amoxicillin 250mg", batch: "B2402", qty: 15, price: 12, expiry: "Jun 2025" },
                      { name: "Cetirizine 10mg", batch: "B2403", qty: 20, price: 3, expiry: "Sep 2025" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Batch: {item.batch} • Exp: {item.expiry}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm">Qty: {item.qty}</p>
                            <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                          </div>
                          <span className="font-bold w-20 text-right">₹{item.qty * item.price}</span>
                          <Button variant="ghost" size="sm">×</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Sale Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹290</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-medium">₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (12%)</span>
                    <span className="font-medium">₹34.80</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg text-primary">₹324.80</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="salePaymentMode">Payment Mode</Label>
                    <Input id="salePaymentMode" placeholder="Cash / Card / UPI" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="saleAmount">Amount Received</Label>
                    <Input id="saleAmount" type="number" placeholder="Enter amount" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button className="w-full">Complete Sale</Button>
                  <Button variant="outline" className="w-full">Print Bill</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medicine Inventory</CardTitle>
              <CardDescription>Current stock levels and batch information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Search medicines..." />
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-sm">
                        <th className="p-3 text-left font-medium">Medicine Name</th>
                        <th className="p-3 text-left font-medium">Batch No</th>
                        <th className="p-3 text-left font-medium">Stock</th>
                        <th className="p-3 text-left font-medium">Expiry</th>
                        <th className="p-3 text-left font-medium">Rate</th>
                        <th className="p-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        { name: "Paracetamol 500mg", batch: "B2401", stock: 1500, expiry: "Dec 2025", rate: 5, status: "good" },
                        { name: "Amoxicillin 250mg", batch: "B2402", stock: 450, expiry: "Jun 2025", rate: 12, status: "good" },
                        { name: "Cetirizine 10mg", batch: "B2403", stock: 85, expiry: "Sep 2025", rate: 3, status: "low" },
                        { name: "Azithromycin 500mg", batch: "B2404", stock: 25, expiry: "Feb 2025", rate: 25, status: "critical" },
                        { name: "Ibuprofen 400mg", batch: "B2405", stock: 800, expiry: "Aug 2025", rate: 8, status: "good" },
                      ].map((item, i) => (
                        <tr key={i} className="text-sm hover:bg-muted/50">
                          <td className="p-3 font-medium">{item.name}</td>
                          <td className="p-3 text-muted-foreground">{item.batch}</td>
                          <td className="p-3">{item.stock}</td>
                          <td className="p-3 text-muted-foreground">{item.expiry}</td>
                          <td className="p-3">₹{item.rate}</td>
                          <td className="p-3">
                            <Badge
                              variant={
                                item.status === "good"
                                  ? "secondary"
                                  : item.status === "low"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Low Stock Items</CardTitle>
                <CardDescription>Items below reorder level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Cetirizine 10mg", stock: 85, reorder: 100, batch: "B2403" },
                    { name: "Azithromycin 500mg", stock: 25, reorder: 50, batch: "B2404" },
                    { name: "Metformin 500mg", stock: 45, reorder: 100, batch: "B2406" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Current: {item.stock} | Reorder: {item.reorder}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">Reorder</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Expiry Alerts</CardTitle>
                <CardDescription>Items expiring within 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Amoxicillin 250mg", expiry: "Feb 2025", stock: 120, batch: "B2402" },
                    { name: "Vitamin B12", expiry: "Mar 2025", stock: 80, batch: "B2407" },
                    { name: "Aspirin 75mg", expiry: "Apr 2025", stock: 200, batch: "B2408" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {item.expiry} | Stock: {item.stock}
                        </p>
                      </div>
                      <Badge variant="destructive">Expiring</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
