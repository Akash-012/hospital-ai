import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, UserCog } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<AppRole | "">("");

  // Fetch all profiles with their roles
  const { data: usersWithRoles } = useQuery({
    queryKey: ['users-with-roles'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get roles for each user
      const usersWithRolesData = await Promise.all(
        profiles.map(async (profile) => {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id);
          
          return {
            ...profile,
            roles: roles?.map(r => r.role) || []
          };
        })
      );

      return usersWithRolesData;
    }
  });

  // Assign role mutation
  const assignRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Role assigned successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
      setSelectedUserId("");
      setSelectedRole("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Remove role mutation
  const removeRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Role removed successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleAssignRole = () => {
    if (!selectedUserId || !selectedRole) {
      toast({
        title: "Error",
        description: "Please select both user and role",
        variant: "destructive",
      });
      return;
    }
    assignRole.mutate({ userId: selectedUserId, role: selectedRole });
  };

  const roleColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    admin: "destructive",
    doctor: "default",
    nurse: "secondary",
    receptionist: "outline",
    pharmacist: "default",
    lab_technician: "secondary",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage user roles and system configuration
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Assign Role
            </CardTitle>
            <CardDescription>Assign roles to users to control access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select User</label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {usersWithRoles?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Role</label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as AppRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="lab_technician">Lab Technician</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleAssignRole} 
              className="w-full"
              disabled={assignRole.isPending}
            >
              {assignRole.isPending ? "Assigning..." : "Assign Role"}
            </Button>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Role Descriptions
              </h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p><strong>Admin:</strong> Full system access</p>
                <p><strong>Doctor:</strong> View patients, consultations, prescriptions</p>
                <p><strong>Nurse:</strong> View patients, vitals, assist doctors</p>
                <p><strong>Receptionist:</strong> Register patients, schedule appointments</p>
                <p><strong>Pharmacist:</strong> Manage pharmacy sales</p>
                <p><strong>Lab Technician:</strong> Manage lab tests & results</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Roles Management</CardTitle>
            <CardDescription>View and manage roles assigned to users</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersWithRoles && usersWithRoles.length > 0 ? (
                  usersWithRoles.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.length > 0 ? (
                            user.roles.map((role) => (
                              <Badge 
                                key={role} 
                                variant={roleColors[role] || "default"}
                                className="cursor-pointer hover:opacity-80"
                                onClick={() => {
                                  if (window.confirm(`Remove ${role} role from ${user.full_name}?`)) {
                                    removeRole.mutate({ userId: user.id, role });
                                  }
                                }}
                              >
                                {role} ×
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No roles assigned</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedUserId(user.id)}
                        >
                          Assign Role
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>⚠️ Important Security Notice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Role-Based Access Control is now enabled.</strong> Users must be assigned appropriate roles to access patient data and other sensitive information.
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Only medical staff (doctors, nurses, receptionists) can view patient records</li>
            <li>Only receptionists and admins can register new patients</li>
            <li>Only doctors can create prescriptions and consultations</li>
            <li>Only pharmacists can process pharmacy sales</li>
            <li>Only lab technicians can manage lab tests and results</li>
          </ul>
          <p className="text-muted-foreground">
            If users cannot access certain features, ensure they have been assigned the appropriate role above.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
