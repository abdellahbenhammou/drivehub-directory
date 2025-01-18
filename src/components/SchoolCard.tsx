import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SchoolCardProps {
  name: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  image: string;
}

export const SchoolCard = ({ name, rating, reviews, price, location, image }: SchoolCardProps) => {
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
          <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
            ${price}/hr
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-current w-4 h-4" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground">{location}</p>
      </div>
    </Card>
  );
};