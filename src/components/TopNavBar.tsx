import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export const TopNavBar = () => {
  const location = useLocation();

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
        </div>
      </div>
    </nav>
  );
};