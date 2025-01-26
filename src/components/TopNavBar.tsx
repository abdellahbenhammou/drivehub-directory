import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Users, GraduationCap, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  Registration
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/driving-school-owner" className="w-full">
                    Driving School Owner
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/independent-instructor" className="w-full">
                    Independent Instructor
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.location.href = "/business-partner"}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};