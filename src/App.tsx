import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import RADT from "./pages/RADT";
import Appointments from "./pages/Appointments";
import OPDConsultation from "./pages/OPDConsultation";
import Billing from "./pages/Billing";
import Pharmacy from "./pages/Pharmacy";
import Laboratory from "./pages/Laboratory";
import Visitors from "./pages/Visitors";
import OperationTheatre from "./pages/OperationTheatre";
import NursingDesk from "./pages/NursingDesk";
import Roster from "./pages/Roster";
import DietKitchen from "./pages/DietKitchen";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <div className="flex-1 flex flex-col">
                        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
                          <SidebarTrigger />
                          <div className="flex-1" />
                        </header>
                        <main className="flex-1 p-6 overflow-auto">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/radt" element={<RADT />} />
                            <Route path="/appointments" element={<Appointments />} />
                            <Route path="/opd" element={<OPDConsultation />} />
                            <Route path="/billing" element={<Billing />} />
                            <Route path="/pharmacy" element={<Pharmacy />} />
                            <Route path="/lab" element={<Laboratory />} />
                            <Route path="/visitors" element={<Visitors />} />
                            <Route path="/ot" element={<OperationTheatre />} />
                            <Route path="/nursing" element={<NursingDesk />} />
                            <Route path="/roster" element={<Roster />} />
                            <Route path="/diet" element={<DietKitchen />} />
                            <Route path="/inventory" element={<Inventory />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
