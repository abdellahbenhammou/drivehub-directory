import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSavedSchools } from "@/hooks/useSavedSchools";

interface SchoolHeaderProps {
  name: string;
  rating: number;
  reviews: number;
  schoolId: string;
}

export const SchoolHeader = ({ name, rating, reviews, schoolId }: SchoolHeaderProps) => {
  const { toast } = useToast();
  const { toggleSavedSchool, isSchoolSaved } = useSavedSchools();

  const handleSaveToggle = () => {
    if (!schoolId) return;
    toggleSavedSchool(schoolId);
    toast({
      title: isSchoolSaved(schoolId) ? "School removed" : "School saved",
      description: isSchoolSaved(schoolId) 
        ? "This school has been removed from your saved schools."
        : "This school has been added to your saved schools.",
    });
  };

  return (
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-current w-5 h-5" />
            <span className="text-lg font-medium">{rating}</span>
          </div>
          <span className="text-muted-foreground">({reviews} reviews)</span>
        </div>
        <Button
          variant={isSchoolSaved(schoolId) ? "secondary" : "outline"}
          onClick={handleSaveToggle}
        >
          {isSchoolSaved(schoolId) ? "Saved" : "Save School"}
        </Button>
      </div>
    </DialogHeader>
  );
};