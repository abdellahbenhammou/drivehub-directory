import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

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
      {userEmail && (
        <Card className="p-6 mb-6 bg-primary/5">
          <h2 className="text-xl font-semibold mb-2">Welcome, School Admin!</h2>
          <p className="text-muted-foreground">Logged in as: {userEmail}</p>
        </Card>
      )}
      
      <h1 className="text-2xl font-bold mb-6">School Administration</h1>
      
      {school ? (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{school.name}</h2>
              <p className="text-muted-foreground">{school.location}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Rating</p>
                <p>{school.rating} ⭐ ({school.reviews} reviews)</p>
              </div>
              <div>
                <p className="font-medium">Price per Hour</p>
                <p>{school.price_per_hour ? `$${school.price_per_hour}` : 'Not set'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Services</h3>
              <div className="grid grid-cols-2 gap-2">
                {school.theory_classes && (
                  <div>
                    <p>Theory Classes</p>
                    <p className="text-sm text-muted-foreground">
                      ${school.theory_price}
                    </p>
                  </div>
                )}
                {school.driving_classes && (
                  <div>
                    <p>Driving Classes</p>
                    <p className="text-sm text-muted-foreground">
                      ${school.driving_price}
                    </p>
                  </div>
                )}
                {school.safety_courses && (
                  <div>
                    <p>Safety Courses</p>
                    <p className="text-sm text-muted-foreground">
                      ${school.safety_price}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Contact Information</h3>
              <div className="grid grid-cols-2 gap-2">
                {school.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{school.phone}</p>
                  </div>
                )}
                {school.whatsapp && (
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p>{school.whatsapp}</p>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={() => navigate(`/school/${school.id}`)}
              className="w-full"
            >
              View Public Profile
            </Button>
          </div>
        </Card>
      ) : (
        <div>
          <p>You don't have any school associated with your account.</p>
        </div>
      )}
    </div>
  );
}