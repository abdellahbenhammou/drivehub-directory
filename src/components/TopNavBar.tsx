import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Users, GraduationCap } from "lucide-react";

export const TopNavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
                isActive("/")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
              )}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            
            <Link
              to="/driving-school-owner"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
                isActive("/driving-school-owner")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
              )}
            >
              <Users className="w-4 h-4 mr-2" />
              Driving School Owner
            </Link>
            
            <Link
              to="/independent-instructor"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
                isActive("/independent-instructor")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
              )}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Independent Instructor
            </Link>
          </div>
          
          <Link
            to="/business-partner"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors duration-200"
          >
            Registration
          </Link>
        </div>
      </div>
    </nav>
  );
};