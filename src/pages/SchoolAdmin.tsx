import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { AdminGreeting } from "@/components/admin/AdminGreeting";
import { SchoolInfo } from "@/components/admin/SchoolInfo";
import { SchoolSearch } from "@/components/admin/SchoolSearch";

export default function SchoolAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [school, setSchool] = useState<Tables<"schools"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        toast({
          title: "Authentication required",
          description: "Please log in to access the school admin page",
          variant: "destructive",
        });
        return;
      }

      setUserEmail(session.user.email);

      // Fetch school data for the logged-in owner
      const { data: schools, error } = await supabase
        .from("schools")
        .select("*")
        .eq("owner_email", session.user.email)
        .single();

      if (error) {
        console.error("Error fetching school:", error);
        toast({
          title: "Error",
          description: "Failed to load school data",
          variant: "destructive",
        });
        return;
      }

      setSchool(schools);
      setLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AdminGreeting email={userEmail} />
      
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">School Administration</h1>
        
        {school ? (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your School</h2>
              <SchoolInfo school={school} />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Other Schools</h2>
              <SchoolSearch />
            </div>
          </>
        ) : (
          <div>
            <p>You don't have any school associated with your account.</p>
            <SchoolSearch />
          </div>
        )}
      </div>
    </div>
  );
}