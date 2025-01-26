import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SchoolHeader } from "./school-dialog/SchoolHeader";
import { SchoolContact } from "./school-dialog/SchoolContact";
import { SchoolServices } from "./school-dialog/SchoolServices";
import { InstructorsList } from "./school-dialog/InstructorsList";

interface SchoolDialogProps {
  schoolId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolDialog = ({ schoolId, isOpen, onClose }: SchoolDialogProps) => {
  const { data: schools } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const { data } = await supabase
        .from("schools")
        .select("*")
        .order('name');
      return data || [];
    },
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

  const currentSchool = schools?.find(s => s.id === schoolId);
  const currentIndex = schools?.findIndex(s => s.id === schoolId) ?? -1;

  const navigateSchool = (direction: 'next' | 'prev') => {
    if (!schools?.length) return;
    
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % schools.length
      : (currentIndex - 1 + schools.length) % schools.length;
    
    const newSchoolId = schools[newIndex].id;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('school', newSchoolId);
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  if (!currentSchool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogOverlay className="bg-black/80">
        <Button
          variant="outline"
          size="icon"
          className="fixed left-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
            navigateSchool('prev');
          }}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
            navigateSchool('next');
          }}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </DialogOverlay>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <SchoolHeader
          name={currentSchool.name}
          rating={currentSchool.rating}
          reviews={currentSchool.reviews}
          schoolId={currentSchool.id}
        />

        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="w-1/3">
              <img
                src={currentSchool.image_url}
                alt={currentSchool.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 space-y-4">
              <SchoolContact
                street={currentSchool.street || ""}
                city={currentSchool.city || ""}
                zipCode={currentSchool.zip_code || ""}
                phone={currentSchool.phone}
                whatsapp={currentSchool.whatsapp}
              />

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  {currentSchool.price_per_hour?.toLocaleString()} MAD
                </span>
              </div>
            </div>
          </div>

          <SchoolServices
            theoryClasses={currentSchool.theory_classes}
            theoryPrice={currentSchool.theory_price}
            drivingClasses={currentSchool.driving_classes}
            drivingPrice={currentSchool.driving_price}
            safetyCourses={currentSchool.safety_courses}
            safetyPrice={currentSchool.safety_price}
          />

          {instructors && <InstructorsList instructors={instructors} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};