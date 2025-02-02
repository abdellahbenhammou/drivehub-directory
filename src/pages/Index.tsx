import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { SchoolCard } from "@/components/SchoolCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Tables } from "@/integrations/supabase/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

type School = Tables<"schools">;

const Index = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const fetchSchools = async () => {
    let query = supabase.from("schools").select("*");

    if (selectedLocation) {
      const [city, district] = selectedLocation.split(" - ");
      if (district) {
        query = query.like('location', `%${district}%`);
      } else {
        query = query.like('location', `%${city}%`);
      }
    }

    if (maxPrice < 5000) {
      query = query.lte('price_per_hour', maxPrice);
    }

    if (selectedRatings.length > 0) {
      query = query.in('rating', selectedRatings);
    }

    if (selectedLanguage) {
      query = query.eq('language', selectedLanguage);
    }

    const { data, error } = await query;
    
    if (error) {
      throw error;
    }

    return data as School[];
  };

  const { data: schools = [], isLoading } = useQuery({
    queryKey: ["schools", selectedLocation, maxPrice, selectedRatings, selectedLanguage],
    queryFn: fetchSchools,
  });

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-end gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/auth")}
            className="gap-2"
          >
            <LogIn className="w-4 h-4" />
            Log in
          </Button>
          <Button
            onClick={() => {
              navigate("/auth");
              // We'll handle this in the Auth component
            }}
            className="gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Register now
          </Button>
        </div>

        <SearchBar />
        
        <Separator className="my-8" />

        <main className="relative z-10 bg-white/80 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <FilterBar 
              onLocationChange={setSelectedLocation}
              onPriceChange={setMaxPrice}
              onRatingChange={setSelectedRatings}
              onLanguageChange={setSelectedLanguage}
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-t-lg" />
                  <div className="p-6 space-y-4 border rounded-b-lg border-t-0">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;