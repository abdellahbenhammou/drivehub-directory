import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PartnerRequestsTable } from "./PartnerRequestsTable";
import { PartnerProfilesTable } from "./PartnerProfilesTable";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/business-partner");
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="requests">Partner Requests</TabsTrigger>
              <TabsTrigger value="profiles">Partner Profiles</TabsTrigger>
            </TabsList>
            <TabsContent value="requests">
              <PartnerRequestsTable />
            </TabsContent>
            <TabsContent value="profiles">
              <PartnerProfilesTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}