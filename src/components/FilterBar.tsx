import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Star, Languages, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

// Major cities with their districts
const MOROCCAN_CITIES = {
  "Casablanca": ["Anfa", "Sidi Belyout", "Maarif", "Ain Sebaa", "Hay Mohammadi"],
  "Rabat": ["Agdal", "Hassan", "Yacoub El Mansour", "Souissi"],
  "Marrakech": ["Medina", "Gueliz", "Hivernage", "Palmeraie"],
  "Fes": ["Fes El Bali", "Fes Jdid", "Saiss"],
  "Tangier": ["Medina", "Malabata", "Marchane"],
  "Agadir": [],
  "Meknes": [],
  "Oujda": [],
  "Kenitra": [],
  "Tetouan": [],
  "Safi": [],
  "Mohammedia": [],
  "El Jadida": [],
  "Beni Mellal": [],
  "Nador": [],
};

interface FilterBarProps {
  onLocationChange: (location: string) => void;
}

export const FilterBar = ({ onLocationChange }: FilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    onLocationChange(location);
  };

  const filteredCities = Object.entries(MOROCCAN_CITIES).filter(([city]) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between w-full">
      <div className="flex flex-wrap gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {selectedLocation || "Location"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-[280px] bg-white/95 backdrop-blur-sm border-2"
          >
            <div className="p-2 border-b">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <ScrollArea className="h-[300px] overflow-y-auto">
              {filteredCities.map(([city, districts]) => (
                <div key={city}>
                  <DropdownMenuItem
                    className="text-gray-800 font-medium hover:bg-primary hover:text-white cursor-pointer"
                    onClick={() => handleLocationSelect(city)}
                  >
                    {city}
                  </DropdownMenuItem>
                  {districts.length > 0 && districts.map(district => (
                    <DropdownMenuItem
                      key={district}
                      className="text-gray-600 pl-6 hover:bg-primary hover:text-white cursor-pointer"
                      onClick={() => handleLocationSelect(`${city} - ${district}`)}
                    >
                      {district}
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
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