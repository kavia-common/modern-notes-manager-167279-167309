"use client";

import React from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onNew: () => void;
  onRefresh: () => void;
  saving?: boolean;
  className?: string;
}

// PUBLIC_INTERFACE
export function TopBar({ onNew, onRefresh, saving, className }: TopBarProps) {
  /** Top action bar with new and refresh actions and app branding */
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50/60 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-blue-600 shadow-sm ring-2 ring-blue-300/30" />
        <div>
          <h1 className="text-sm font-semibold text-gray-800">Modern Notes</h1>
          <p className="text-xs text-gray-500">Ocean Professional</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onRefresh} aria-label="Refresh notes">
          Refresh
        </Button>
        <Button variant="secondary" onClick={onNew} aria-label="Create new note">
          + New Note
        </Button>
        {saving ? (
          <span className="ml-2 text-xs text-gray-500 animate-pulse">Saving…</span>
        ) : null}
      </div>
    </div>
  );
}
