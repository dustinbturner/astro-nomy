import * as React from "react";

import Callout from "@/components/callout.astro";
import MdxCard from "@/components/content/mdx-card.astro";
import { cn } from "@/lib/utils";
import { Image } from "astro:assets";

// Extended type for HTML attributes with additional class prop for Astro compatibility
type ExtendedHTMLAttributes<T> = React.HTMLAttributes<T> & {
  class?: string;
}

type Props = ExtendedHTMLAttributes<HTMLElement> & {
  className?: string;
  class?: string;
}

export const MdxComponents = {
  h1: ({ className, class: classProp, ...props }: Props) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className,
        classProp
      )}
      {...props}
    />
  ),
  h2: ({ className, class: classProp, ...props }: Props) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-2xl font-semibold tracking-tight first:mt-0",
        className,
        classProp
      )}
      {...props}
    />
  ),
  h3: ({ className, class: classProp, ...props }: Props) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
        classProp
      )}
      {...props}
    />
  ),
  h4: ({ className, class: classProp, ...props }: Props) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
        classProp
      )}
      {...props}
    />
  ),
  h5: ({ className, class: classProp, ...props }: Props) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
        classProp
      )}
      {...props}
    />
  ),
  h6: ({ className, class: classProp, ...props }: Props) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className,
        classProp
      )}
      {...props}
    />
  ),
  a: ({ className, class: classProp, ...props }: Props) => (
    <a
      className={cn("font-medium underline underline-offset-4", className, classProp)}
      {...props}
    />
  ),
  p: ({ className, class: classProp, ...props }: Props) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className, classProp)}
      {...props}
    />
  ),
  ul: ({ className, class: classProp, ...props }: Props) => (
    <ul className={cn("my-6 ml-6 list-disc", className, classProp)} {...props} />
  ),
  ol: ({ className, class: classProp, ...props }: Props) => (
    <ol className={cn("my-6 ml-6 list-decimal", className, classProp)} {...props} />
  ),
  li: ({ className, class: classProp, ...props }: Props) => (
    <li className={cn("mt-2", className, classProp)} {...props} />
  ),
  blockquote: ({ className, class: classProp, ...props }: Props) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className,
        classProp
      )}
      {...props}
    />
  ),
  img: ({ className, class: classProp, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className, classProp)} alt={alt} {...props} />
  ),
  hr: ({ className, class: classProp, ...props }: Props) => <hr className={cn("my-4 md:my-8", className, classProp)} {...props} />,
  table: ({ className, class: classProp, ...props }: ExtendedHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className, classProp)} {...props} />
    </div>
  ),
  tr: ({ className, class: classProp, ...props }: ExtendedHTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className, classProp)}
      {...props}
    />
  ),
  th: ({ className, ...props }: Props) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: Props) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: Props) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4",
        className
      )}
      tabIndex={0}
      {...props}
    />
  ),
  Image,
  Callout,
  Card: MdxCard,
};
