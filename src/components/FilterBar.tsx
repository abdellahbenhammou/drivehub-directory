import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Star, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between w-full">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Language
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-[160px] bg-white/95 backdrop-blur-sm border-2"
          >
            <DropdownMenuItem className="text-gray-800 font-medium hover:bg-primary hover:text-white">
              Arabic
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-800 font-medium hover:bg-primary hover:text-white">
              French
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-800 font-medium hover:bg-primary hover:text-white">
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link to="/saved-schools">
        <Button 
          variant="default"
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
        >
          Saved Schools
        </Button>
      </Link>
    </div>
  );
};