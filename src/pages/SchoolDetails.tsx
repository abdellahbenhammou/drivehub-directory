import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Phone } from "lucide-react";
import { SchoolServices } from "@/components/school-dialog/SchoolServices";
import { InstructorsList } from "@/components/school-dialog/InstructorsList";

const SchoolDetails = () => {
  const { id } = useParams();

  const { data: school } = useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("schools")
        .select("*")
        .eq("id", id)
        .single();
      return data;
    },
  });

  const { data: instructors } = useQuery({
    queryKey: ["instructors", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("instructors")
        .select("*")
        .eq("school_id", id);
      return data || [];
    },
  });

  if (!school) return null;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Schools
          </Button>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-8 mb-8">
            <div className="w-1/3">
              <img
                src={school.image_url}
                alt={school.name}
                className="w-full aspect-video object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{school.name}</h1>
              <div className="space-y-4">
                <p className="text-muted-foreground">{school.location}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                    {school.price_per_hour?.toLocaleString()} MAD/hr
                  </span>
                </div>
                {school.phone && (
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => window.location.href = `tel:${school.phone}`}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call School
                  </Button>
                )}
              </div>
            </div>
          </div>

          <SchoolServices
            theoryClasses={school.theory_classes}
            theoryPrice={school.theory_price}
            drivingClasses={school.driving_classes}
            drivingPrice={school.driving_price}
            safetyCourses={school.safety_courses}
            safetyPrice={school.safety_price}
          />

          {instructors && <InstructorsList instructors={instructors} />}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;