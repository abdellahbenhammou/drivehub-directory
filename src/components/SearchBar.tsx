import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <Input
        type="text"
        placeholder="Search driving schools..."
        className="pl-12 pr-4 py-6 w-full text-lg bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
};