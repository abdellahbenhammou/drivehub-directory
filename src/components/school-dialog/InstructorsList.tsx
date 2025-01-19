import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, UserRound, Users, Star } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  profile_image?: string;
  gender?: string;
  is_verified?: boolean;
  rating?: number;
}

interface InstructorsListProps {
  instructors: Instructor[];
}

export const InstructorsList = ({ instructors }: InstructorsListProps) => {
  if (!instructors.length) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Our Instructors</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {instructors.map((instructor) => (
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
                    <UserRound className="w-4 h-4" />
                  ) : instructor.gender === "female" ? (
                    <UserRound className="w-4 h-4" />
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
  );
};