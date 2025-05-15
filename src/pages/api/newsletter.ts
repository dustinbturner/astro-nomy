import type { APIRoute } from "astro";
import { createServerClient } from "@/lib/supabase";
import { sendNewsletterConfirmation } from "@/lib/resend";

export const POST: APIRoute = async ({ request, redirect }) => {
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

    // Insert the email into the newsletter table
    const { error } = await supabase
      .from('newsletter')
      .insert([{ email }]);

    if (error) {
      // Check if it's a unique constraint violation (email already exists)
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({
            message: "already_subscribed",
            error: "Email already subscribed",
          }),
          { status: 200, headers: response.headers }
        );
      }

      console.error("Newsletter subscription error:", error);
      return new Response(
        JSON.stringify({
          message: "error",
          error: error.message,
        }),
        { status: 500, headers: response.headers }
      );
    }

    // Send confirmation email
    const emailResult = await sendNewsletterConfirmation(email);
    
    if (!emailResult.success) {
      console.warn("Failed to send confirmation email, but subscription was successful:", emailResult.error);
    }

    return new Response(
      JSON.stringify({
        message: "success",
        emailSent: emailResult.success,
      }),
      { status: 200, headers: response.headers }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return new Response(
      JSON.stringify({
        message: "error",
        error: "Internal server error",
      }),
      { status: 500, headers: response.headers }
    );
  }
};
