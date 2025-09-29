"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

// PUBLIC_INTERFACE
export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  /** A themed button component with Ocean Professional styling. */
  const base =
    "inline-flex items-center justify-center rounded-lg transition-colors duration-200 shadow-sm";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
  };
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-300",
    secondary:
      "bg-amber-500 hover:bg-amber-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-300",
    ghost:
      "bg-transparent hover:bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-red-300",
  };
  return <button className={cn(base, sizes[size], variants[variant], className)} {...props} />;
}
