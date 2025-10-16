import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Users, LogOut, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RADT() {
  const [activeTab, setActiveTab] = useState("registration");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Form states for patient registration
  const [patientForm, setPatientForm] = useState<{
    full_name: string;
    date_of_birth: string;
    gender: "male" | "female" | "other" | "";
    phone: string;
    email: string;
    address: string;
    blood_group: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
  }>({
    full_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    blood_group: "",
    emergency_contact_name: "",
    emergency_contact_phone: ""
  });

  // Fetch patients
  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    }
  });

  // Create patient mutation
  const createPatient = useMutation({
    mutationFn: async (patientData: typeof patientForm) => {
      // Generate patient ID
      const { count } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });
      
      const patientId = `PT${String((count || 0) + 1).padStart(5, '0')}`;
      
      const { data, error } = await supabase
        .from('patients')
        .insert([{ 
          ...patientData, 
          patient_id: patientId,
          gender: patientData.gender as "male" | "female" | "other"
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Patient registered successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setPatientForm({
        full_name: "",
        date_of_birth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        blood_group: "",
        emergency_contact_name: "",
        emergency_contact_phone: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientForm.full_name || !patientForm.phone || !patientForm.gender) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    createPatient.mutate(patientForm);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">RADT Module</h1>
        <p className="text-muted-foreground">
          Registration, Admission, Discharge & Transfer Management
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="registration" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Registration
          </TabsTrigger>
          <TabsTrigger value="patients" className="gap-2">
            <Users className="h-4 w-4" />
            Patients List
          </TabsTrigger>
          <TabsTrigger value="admission" className="gap-2">
            <Users className="h-4 w-4" />
            Admission
          </TabsTrigger>
          <TabsTrigger value="discharge" className="gap-2">
            <LogOut className="h-4 w-4" />
            Discharge
          </TabsTrigger>
        </TabsList>

        <TabsContent value="registration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Patient Registration</CardTitle>
              <CardDescription>Register a new patient in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterPatient} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input 
                      id="full_name" 
                      value={patientForm.full_name}
                      onChange={(e) => setPatientForm({...patientForm, full_name: e.target.value})}
                      placeholder="Enter full name" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={patientForm.phone}
                      onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                      placeholder="Enter phone number" 
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input 
                      id="date_of_birth" 
                      type="date" 
                      value={patientForm.date_of_birth}
                      onChange={(e) => setPatientForm({...patientForm, date_of_birth: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select 
                      value={patientForm.gender}
                      onValueChange={(value) => setPatientForm({...patientForm, gender: value as "male" | "female" | "other"})}
                      required
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blood_group">Blood Group</Label>
                    <Select 
                      value={patientForm.blood_group}
                      onValueChange={(value) => setPatientForm({...patientForm, blood_group: value})}
                    >
                      <SelectTrigger id="blood_group">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={patientForm.email}
                      onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
                      placeholder="Enter email" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={patientForm.address}
                      onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                      placeholder="Enter address" 
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                    <Input 
                      id="emergency_contact_name" 
                      value={patientForm.emergency_contact_name}
                      onChange={(e) => setPatientForm({...patientForm, emergency_contact_name: e.target.value})}
                      placeholder="Enter contact name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                    <Input 
                      id="emergency_contact_phone" 
                      type="tel" 
                      value={patientForm.emergency_contact_phone}
                      onChange={(e) => setPatientForm({...patientForm, emergency_contact_phone: e.target.value})}
                      placeholder="Enter contact phone" 
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setPatientForm({
                      full_name: "",
                      date_of_birth: "",
                      gender: "",
                      phone: "",
                      email: "",
                      address: "",
                      blood_group: "",
                      emergency_contact_name: "",
                      emergency_contact_phone: ""
                    })}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={createPatient.isPending}>
                    {createPatient.isPending ? "Registering..." : "Register Patient"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Patients</CardTitle>
              <CardDescription>View all registered patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients && patients.length > 0 ? (
                    patients.map((patient: any) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.patient_id}</TableCell>
                        <TableCell>{patient.full_name}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell className="capitalize">{patient.gender}</TableCell>
                        <TableCell>{patient.blood_group || "-"}</TableCell>
                        <TableCell>{new Date(patient.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No patients registered yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Admission</CardTitle>
              <CardDescription>Admit a registered patient for in-patient care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Admission module coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discharge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Discharge</CardTitle>
              <CardDescription>Process patient discharge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Discharge module coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
