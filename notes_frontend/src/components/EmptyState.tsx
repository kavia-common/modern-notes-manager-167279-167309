"use client";

import React from "react";
import { Button } from "./ui/Button";

// PUBLIC_INTERFACE
export function EmptyState({ onCreate }: { onCreate: () => void }) {
  /** Empty state prompting the user to create a new note */
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gradient-to-b from-blue-50/40 to-gray-50/40 p-10 text-center shadow-inner">
      <div className="mb-4 h-16 w-16 rounded-xl bg-blue-100 ring-4 ring-blue-50" />
      <h2 className="text-lg font-semibold text-gray-800">No note selected</h2>
      <p className="mt-1 max-w-md text-sm text-gray-500">
        Choose a note from the list or create a new one to get started.
      </p>
      <Button className="mt-4" variant="secondary" onClick={onCreate}>
        + Create your first note
      </Button>
    </div>
  );
}
