import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { RegistrationForm } from "@/components/business-partner/RegistrationForm";
import { LoginForm } from "@/components/business-partner/LoginForm";
import { BusinessPartnerDashboard } from "@/components/business-partner/BusinessPartnerDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const BusinessPartner = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["businessPartnerProfile", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_partner_profiles")
        .select("*")
        .eq("user_id", session?.user?.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (session && profile) {
    return <BusinessPartnerDashboard profile={profile} />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">
              Join Our Network of Professional Driving Schools
            </h1>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span>Access to driving school profile</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span>Verification badge</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span>Personalize your profile</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            {session ? (
              <div className="text-center space-y-4">
                <p className="text-lg">
                  Please complete your registration to access the dashboard
                </p>
                <Button
                  className="w-full text-lg py-6"
                  size="lg"
                  onClick={() => setShowRegistration(true)}
                >
                  Complete Registration
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  className="w-full text-lg py-6"
                  size="lg"
                  onClick={() => setShowRegistration(true)}
                >
                  Register Now!
                </Button>
                <div className="text-center">
                  <span className="text-gray-600">Already registered? </span>
                  <Button
                    variant="link"
                    className="text-primary"
                    onClick={() => setShowLogin(true)}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RegistrationForm
        open={showRegistration}
        onOpenChange={setShowRegistration}
      />
      <LoginForm open={showLogin} onOpenChange={setShowLogin} />
    </div>
  );
};

export default BusinessPartner;