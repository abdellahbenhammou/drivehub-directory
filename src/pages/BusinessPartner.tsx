import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export const BusinessPartner = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Join Our Network of Professional Driving Schools</h1>
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
            <Button className="w-full text-lg py-6" size="lg">
              Register Now!
            </Button>
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground">Already registered?</span>
              <Button variant="link">Sign in</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPartner;