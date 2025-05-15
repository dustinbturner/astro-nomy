import type { SidebarNavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Astronomy",
  description:
    "An modern example app built using Astro v5 & shadcn/ui. Inspired by shadcn/taxonomy.",
  url: "https://astro-nomy-updated.vercel.app",
  ogImage: "https://astro-nomy-updated.vercel.app/og.jpg",
  links: {
    twitter: "https://twitter.com/dustinbturner",
    github: "https://github.com/dustinbturner/astro-nomy",
  },
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Partners", href: "#" },
      { title: "Jobs", href: "#" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];