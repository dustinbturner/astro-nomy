import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  // Create a response that we can modify
  const response = await next();
  
  // Create a Supabase client using the request and response
  const supabase = createServerClient(context.request, response);

  // Get the current user - this is the key step for auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if user is trying to access protected routes
  const url = new URL(context.request.url);
  const isProtectedRoute = 
    url.pathname.startsWith('/dashboard') || 
    url.pathname.startsWith('/account');
  
  const isAuthRoute = 
    url.pathname.startsWith('/login') || 
    url.pathname.startsWith('/register') ||
    url.pathname.startsWith('/auth');

  // Redirect to login if accessing protected routes without auth
  if (isProtectedRoute && !user) {
    return Response.redirect(new URL('/login', context.request.url), 302);
  }

  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && user) {
    return Response.redirect(new URL('/dashboard', context.request.url), 302);
  }

  // Continue with the response
  return response;
});
