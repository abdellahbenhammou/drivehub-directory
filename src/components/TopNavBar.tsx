import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, School, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const TopNavBar = () => {
  const location = useLocation();
  const [isSchoolOwner, setIsSchoolOwner] = useState(false);

  useEffect(() => {
    const checkSchoolOwner = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: schools } = await supabase
          .from("schools")
          .select("id")
          .eq("owner_email", session.user.email)
          .single();
        
        setIsSchoolOwner(!!schools);
      }
    };

    checkSchoolOwner();
  }, []);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200",
                location.pathname === "/"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            {isSchoolOwner && (
              <Link
                to="/schoolAdmin"
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200",
                  location.pathname === "/schoolAdmin"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <School className="w-4 h-4 mr-2" />
                School Admin
              </Link>
            )}
          </div>
          <div className="flex items-center">
            <Link to="/auth">
              <Button variant="outline" size="sm" className="ml-4">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};