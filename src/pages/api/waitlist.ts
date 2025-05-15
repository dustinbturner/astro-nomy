import type { APIRoute } from "astro";
import { createServerClient } from "@/lib/supabase";
import { sendWaitlistConfirmation } from "@/lib/resend";

export const GET: APIRoute = async ({ request }) => {
  const response = new Response();
  try {
    const supabase = createServerClient(request, response);
    
    // Get count of waitlist entries
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Error fetching waitlist count:", error);
      return new Response(
        JSON.stringify({
          message: "error",
          error: error.message,
        }),
        { status: 500, headers: response.headers }
      );
    }
    
    return new Response(
      JSON.stringify({
        count: count || 0,
      }),
      { status: 200, headers: response.headers }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return new Response(
      JSON.stringify({
        message: "error",
        error: "Internal server error",
      }),
      { status: 500, headers: response.headers }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const response = new Response();
  try {
    const supabase = createServerClient(request, response);
    const data = await request.json();
    const { email } = data;

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "error",
          error: "Email is required",
        }),
        { status: 400, headers: response.headers }
      );
    }

    // Insert the email into the waitlist table
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      // Check if it's a unique constraint violation (email already exists)
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({
            message: "error",
            error: "Email already on waitlist",
          }),
          { status: 400, headers: response.headers }
        );
      }

      console.error("Waitlist submission error:", error);
      return new Response(
        JSON.stringify({
          message: "error",
          error: error.message,
        }),
        { status: 500, headers: response.headers }
      );
    }

    // Send confirmation email
    const emailResult = await sendWaitlistConfirmation(email);
    
    if (!emailResult.success) {
      console.warn("Failed to send waitlist confirmation email, but submission was successful:", emailResult.error);
    }

    return new Response(
      JSON.stringify({
        message: "success",
        emailSent: emailResult.success,
      }),
      { status: 200, headers: response.headers }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return new Response(
      JSON.stringify({
        message: "error",
        error: "Internal server error",
      }),
      { status: 500, headers: response.headers }
    );
  }
};
