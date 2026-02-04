import React, { type ElementType } from "react";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface Props extends React.HTMLAttributes<HTMLElement> {
  variant: Variant;
  children: React.ReactNode;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
};

const sizes: Record<Variant, string> = {
  h1: "text-5xl",
  h2: "text-4xl",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
  p: "text-base",
  span: "text-sm",
};

const Text = ({ variant, children, className, as, ...props }: Props) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];

  return (
    <Tag
      className={`${sizeClasses} font-ibm ${className ? className : ""}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
