import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

interface BusinessPartnerProfile {
  id: string;
  user_id: string;
  school_id: string;
  is_verified: boolean;
}

interface Props {
  profile: BusinessPartnerProfile;
}

export function BusinessPartnerDashboard({ profile }: Props) {
  const { data: school } = useQuery({
    queryKey: ["school", profile.school_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .eq("id", profile.school_id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!profile.school_id,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Business Partner Dashboard</h1>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {profile.is_verified ? (
            <div className="space-y-6">
              {school ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{school.name}</h2>
                  <p className="text-gray-600">
                    School management features coming soon...
                  </p>
                </div>
              ) : (
                <p>Loading school information...</p>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">
                Your account is pending verification. Please wait while we verify
                your business partner status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}