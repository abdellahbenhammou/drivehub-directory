import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { SchoolCard } from "@/components/SchoolCard";

const MOCK_SCHOOLS = [
  {
    id: 1,
    name: "Premier Driving Academy",
    rating: 4.8,
    reviews: 128,
    price: 65,
    priceHidden: false,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80",
    isActive: true,
  },
  {
    id: 2,
    name: "Safe Roads Institute",
    rating: 4.6,
    reviews: 95,
    price: 55,
    priceHidden: true,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80",
    isActive: false,
  },
  {
    id: 3,
    name: "Expert Drivers School",
    rating: 4.9,
    reviews: 156,
    price: 70,
    priceHidden: false,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
    isActive: true,
  },
  {
    id: 4,
    name: "City Driving Center",
    rating: 4.7,
    reviews: 112,
    price: 60,
    priceHidden: true,
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
    isActive: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="relative h-[40vh] bg-gradient-to-b from-primary/10 to-secondary flex items-center justify-center px-6">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find Your Perfect Driving School
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare top-rated driving schools in your area and start your journey to becoming a confident driver.
          </p>
          <SearchBar />
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <FilterBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_SCHOOLS.map((school) => (
            <SchoolCard key={school.id} {...school} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;