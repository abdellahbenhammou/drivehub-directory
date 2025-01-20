import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Star, Languages, Search, XCircle } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";

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
  onLocationChange: (location: string | null) => void;
  onPriceChange: (price: number) => void;
  onRatingChange: (ratings: number[]) => void;
  onLanguageChange: (language: string | null) => void;
}

export const FilterBar = ({ 
  onLocationChange, 
  onPriceChange, 
  onRatingChange,
  onLanguageChange 
}: FilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    onLocationChange(location);
  };

  const handleLocationClear = () => {
    setSelectedLocation("");
    onLocationChange(null);
  };

  const handlePriceChange = (value: number[]) => {
    const price = value[0];
    setPriceRange(price);
    onPriceChange(price);
  };

  const handleRatingToggle = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(newRatings);
    onRatingChange(newRatings);
  };

  const handleLanguageSelect = (language: string) => {
    const newLanguage = selectedLanguage === language ? null : language;
    setSelectedLanguage(newLanguage);
    onLanguageChange(newLanguage);
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
              {selectedLocation && (
                <XCircle 
                  className="w-4 h-4 ml-2 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationClear();
                  }}
                />
              )}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Price Range: {priceRange} MAD
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-[280px] p-4 bg-white/95 backdrop-blur-sm border-2"
          >
            <Slider
              defaultValue={[5000]}
              max={5000}
              step={100}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
            <div className="text-sm text-center text-muted-foreground">
              Max: {priceRange} MAD
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Rating
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-[200px] p-2 bg-white/95 backdrop-blur-sm border-2"
          >
            <div className="flex flex-wrap gap-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="sm"
                  className={`p-1 ${selectedRatings.includes(rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => handleRatingToggle(rating)}
                >
                  <Star className={`w-5 h-5 ${selectedRatings.includes(rating) ? 'fill-yellow-500' : 'fill-gray-300'}`} />
                </Button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              {selectedLanguage || "Language"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-[160px] bg-white/95 backdrop-blur-sm border-2"
          >
            {["Arabic", "French", "English"].map((language) => (
              <DropdownMenuItem 
                key={language}
                className={`text-gray-800 font-medium hover:bg-primary hover:text-white cursor-pointer
                  ${selectedLanguage === language ? 'bg-primary/10' : ''}`}
                onClick={() => handleLanguageSelect(language)}
              >
                {language}
              </DropdownMenuItem>
            ))}
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
