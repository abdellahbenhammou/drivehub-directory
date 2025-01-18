import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, XCircle, UserRound, Users, MapPin, Phone, MessageSquare } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SchoolDialogProps {
  schoolId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolDialog = ({ schoolId, isOpen, onClose }: SchoolDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const { data: isSaved } = useQuery({
    queryKey: ["saved_school", schoolId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !schoolId) return false;
      
      const { data } = await supabase
        .from("saved_schools")
        .select("id")
        .eq("school_id", schoolId)
        .eq("user_id", user.id)
        .single();
      
      return !!data;
    },
    enabled: !!schoolId,
  });

  const saveSchoolMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !schoolId) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("saved_schools")
        .insert({ user_id: user.id, school_id: schoolId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved_school", schoolId] });
      toast({
        title: "School saved",
        description: "This school has been added to your saved schools.",
      });
    },
  });

  const unsaveSchoolMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !schoolId) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("saved_schools")
        .delete()
        .eq("school_id", schoolId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved_school", schoolId] });
      toast({
        title: "School removed",
        description: "This school has been removed from your saved schools.",
      });
    },
  });

  const handleSaveToggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save schools.",
        variant: "destructive",
      });
      return;
    }

    if (isSaved) {
      unsaveSchoolMutation.mutate();
    } else {
      saveSchoolMutation.mutate();
    }
  };

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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="fill-current w-5 h-5" />
                    <span className="text-lg font-medium">{school.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({school.reviews} reviews)</span>
                </div>
                <Button
                  variant={isSaved ? "secondary" : "outline"}
                  onClick={handleSaveToggle}
                  disabled={saveSchoolMutation.isPending || unsaveSchoolMutation.isPending}
                >
                  {isSaved ? "Saved" : "Save School"}
                </Button>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{school.street}, {school.city} {school.zip_code}</span>
                </div>
                {school.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${school.phone}`} className="hover:underline">{school.phone}</a>
                  </div>
                )}
                {school.whatsapp && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <a 
                      href={`https://wa.me/${school.whatsapp.replace(/\D/g, '')}`}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};