import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  city: z.string().min(1, "Please select a city"),
  schoolId: z.string().uuid("Please select a school"),
  isOwner: z.enum(["yes", "no"]),
  verificationCode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrationForm({ open, onOpenChange }: Props) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [showVerification, setShowVerification] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      schoolId: "",
      isOwner: "no",
    },
  });

  const { data: schools } = useQuery({
    queryKey: ["schools", selectedCity],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schools")
        .select("id, name")
        .eq("city", selectedCity)
        .order("name");

      if (error) throw error;
      return data;
    },
    enabled: !!selectedCity,
  });

  const filteredSchools = schools?.filter((school) =>
    school.name.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const onSubmit = async (values: FormValues) => {
    try {
      if (!showVerification) {
        const { data: existingRequest, error: checkError } = await supabase
          .from("business_partner_requests")
          .select()
          .eq("email", values.email)
          .eq("is_verified", false)
          .maybeSingle();

        if (checkError && checkError.code !== "PGRST116") {
          throw checkError;
        }

        if (existingRequest) {
          setShowVerification(true);
          return;
        }

        const { error: insertError } = await supabase
          .from("business_partner_requests")
          .insert({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone,
            city: values.city,
            school_id: values.schoolId,
            is_owner: values.isOwner === "yes",
            verification_code: await generateVerificationCode(),
          });

        if (insertError) throw insertError;

        setShowVerification(true);
        toast.success(
          "Registration submitted! Please check your email for verification code."
        );
      } else {
        const { error: verifyError } = await supabase
          .from("business_partner_requests")
          .update({ is_verified: true })
          .eq("email", values.email)
          .eq("verification_code", values.verificationCode);

        if (verifyError) throw verifyError;

        toast.success("Verification successful!");
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const generateVerificationCode = async () => {
    const { data, error } = await supabase.rpc("generate_verification_code");
    if (error) throw error;
    return data;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {showVerification
              ? "Verify Your Registration"
              : "Business Partner Registration"}
          </DialogTitle>
          <DialogDescription>
            {showVerification
              ? "Enter the verification code sent to your email"
              : "Fill in your details to register as a business partner"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!showVerification ? (
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCity(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-[200px]">
                            {[
                              "Casablanca",
                              "Rabat",
                              "Marrakech",
                              "Fes",
                              "Tangier",
                              "Agadir",
                            ].map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driving School</FormLabel>
                      <div className="space-y-2">
                        <Input
                          placeholder="Search schools..."
                          value={schoolSearch}
                          onChange={(e) => setSchoolSearch(e.target.value)}
                          className="mb-2"
                        />
                        <Select
                          onValueChange={field.onChange}
                          disabled={!selectedCity}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a school" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <ScrollArea className="h-[200px]">
                              {filteredSchools?.map((school) => (
                                <SelectItem key={school.id} value={school.id}>
                                  {school.name}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isOwner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Are you the registered business owner of this driving
                        school?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the code sent to your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full">
              {showVerification ? "Verify" : "Register"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
