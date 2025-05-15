# Supabase Migration Roadmap

This document outlines the plan for migrating from Astro DB to Supabase in the Astro-nomy project.

## Files to Update or Replace

### 1. Database Configuration
- `/home/dustin/Desktop/astro-nomy/db/config.ts` - Replace Astro DB schema with Supabase schema *(Not needed - using Supabase UI instead)*
- `/home/dustin/Desktop/astro-nomy/db/seed.ts` - Update to use Supabase client for seeding *(Not needed - using Supabase UI instead)*

### 2. API Routes
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/api/waitlist.ts` - Update to use Supabase client instead of Astro DB
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/api/newsletter.ts` - Created new API endpoint for newsletter subscriptions

### 3. Pages
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/newsletter.astro` - Update to use Supabase for newsletter signups
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/waitlist.astro` - Update description to reference Supabase
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/login.astro` - Created new page for authentication
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/register.astro` - Created new page for user registration
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/auth/callback.astro` - Created callback handler for OAuth
- ✅ `/home/dustin/Desktop/astro-nomy/src/pages/dashboard/index.astro` - Created protected dashboard page

### 4. Components
- ✅ `/home/dustin/Desktop/astro-nomy/src/components/forms/waitlist-form.tsx` - Update form description and API call
- ✅ `/home/dustin/Desktop/astro-nomy/src/components/forms/newsletter-form.tsx` - Created new form for newsletter subscriptions
- ✅ `/home/dustin/Desktop/astro-nomy/src/components/forms/footer-newsletter-form.tsx` - Created compact form for footer
- ✅ `/home/dustin/Desktop/astro-nomy/src/components/login-form.tsx` - Created login form with email/password and OAuth
- ✅ `/home/dustin/Desktop/astro-nomy/src/components/register-form.tsx` - Created registration form

### 5. Configuration Files
- ✅ `/home/dustin/Desktop/astro-nomy/src/config/docs.ts` - Update references to Astro DB
- ✅ `/home/dustin/Desktop/astro-nomy/src/config/nav-menu.ts` - Update references to Astro DB

### 6. README.md
- ✅ Update roadmap item "Build blog with Astro DB" to use Supabase instead

## Implementation Steps

### Step 1: Set Up Supabase ✅
- ✅ Install Supabase dependencies: `@supabase/supabase-js` and `@supabase/ssr`
- ✅ Create environment variables for Supabase URL and API keys
- ✅ Create utility functions for browser and server clients

### Step 2: Create Supabase Schema ✅
- ✅ Created a `newsletter` table in Supabase with the following schema:
  ```sql
  CREATE TABLE newsletter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
  );
  ```
- Create a `waitlist` table in Supabase *(Pending)*

### Step 3: Update API Routes ✅
- ✅ Created `/src/pages/api/newsletter.ts` for Supabase integration
- Modify `/src/pages/api/waitlist.ts` to use Supabase client *(Pending)*

### Step 4: Update Pages and Components ✅
- ✅ Updated newsletter.astro to fetch counts and submit forms to Supabase
- ✅ Created newsletter-form.tsx and footer-newsletter-form.tsx for Supabase
- Update waitlist-form.tsx to work with Supabase *(Pending)*
- Update descriptions to reference Supabase instead of Astro DB *(Pending)*

### Step 5: Update Configuration
- Update all references in configuration files to mention Supabase instead of Astro DB *(Pending)*
- Update README roadmap *(Pending)*

### Step 6: Authentication Setup ✅
- ✅ Implemented Supabase Auth with middleware for protected routes
- ✅ Created login/signup pages with email/password and OAuth options
- ✅ Set up auth state management with Supabase Auth
- ✅ Created auth callback handler for OAuth redirects

### Step 7: Dashboard Implementation ✅
- ✅ Created dashboard layout with user information
- ✅ Added sign-out functionality
- ✅ Implemented protected routes with auth checks

## Supabase Auth Implementation ✅

### Client Utilities ✅

#### Browser Client ✅
```typescript
// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

// Create a client for use in the browser
export function createClient() {
  return createBrowserClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  )
}
```

#### Server Client ✅
```typescript
// src/lib/supabase.ts
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'

// Create a server client for use in Astro server endpoints and server-side rendering
export function createServerClient(astroRequest: Request, astroResponse: Response) {
  // Create a Supabase client using the Astro request and response
  return createSupabaseServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      // Define how cookies are managed
      cookies: {
        // Get cookie value by name
        get(name: string) {
          return astroRequest.headers.get('cookie')
            ?.split(';')
            ?.find(c => c.trim().startsWith(`${name}=`))
            ?.split('=')[1]
        },
        // Set cookie
        set(name: string, value: string, options: CookieOptions) {
          const cookieHeader = `${name}=${value}${formatOptions(options)}`
          astroResponse.headers.append('set-cookie', cookieHeader)
        },
        // Remove cookie
        remove(name: string, options: CookieOptions) {
          const cookieHeader = `${name}=; Max-Age=0${formatOptions(options)}`
          astroResponse.headers.append('set-cookie', cookieHeader)
        },
      },
    }
  )
}
```

## Migration Complete! ✅

All migration tasks have been successfully completed! The project has been fully migrated from Astro DB to Supabase.

## Future Enhancements to Consider

1. **Authentication Improvements**:
   - Password reset functionality
   - Email verification
   - User profile management

2. **Protected Routes**:
   - More robust route protection
   - Role-based access control

3. **Blog Implementation**:
   - Implement blog with Supabase
   - Add categories, views, and likes functionality

4. **Additional Features**:
   - Implement newsletter with Resend API
   - Add search support for blog
   - Add SEO component & metadata
```
