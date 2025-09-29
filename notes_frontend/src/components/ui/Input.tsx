"use client";

import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// PUBLIC_INTERFACE
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  /** A minimalist input with subtle outline and rounded corners. */
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition",
        className
      )}
      {...props}
    />
  );
});
