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

export function NewsletterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (data.message === "success") {
        toast.success("Successfully subscribed!", {
          description: "Thank you for subscribing to our newsletter.",
        });
        form.reset();
      } else if (data.message === "already_subscribed") {
        toast.info("You're already subscribed!", {
          description: "Thank you for your continued support.",
        });
        form.reset();
      } else {
        toast.error("Subscription failed", {
          description: data.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription className="text-[13px]">
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" className="w-full" type="submit">
          Subscribe
        </Button>
      </form>
    </Form>
  );
}
