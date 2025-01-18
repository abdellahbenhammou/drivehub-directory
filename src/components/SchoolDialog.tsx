import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Star, CheckCircle2, XCircle, Triangle, Circle, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SchoolDialogProps {
  schoolId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolDialog = ({ schoolId, isOpen, onClose }: SchoolDialogProps) => {
  const { data: school } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      if (!schoolId) return null;
      const { data } = await supabase
        .from("schools")
        .select("*")
        .eq("id", schoolId)
        .single();
      return data;
    },
    enabled: !!schoolId,
  });

  const { data: instructors } = useQuery({
    queryKey: ["instructors", schoolId],
    queryFn: async () => {
      if (!schoolId) return [];
      const { data } = await supabase
        .from("instructors")
        .select("*")
        .eq("school_id", schoolId);
      return data || [];
    },
    enabled: !!schoolId,
  });

  if (!school) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{school.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main School Info */}
          <div className="flex items-start gap-6">
            <div className="w-1/3">
              <img
                src={school.image_url}
                alt={school.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="fill-current w-5 h-5" />
                  <span className="text-lg font-medium">{school.rating}</span>
                </div>
                <span className="text-muted-foreground">({school.reviews} reviews)</span>
              </div>
              <p className="text-lg text-muted-foreground">{school.location}</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  ${school.price_per_hour}/hr
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="grid grid-cols-3 gap-4">
            {school.theory_classes && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Theory Classes</h3>
                <p className="text-muted-foreground">${school.theory_price}/course</p>
              </Card>
            )}
            {school.driving_classes && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Driving Classes</h3>
                <p className="text-muted-foreground">${school.driving_price}/hr</p>
              </Card>
            )}
            {school.safety_courses && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Safety Courses</h3>
                <p className="text-muted-foreground">${school.safety_price}/course</p>
              </Card>
            )}
          </div>

          {/* Instructors */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Instructors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {instructors?.map((instructor) => (
                <Card key={instructor.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={instructor.profile_image || "/placeholder.svg"}
                      alt={instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{instructor.name}</h4>
                        {instructor.is_verified ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {instructor.gender === "male" ? (
                          <Male className="w-4 h-4" />
                        ) : instructor.gender === "female" ? (
                          <Female className="w-4 h-4" />
                        ) : (
                          <Users className="w-4 h-4" />
                        )}
                        {instructor.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span>{instructor.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
