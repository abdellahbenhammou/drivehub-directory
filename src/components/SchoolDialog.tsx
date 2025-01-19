import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, XCircle, UserRound, Users, MapPin, Phone, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSavedSchools } from "@/hooks/useSavedSchools";

interface SchoolDialogProps {
  schoolId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolDialog = ({ schoolId, isOpen, onClose }: SchoolDialogProps) => {
  const { toast } = useToast();
  const { toggleSavedSchool, isSchoolSaved } = useSavedSchools();

  const { data: schools } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const { data } = await supabase
        .from("schools")
        .select("*");
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
    if (!schools) return;
    
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % schools.length
      : (currentIndex - 1 + schools.length) % schools.length;
    
    const newSchoolId = schools[newIndex].id;
    window.history.pushState({}, '', `?school=${newSchoolId}`);
    window.dispatchEvent(new Event('popstate'));
  };

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

  if (!currentSchool) return null;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} MAD`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogOverlay className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white"
          onClick={() => navigateSchool('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white"
          onClick={() => navigateSchool('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </DialogOverlay>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{currentSchool.name}</DialogTitle>
        </DialogHeader>

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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="fill-current w-5 h-5" />
                    <span className="text-lg font-medium">{currentSchool.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({currentSchool.reviews} reviews)</span>
                </div>
                <Button
                  variant={isSchoolSaved(currentSchool.id) ? "secondary" : "outline"}
                  onClick={handleSaveToggle}
                >
                  {isSchoolSaved(currentSchool.id) ? "Saved" : "Save School"}
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{currentSchool.street}, {currentSchool.city} {currentSchool.zip_code}</span>
                </div>
                {currentSchool.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${currentSchool.phone}`} className="hover:underline">{currentSchool.phone}</a>
                  </div>
                )}
                {currentSchool.whatsapp && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <a 
                      href={`https://wa.me/${currentSchool.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      WhatsApp
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  {formatPrice(currentSchool.price_per_hour)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {currentSchool.theory_classes && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Theory Classes</h3>
                <p className="text-muted-foreground">{formatPrice(currentSchool.theory_price)}/course</p>
              </Card>
            )}
            {currentSchool.driving_classes && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Driving Classes</h3>
                <p className="text-muted-foreground">{formatPrice(currentSchool.driving_price)}/hr</p>
              </Card>
            )}
            {currentSchool.safety_courses && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Safety Courses</h3>
                <p className="text-muted-foreground">{formatPrice(currentSchool.safety_price)}/course</p>
              </Card>
            )}
          </div>

          {instructors && instructors.length > 0 && (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
