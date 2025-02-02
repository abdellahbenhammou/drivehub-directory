import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

type SchoolRequest = Tables<"school_ownership_requests"> & {
  schools: Tables<"schools">
};

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin dashboard",
          variant: "destructive",
        });
        return;
      }

      // Check if the user is an admin
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", session.user.email)
        .single();

      if (!adminData) {
        navigate("/");
        toast({
          title: "Access denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        return;
      }

      setAdminEmail(session.user.email);
    };

    checkAuth();
  }, [navigate, toast]);

  // Fetch pending requests
  const { data: requests, isLoading: isLoadingRequests } = useQuery({
    queryKey: ["pending-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("school_ownership_requests")
        .select(`
          *,
          schools (*)
        `)
        .eq("status", "pending");

      if (error) throw error;
      return data as SchoolRequest[];
    },
  });

  // Fetch total schools count
  const { data: schoolsCount, isLoading: isLoadingCount } = useQuery({
    queryKey: ["schools-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("schools")
        .select("*", { count: 'exact', head: true });

      if (error) throw error;
      return count;
    },
  });

  if (isLoadingRequests || isLoadingCount) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {adminEmail && (
        <Card className="p-6 mb-6 bg-primary/5">
          <h2 className="text-xl font-semibold mb-2">Welcome, Admin!</h2>
          <p className="text-muted-foreground">Logged in as: {adminEmail}</p>
        </Card>
      )}

      <div className="grid gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Platform Statistics</h3>
          <p className="text-3xl font-bold text-primary">
            {schoolsCount} Schools
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pending Ownership Requests</h3>
          {requests && requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="p-4 border-l-4 border-l-primary">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{request.schools.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Requested by: {request.user_email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(request.created_at!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No pending requests</p>
          )}
        </Card>
      </div>
    </div>
  );
}