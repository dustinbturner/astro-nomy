import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
export const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Email template for newsletter confirmation
export async function sendNewsletterConfirmation(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Astro-nomy <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to the Astro-nomy Newsletter!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Welcome to the Astro-nomy Newsletter!</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Thank you for subscribing to our newsletter! You'll now receive updates about Astro-nomy, including new features, tutorials, and more.
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="font-size: 14px; color: #777; margin: 0;">
              If you didn't sign up for this newsletter, you can safely ignore this email.
            </p>
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">
            &copy; ${new Date().getFullYear()} Astro-nomy. All rights reserved.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending newsletter confirmation:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending newsletter confirmation:', error);
    return { success: false, error };
  }
}

// Email template for waitlist confirmation
export async function sendWaitlistConfirmation(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Astro-nomy <onboarding@resend.dev>',
      to: [email],
      subject: 'You\'re on the Astro-nomy Waitlist!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">You're on the Waitlist!</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Thank you for joining the Astro-nomy waitlist! We'll notify you as soon as we launch.
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="font-size: 14px; color: #777; margin: 0;">
              If you didn't sign up for this waitlist, you can safely ignore this email.
            </p>
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">
            &copy; ${new Date().getFullYear()} Astro-nomy. All rights reserved.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending waitlist confirmation:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending waitlist confirmation:', error);
    return { success: false, error };
  }
}
