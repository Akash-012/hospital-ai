import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OPDConsultation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">OPD Consultation</h1>
        <p className="text-muted-foreground">
          Out-patient consultation and electronic medical records
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Patient Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Search by ID or Name" />
            <div className="space-y-2">
              {[
                { id: "PT001", name: "John Doe", age: 45, lastVisit: "2 days ago" },
                { id: "PT002", name: "Sarah Smith", age: 32, lastVisit: "1 week ago" },
                { id: "PT003", name: "Mike Johnson", age: 58, lastVisit: "3 days ago" },
              ].map((patient) => (
                <div
                  key={patient.id}
                  className="p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.id} • {patient.age}y
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Consultation Form</CardTitle>
            <CardDescription>Patient: John Doe (PT001) • Age: 45y • M</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="vitals" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="vitals">Vitals</TabsTrigger>
                <TabsTrigger value="complaints">Complaints</TabsTrigger>
                <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
              </TabsList>

              <TabsContent value="vitals" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bp">Blood Pressure</Label>
                    <Input id="bp" placeholder="120/80 mmHg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pulse">Pulse Rate</Label>
                    <Input id="pulse" placeholder="72 bpm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temp">Temperature</Label>
                    <Input id="temp" placeholder="98.6 °F" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" placeholder="70 kg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" placeholder="170 cm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bmi">BMI</Label>
                    <Input id="bmi" placeholder="Auto-calculated" disabled />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="spo2">SpO2</Label>
                    <Input id="spo2" placeholder="98%" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="respRate">Respiratory Rate</Label>
                    <Input id="respRate" placeholder="16 /min" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="complaints" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                  <Textarea
                    id="chiefComplaint"
                    placeholder="Enter patient's main complaint"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="history">History of Present Illness</Label>
                  <Textarea
                    id="history"
                    placeholder="Enter detailed history"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pastHistory">Past Medical History</Label>
                  <Textarea
                    id="pastHistory"
                    placeholder="Any relevant past medical history"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="diagnosis" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provisionalDiagnosis">Provisional Diagnosis</Label>
                  <Input id="provisionalDiagnosis" placeholder="Enter diagnosis" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examination">Clinical Examination Findings</Label>
                  <Textarea
                    id="examination"
                    placeholder="Enter examination findings"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investigations">Investigations Advised</Label>
                  <Textarea
                    id="investigations"
                    placeholder="CBC, Blood Sugar, X-Ray, etc."
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="prescription" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="medicine">Medicine Name</Label>
                      <Input id="medicine" placeholder="Enter medicine" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" placeholder="500mg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select>
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="od">Once Daily</SelectItem>
                          <SelectItem value="bd">Twice Daily</SelectItem>
                          <SelectItem value="tds">Thrice Daily</SelectItem>
                          <SelectItem value="qid">Four Times Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="7 days" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timing">Timing</Label>
                      <Select>
                        <SelectTrigger id="timing">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before">Before Food</SelectItem>
                          <SelectItem value="after">After Food</SelectItem>
                          <SelectItem value="with">With Food</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Add Medicine</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="font-medium text-sm">Prescribed Medicines</h4>
                    <div className="text-sm text-muted-foreground">
                      No medicines added yet
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special instructions for the patient"
                      rows={2}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 justify-end mt-6 pt-6 border-t">
              <Button variant="outline">Save as Draft</Button>
              <Button>Complete Consultation</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Patient Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "2024-01-10", doctor: "Dr. Smith", diagnosis: "Viral Fever", prescription: "3 medicines" },
              { date: "2023-12-05", doctor: "Dr. Johnson", diagnosis: "Common Cold", prescription: "2 medicines" },
              { date: "2023-11-20", doctor: "Dr. Smith", diagnosis: "Routine Checkup", prescription: "No prescription" },
            ].map((visit, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{visit.diagnosis}</p>
                  <p className="text-xs text-muted-foreground">
                    {visit.doctor} • {visit.prescription}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{visit.date}</p>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
