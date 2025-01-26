import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNavBar } from "@/components/TopNavBar";
import Index from "./pages/Index";
import SavedSchools from "./pages/SavedSchools";
import BusinessPartner from "./pages/BusinessPartner";
import Admin from "./pages/Admin";
import DrivingSchoolOwner from "./pages/DrivingSchoolOwner";
import IndependentInstructor from "./pages/IndependentInstructor";
import SchoolDetails from "./pages/SchoolDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <TopNavBar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/saved-schools" element={<SavedSchools />} />
              <Route path="/business-partner" element={<BusinessPartner />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/driving-school-owner" element={<DrivingSchoolOwner />} />
              <Route path="/independent-instructor" element={<IndependentInstructor />} />
              <Route path="/school/:id" element={<SchoolDetails />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;