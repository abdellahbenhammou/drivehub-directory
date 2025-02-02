import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, User, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Tables } from "@/integrations/supabase/types";

type Customer = Tables<"customers">;

export const TopNavBar = () => {
  const location = useLocation();
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {user.first_name} {user.last_name}
                </span>
                <User className="w-5 h-5 text-gray-600" />
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};