import { createBrowserClient, createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'

// Create a client for use in the browser
export function createClient() {
  return createBrowserClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  )
}

// Create a server client for use in Astro server endpoints and server-side rendering
export function createServerClient(astroRequest: Request, astroResponse: Response) {
  // Create a Supabase client using the Astro request and response
  return createSupabaseServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      // Define how cookies are managed using the recommended pattern
      cookies: {
        // Get all cookies
        getAll() {
          const cookieString = astroRequest.headers.get('cookie') || ''
          return parseCookies(cookieString)
        },
        // Set all cookies
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieHeader = `${name}=${value}${formatOptions(options)}`
            astroResponse.headers.append('set-cookie', cookieHeader)
          })
        }
      },
    }
  )
}

// Helper function to parse cookies from a cookie string
function parseCookies(cookieString: string) {
  return cookieString.split(';')
    .filter(cookie => cookie.trim() !== '')
    .map(cookie => {
      const [name, ...rest] = cookie.split('=')
      const value = rest.join('=')
      return { name: name.trim(), value }
    })
}

// Helper function to format cookie options
function formatOptions(options?: CookieOptions): string {
  if (!options) return ''
  
  let parts = ''
  if (options.domain) parts += `; Domain=${options.domain}`
  if (options.path) parts += `; Path=${options.path}`
  if (options.maxAge) parts += `; Max-Age=${options.maxAge}`
  if (options.expires) parts += `; Expires=${options.expires.toUTCString()}`
  if (options.httpOnly) parts += '; HttpOnly'
  if (options.secure) parts += '; Secure'
  if (options.sameSite) parts += `; SameSite=${options.sameSite}`
  return parts
}