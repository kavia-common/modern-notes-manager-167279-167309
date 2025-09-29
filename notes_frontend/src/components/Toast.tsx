"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string | null;
  type?: "error" | "info";
}

// PUBLIC_INTERFACE
export function Toast({ message, type = "info" }: ToastProps) {
  /** A lightweight toast/inline alert. Appears fixed bottom-right when message present. */
  if (!message) return null;
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-lg px-4 py-3 text-sm shadow-lg",
        type === "error"
          ? "bg-red-500 text-white"
          : "bg-blue-600 text-white"
      )}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
