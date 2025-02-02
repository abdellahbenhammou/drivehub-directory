import { SchoolCard } from "@/components/SchoolCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSavedSchools } from "@/hooks/useSavedSchools";

const SavedSchools = () => {
  const { savedSchools } = useSavedSchools();
  
  const { data: schools } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const { data } = await supabase
        .from("schools")
        .select("*");
      return data || [];
    },
  });

  const savedSchoolsData = schools?.filter(school => 
    savedSchools.includes(school.id)
  ) || [];

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Schools
            </Button>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Your Saved Schools</h1>
        
        {savedSchoolsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              You haven't saved any schools yet.
            </p>
            <Link to="/">
              <Button>Browse Schools</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedSchoolsData.map((school) => (
              <SchoolCard
                key={school.id}
                id={school.id}
                name={school.name}
                rating={school.rating}
                reviews={school.reviews}
                price={school.price_per_hour || 0}
                priceHidden={!school.price_per_hour}
                location={school.location}
                image={school.image_url}
                isActive={school.is_active || false}
                nextAvailable={school.next_available}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSchools;