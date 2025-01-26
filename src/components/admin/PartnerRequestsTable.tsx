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

export function PartnerRequestsTable() {
  const { toast } = useToast();

  const { data: requests, refetch } = useQuery({
    queryKey: ["partnerRequests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_partner_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleVerify = async (id: string) => {
    const { error } = await supabase
      .from("business_partner_requests")
      .update({ is_verified: true })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify partner request",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Partner request verified successfully",
    });
    refetch();
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from("business_partner_requests")
      .update({ is_verified: false })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject partner request",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Partner request rejected successfully",
    });
    refetch();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {request.first_name} {request.last_name}
              </TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.phone}</TableCell>
              <TableCell>{request.city}</TableCell>
              <TableCell>
                {request.is_verified === true && (
                  <span className="text-green-600">Verified</span>
                )}
                {request.is_verified === false && (
                  <span className="text-red-600">Rejected</span>
                )}
                {request.is_verified === null && (
                  <span className="text-yellow-600">Pending</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerify(request.id)}
                    disabled={request.is_verified === true}
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(request.id)}
                    disabled={request.is_verified === false}
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