import { Card } from "@/components/ui/card";

interface AdminGreetingProps {
  email: string | null;
  role?: string;
}

export const AdminGreeting = ({ email, role = "School Admin" }: AdminGreetingProps) => {
  if (!email) return null;
  
  return (
    <Card className="p-6 mb-6 bg-primary/5">
      <h2 className="text-xl font-semibold mb-2">Welcome, {role}!</h2>
      <p className="text-muted-foreground">Logged in as: {email}</p>
    </Card>
  );
};