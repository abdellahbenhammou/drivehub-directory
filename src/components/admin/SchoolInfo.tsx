import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SchoolInfoProps {
  school: Tables<"schools">;
}

export const SchoolInfo = ({ school }: SchoolInfoProps) => {
  const navigate = useNavigate();

  return (
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
  );
};