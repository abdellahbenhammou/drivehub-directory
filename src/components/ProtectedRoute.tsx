import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to access this page",
        });
        navigate("/");
        return;
      }

      if (adminOnly) {
        const { data: adminData } = await supabase
          .from("admin_users")
          .select("email")
          .eq("email", session.user.email)
          .single();

        if (!adminData) {
          toast({
            variant: "destructive",
            title: "Access denied",
            description: "You don't have admin privileges",
          });
          navigate("/");
        }
      }
    };

    checkAuth();
  }, [navigate, toast, adminOnly]);

  return <>{children}</>;
};