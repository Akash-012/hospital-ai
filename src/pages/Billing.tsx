import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Cash Counter</h1>
        <p className="text-muted-foreground">
          Patient billing, payments, and receipt management
        </p>
      </div>

      <Tabs defaultValue="new-bill" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-bill">New Bill</TabsTrigger>
          <TabsTrigger value="pending">Pending Bills</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="new-bill" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Generate Bill</CardTitle>
                <CardDescription>Create new bill for patient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="billPatient">Patient ID / Name</Label>
                    <Input id="billPatient" placeholder="Search patient" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billType">Bill Type</Label>
                    <Select>
                      <SelectTrigger id="billType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opd">OPD</SelectItem>
                        <SelectItem value="ipd">IPD</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="package">Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Bill Items</h4>
                    <Button size="sm">Add Item</Button>
                  </div>

                  <div className="border rounded-lg divide-y">
                    {[
                      { service: "Consultation Fee", quantity: 1, rate: 500, amount: 500 },
                      { service: "Blood Test - CBC", quantity: 1, rate: 300, amount: 300 },
                      { service: "X-Ray", quantity: 1, rate: 800, amount: 800 },
                    ].map((item, i) => (
                      <div key={i} className="p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{item.service}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity} × ₹{item.rate}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold">₹{item.amount}</span>
                          <Button variant="ghost" size="sm">×</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input id="discount" type="number" placeholder="0" defaultValue="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountReason">Discount Reason</Label>
                    <Select>
                      <SelectTrigger id="discountReason">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="senior">Senior Citizen</SelectItem>
                        <SelectItem value="staff">Staff Discount</SelectItem>
                        <SelectItem value="charity">Charity</SelectItem>
                        <SelectItem value="corporate">Corporate Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Bill Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹1,600</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount (0%)</span>
                    <span className="font-medium">₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="font-medium">₹80</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-bold">Total Amount</span>
                    <span className="font-bold text-lg text-primary">₹1,680</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Label htmlFor="paymentMode">Payment Mode</Label>
                  <Select>
                    <SelectTrigger id="paymentMode">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label htmlFor="amountReceived">Amount Received</Label>
                    <Input id="amountReceived" type="number" placeholder="Enter amount" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="changeReturn">Change to Return</Label>
                    <Input id="changeReturn" disabled placeholder="₹0" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button className="w-full">Generate Bill</Button>
                  <Button variant="outline" className="w-full">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Bills</CardTitle>
              <CardDescription>Bills awaiting payment or clearance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: "INV-1234", patient: "John Doe", amount: 12500, type: "IPD", date: "2024-01-15", status: "pending" },
                  { id: "INV-1235", patient: "Jane Smith", amount: 8300, type: "OPD", date: "2024-01-15", status: "partial" },
                  { id: "INV-1236", patient: "Mike Wilson", amount: 15700, type: "Emergency", date: "2024-01-14", status: "pending" },
                ].map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{bill.id}</p>
                        <Badge variant={bill.status === "pending" ? "destructive" : "secondary"}>
                          {bill.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bill.patient} • {bill.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{bill.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{bill.date}</p>
                      </div>
                      <Button size="sm">Pay Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Receipts</CardTitle>
              <CardDescription>View and reprint receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: "RCP-5678", patient: "Alice Cooper", amount: 5200, date: "2024-01-15 10:30 AM", mode: "Cash" },
                  { id: "RCP-5679", patient: "Bob Martin", amount: 3400, date: "2024-01-15 11:15 AM", mode: "UPI" },
                  { id: "RCP-5680", patient: "Carol Davis", amount: 7800, date: "2024-01-15 12:00 PM", mode: "Card" },
                ].map((receipt) => (
                  <div key={receipt.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{receipt.id}</p>
                      <p className="text-sm text-muted-foreground">{receipt.patient}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold">₹{receipt.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {receipt.mode} • {receipt.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Print</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
