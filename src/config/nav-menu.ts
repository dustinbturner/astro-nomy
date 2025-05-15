import type { NavMenuConfig } from "@/types";

export const navMenuConfig: NavMenuConfig = {
  pagesNav: [
    {
      title: "Pages",
      items: [
        {
          title: "Landing",
          href: "/landing",
          description: "A landing page template with differents sections.",
          image: "/images/examples/landing.jpg",
        },
        {
          title: "Changelog",
          href: "/releases",
          description: "A reproduction of Starlog template with Tailwind CSS.",
          image: "/images/examples/changelog.jpg",
        },
        {
          title: "Waitlist",
          href: "/waitlist",
          description:
            "A waitlist form using Supabase, React Hook Form & Sonner. Static page.",
          image: "/images/examples/waitlist.jpg",
          forceReload: true,
        },
        {
          title: "Pricing",
          href: "/pricing",
          description: "Pricing cards, FAQs and more content with price.",
          image: "/images/examples/pricing.jpg",
        },
        {
          title: "About",
          href: "/about",
          description: "A simple page with a masonry gallery and little text.",
          image: "/images/examples/about.jpg",
        },
        {
          title: "Newsletter",
          href: "/newsletter",
          description:
            "A newsletter form using Supabase with React Hook Form. Counter display!",
          image: "/images/examples/newsletter.jpg",
        },
      ],
    },
  ],
  examplesNav: [
    {
      title: "Examples",
      items: [
        {
          title: "Static Blog",
          href: "/blog",
          description: "A Markdown/MDX blog built using Content Collections.",
          image: "/images/examples/static-blog.jpg",
        },
        {
          title: "Docs",
          href: "/docs/getting-started",
          description:
            "A Markdown/MDX docs site built using Content Collections.",
          image: "/images/examples/documentation.jpg",
        },

        {
          title: "Blog DB",
          href: "/blog-db",
          description:
            "Blog built using Supabase. With categories, views & likes.",
          // image: "/images/examples/blog-db.jpg",
          disabled: true,
        },
        {
          title: "Ecommerce",
          href: "/products",
          disabled: true,
          description: "Ecommerce pages fetching data from an API.",
          // image: "/images/examples/ecommerce.jpg",
        },
        {
          title: "Authentication",
          href: "/auth",
          description: "Implement authentication using Supabase Auth",
          // image: "/images/examples/auth.jpg",
          disabled: true,
        },
      ],
    },
  ],
  links: [
    // {
    //   title: "Example",
    //   href: "/example",
    //   description: "Example description",
    //   image: "/images/examples/image.jpg",
    // },
  ],
};
