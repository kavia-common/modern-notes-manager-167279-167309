"use client";

import React from "react";
import type { Note, NoteID } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Input } from "./ui/Input";

interface SidebarProps {
  notes: Note[];
  selectedId: NoteID | null;
  onSelect: (id: NoteID) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

// PUBLIC_INTERFACE
export function Sidebar({ notes, selectedId, onSelect, onSearch, className }: SidebarProps) {
  /** Sidebar with search and note list */
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  React.useEffect(() => {
    onSearch?.(query);
  }, [query, onSearch]);

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-r border-gray-200 bg-white/90",
        className
      )}
    >
      <div className="p-3">
        <Input
          placeholder="Search notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <nav className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500">No notes found</p>
        ) : (
          <ul className="space-y-1 px-2 pb-4">
            {filtered.map((n) => {
              const active = selectedId === n.id;
              return (
                <li key={n.id}>
                  <button
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left transition shadow-sm border",
                      active
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50 border-transparent"
                    )}
                    onClick={() => onSelect(n.id)}
                    aria-current={active ? "page" : undefined}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "line-clamp-1 text-sm font-medium",
                          active ? "text-blue-800" : "text-gray-800"
                        )}
                      >
                        {n.title || "Untitled"}
                      </span>
                      <span className="text-[10px] text-gray-400">{formatDate(n.updatedAt)}</span>
                    </div>
                    {n.content ? (
                      <p className="line-clamp-1 text-xs text-gray-500">{n.content}</p>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No content</p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
  );
}
