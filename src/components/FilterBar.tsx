import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Star } from "lucide-react";

export const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="outline" className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Location
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <DollarSign className="w-4 h-4" />
        Price Range
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Star className="w-4 h-4" />
        Rating
      </Button>
    </div>
  );
};