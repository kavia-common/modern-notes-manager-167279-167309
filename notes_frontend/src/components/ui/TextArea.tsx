"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// PUBLIC_INTERFACE
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, ...props },
  ref
) {
  /** A minimalist text area suitable for note content editing. */
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[300px] rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition leading-6",
        className
      )}
      {...props}
    />
  );
});
