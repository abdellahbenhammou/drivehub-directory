import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { SchoolCard } from "@/components/SchoolCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Tables } from "@/integrations/supabase/types";
import { useState } from "react";

const backgroundImages = [
  "/driving-school-1.jpg",
  "/happy-driver.jpg",
  "/learning-drive.jpg",
  "/car-lesson.jpg"
];

type School = Tables<"schools">;

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const { data: schools = [], isLoading } = useQuery({
    queryKey: ["schools", { location: selectedLocation, price: maxPrice, ratings: selectedRatings, language: selectedLanguage }],
    queryFn: async () => {
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

      return (data || []) as School[];
    }
  });

  return (
    <div className="min-h-screen bg-secondary relative">
      <div className="fixed inset-0 -z-10">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${image})`,
              animation: `fadeInOut 16s infinite ${index * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative h-[40vh] bg-gradient-to-b from-primary/10 to-secondary/95 flex items-center justify-center px-6">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 drop-shadow-sm">
            Find Your Perfect Driving School
          </h1>
          <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto font-medium">
            Compare top-rated driving schools in your area and start your journey to becoming a confident driver.
          </p>
          <SearchBar />
        </div>
      </div>

      <Separator className="w-full my-8 opacity-50" />

      <main className="container mx-auto px-6 py-12 relative z-10 bg-white/80 rounded-lg shadow-lg">
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
  );
};

export default Index;