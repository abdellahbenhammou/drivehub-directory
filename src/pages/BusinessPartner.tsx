import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { RegistrationForm } from "@/components/business-partner/RegistrationForm";

export const BusinessPartner = () => {
  const [showRegistration, setShowRegistration] = useState(false);

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
            <Button
              className="w-full text-lg py-6"
              size="lg"
              onClick={() => setShowRegistration(true)}
            >
              Register Now!
            </Button>
          </div>
        </div>
      </div>

      <RegistrationForm
        open={showRegistration}
        onOpenChange={setShowRegistration}
      />
    </div>
  );
};

export default BusinessPartner;