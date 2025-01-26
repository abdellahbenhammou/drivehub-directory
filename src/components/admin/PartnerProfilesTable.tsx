import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PartnerProfilesTable() {
  const { toast } = useToast();

  const { data: profiles, refetch } = useQuery({
    queryKey: ["partnerProfiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_partner_profiles")
        .select(`
          *,
          schools (
            name,
            city
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleVerify = async (id: string) => {
    const { error } = await supabase
      .from("business_partner_profiles")
      .update({ is_verified: true })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify partner profile",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Partner profile verified successfully",
    });
    refetch();
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from("business_partner_profiles")
      .update({ is_verified: false })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject partner profile",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Partner profile rejected successfully",
    });
    refetch();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>School</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell>{profile.user_id}</TableCell>
              <TableCell>{profile.schools?.name || "No school"}</TableCell>
              <TableCell>{profile.schools?.city || "N/A"}</TableCell>
              <TableCell>
                {profile.is_verified === true && (
                  <span className="text-green-600">Verified</span>
                )}
                {profile.is_verified === false && (
                  <span className="text-red-600">Rejected</span>
                )}
                {profile.is_verified === null && (
                  <span className="text-yellow-600">Pending</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerify(profile.id)}
                    disabled={profile.is_verified === true}
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(profile.id)}
                    disabled={profile.is_verified === false}
                  >
                    <XCircle className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}