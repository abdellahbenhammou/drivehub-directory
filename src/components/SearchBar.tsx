import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SearchBar = () => {
  const [searchType, setSearchType] = useState<'license' | 'practice'>('license');

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="flex gap-2 justify-center">
        <Button
          variant={searchType === 'license' ? 'default' : 'outline'}
          onClick={() => setSearchType('license')}
          className="flex-1"
        >
          Get License
        </Button>
        <Button
          variant={searchType === 'practice' ? 'default' : 'outline'}
          onClick={() => setSearchType('practice')}
          className="flex-1"
        >
          Practice Lessons
        </Button>
      </div>
      
      <div className="relative">
        <Input
          type="text"
          placeholder={`Search ${searchType === 'license' ? 'license courses' : 'practice lessons'}...`}
          className="pl-12 pr-4 py-6 w-full text-lg bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};