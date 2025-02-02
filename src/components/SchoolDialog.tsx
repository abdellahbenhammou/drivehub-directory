import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SchoolHeader } from "./school-dialog/SchoolHeader";
import { SchoolServices } from "./school-dialog/SchoolServices";
import { SchoolContact } from "./school-dialog/SchoolContact";
import { InstructorsList } from "./school-dialog/InstructorsList";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type School = Tables<"schools">;

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
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .eq("id", schoolId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!schoolId,
  });

  const { data: instructors } = useQuery({
    queryKey: ["instructors", schoolId],
    queryFn: async () => {
      if (!schoolId) return [];
      const { data, error } = await supabase
        .from("instructors")
        .select("*")
        .eq("school_id", schoolId);

      if (error) throw error;
      return data;
    },
    enabled: !!schoolId,
  });

  if (!school) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <SchoolHeader 
          name={school.name}
          rating={school.rating}
          reviews={school.reviews}
          schoolId={school.id}
        />
        <SchoolServices 
          theoryClasses={school.theory_classes}
          theoryPrice={school.theory_price}
          drivingClasses={school.driving_classes}
          drivingPrice={school.driving_price}
          safetyCourses={school.safety_courses}
          safetyPrice={school.safety_price}
        />
        <SchoolContact 
          street={school.street || ''}
          city={school.city || ''}
          zipCode={school.zip_code || ''}
          phone={school.phone}
          whatsapp={school.whatsapp}
        />
        {instructors && <InstructorsList instructors={instructors} />}
      </DialogContent>
    </Dialog>
  );
};