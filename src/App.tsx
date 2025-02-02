import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TopNavBar } from "@/components/TopNavBar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import SavedSchools from "./pages/SavedSchools";
import SchoolDetails from "./pages/SchoolDetails";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show nothing while checking auth state
  if (isAuthenticated === null) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <TopNavBar />
            <div className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={isAuthenticated ? <Index /> : <Navigate to="/auth" />}
                />
                <Route
                  path="/saved-schools"
                  element={isAuthenticated ? <SavedSchools /> : <Navigate to="/auth" />}
                />
                <Route
                  path="/school/:id"
                  element={isAuthenticated ? <SchoolDetails /> : <Navigate to="/auth" />}
                />
                <Route
                  path="/auth"
                  element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;