import { Star, Circle, Calendar, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SchoolCardProps {
  name: string;
  rating: number;
  reviews: number;
  price: number;
  priceHidden?: boolean;
  location: string;
  image: string;
  isActive: boolean;
  nextAvailable?: string;
}

export const SchoolCard = ({ 
  name, 
  rating, 
  reviews, 
  price, 
  priceHidden = false,
  location, 
  image,
  isActive,
  nextAvailable
}: SchoolCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {priceHidden ? (
            <Button variant="outline" className="px-3 py-1 h-auto text-sm font-medium">
              Contact for Price
            </Button>
          ) : (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
              ${price}/hr
            </span>
          )}
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-current w-4 h-4" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {name}
          </h3>
          <Circle 
            className={`w-3 h-3 ${isActive ? 'fill-green-500 text-green-500' : 'fill-gray-300 text-gray-300'}`}
          />
        </div>
        <p className="text-muted-foreground mb-3">{location}</p>
        {nextAvailable && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <Car className="w-3 h-3 animate-[move-right_2s_ease-in-out_infinite]" />
            </div>
            <span>Next available: {nextAvailable}</span>
          </div>
        )}
      </div>
    </Card>
  );
};