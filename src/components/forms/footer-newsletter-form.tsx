import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

export function FooterNewsletterForm() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    placeholder="Your email" 
                    {...field} 
                    className="h-9"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button 
            variant="default" 
            type="submit" 
            className="h-9 px-4"
            size="sm"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </Form>
  );
}
