import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SchoolInfo } from "./SchoolInfo";
import { Tables } from "@/integrations/supabase/types";

export const SchoolSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: schools, isLoading } = useQuery({
    queryKey: ['schools', searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];
      
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`)
        .limit(5);

      if (error) throw error;
      return data as Tables<"schools">[];
    },
  });

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search schools by name or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-4 py-6 w-full text-lg bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {isLoading && searchTerm && (
        <p className="text-muted-foreground">Searching...</p>
      )}

      <div className="space-y-4">
        {schools?.map((school) => (
          <SchoolInfo key={school.id} school={school} />
        ))}
        {searchTerm && schools?.length === 0 && !isLoading && (
          <p className="text-muted-foreground">No schools found</p>
        )}
      </div>
    </div>
  );
};