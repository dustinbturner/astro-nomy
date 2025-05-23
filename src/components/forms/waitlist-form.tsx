import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is not valid.",
  }),
});

export function WaitlistForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (data.message === "success") {
        toast.success("Thanks for your support!", {
          description: "We've added your email to the waitlist!",
        });
        form.reset();
      } else if (data.error === "Email already on waitlist") {
        toast.info("You're already on the waitlist!", {
          description: "Thank you for your continued interest.",
        });
        form.reset();
      } else {
        toast.error("Something went wrong", {
          description: data.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      toast.error("Submission failed", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jonhdoe@example.com" {...field} />
              </FormControl>
              <FormDescription className="text-[13px]">
                <i>
                  Saved securely in Supabase. React form with server validation.
                </i>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
