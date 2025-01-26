import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const IndependentInstructor = () => {
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
          <h1 className="text-3xl font-bold mb-6">Information for Independent Instructors</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Benefits of Joining</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Build your personal brand</li>
                <li>Flexible scheduling</li>
                <li>Direct student connections</li>
                <li>Professional development opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Valid instructor license</li>
                <li>Professional experience</li>
                <li>Clean driving record</li>
                <li>Background check</li>
              </ul>
            </section>

            <div className="mt-8">
              <Link to="/business-partner">
                <Button size="lg" className="w-full md:w-auto">
                  Join as an Instructor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndependentInstructor;