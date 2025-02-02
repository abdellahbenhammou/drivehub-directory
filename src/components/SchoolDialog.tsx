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
  school: School;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SchoolDialog = ({ school, open, onOpenChange }: SchoolDialogProps) => {
  const { data: instructors } = useQuery({
    queryKey: ["instructors", school.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("instructors")
        .select("*")
        .eq("school_id", school.id);

      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <SchoolHeader school={school} />
        <SchoolServices school={school} />
        <SchoolContact school={school} />
        {instructors && <InstructorsList instructors={instructors} />}
      </DialogContent>
    </Dialog>
  );
};