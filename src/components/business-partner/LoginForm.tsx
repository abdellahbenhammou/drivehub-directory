import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform(val => val.trim().toLowerCase()),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LoginForm = ({ open, onOpenChange }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.success("Successfully logged in!");
      if (onOpenChange) onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email address"
          {...register("email")}
          autoComplete="email"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          autoComplete="current-password"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="button"
        variant="link"
        className="px-0"
        onClick={() => setShowResetPassword(true)}
      >
        Forgot password?
      </Button>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );

  if (showResetPassword) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Reset Password</h2>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            <ResetPasswordForm onCancel={() => setShowResetPassword(false)} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return open !== undefined ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <FormContent />
      </DialogContent>
    </Dialog>
  ) : (
    <FormContent />
  );
};