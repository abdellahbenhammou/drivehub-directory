import { useEffect, useState } from "react";
import { SchoolCard } from "@/components/SchoolCard";
import { Tables } from "@/integrations/supabase/types";
import { useSavedSchools } from "@/hooks/useSavedSchools";
import { supabase } from "@/integrations/supabase/client";

type School = Tables<"schools">;

const SavedSchools = () => {
  const { savedSchools } = useSavedSchools();
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const { data, error } = await supabase
          .from("schools")
          .select("*")
          .in("id", savedSchools);

        if (error) throw error;

        setSchools(data as School[]);
      } catch (error) {
        console.error("Error loading saved schools:", error);
      }
    };

    loadSchools();
  }, [savedSchools]);

  if (!schools.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Saved Schools</h1>
        <p>You haven't saved any schools yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Saved Schools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {schools.map((school) => (
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
            isActive={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedSchools;
