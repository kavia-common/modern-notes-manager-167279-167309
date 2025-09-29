"use client";

import React from "react";
import type { Note } from "@/lib/types";
import { Input } from "./ui/Input";
import { TextArea } from "./ui/TextArea";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

interface NoteEditorProps {
  note: Note;
  onSave: (changes: Partial<Pick<Note, "title" | "content">>) => void;
  onDelete: () => void;
  saving?: boolean;
  className?: string;
}

// PUBLIC_INTERFACE
export function NoteEditor({ note, onSave, onDelete, saving, className }: NoteEditorProps) {
  /** Editor for a note with title and content; debounced autosave on change */
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);

  React.useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id, note.title, note.content]);

  // Autosave with debounce
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        onSave({ title, content });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [title, content, note.title, note.content, note.id, onSave]);

  return (
    <div className={cn("flex h-full flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="text-base font-medium"
          aria-label="Note title"
        />
        <Button variant="danger" onClick={onDelete} aria-label="Delete note">
          Delete
        </Button>
      </div>
      <div className="flex-1">
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing your note…"
          className="min-h-[50vh]"
          aria-label="Note content"
        />
      </div>
      <div className="text-right text-xs text-gray-400">
        {saving ? "Saving…" : "All changes saved"}
      </div>
    </div>
  );
}
