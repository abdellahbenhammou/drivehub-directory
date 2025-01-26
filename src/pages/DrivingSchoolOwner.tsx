import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DrivingSchoolOwner = () => {
  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Information for Driving School Owners</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Why Partner With Us?</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Increase your school's visibility</li>
                <li>Manage your bookings efficiently</li>
                <li>Access to a wider student base</li>
                <li>Professional profile management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Register your driving school</li>
                <li>Complete verification process</li>
                <li>Set up your profile and services</li>
                <li>Start receiving booking requests</li>
              </ol>
            </section>

            <div className="mt-8">
              <Link to="/business-partner">
                <Button size="lg" className="w-full md:w-auto">
                  Register Your School Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSchoolOwner;