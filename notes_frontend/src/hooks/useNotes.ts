"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Note, NoteID } from "@/lib/types";
import { createNote, deleteNote, listNotes, updateNote } from "@/lib/api";

type Status = "idle" | "loading" | "saving" | "deleting" | "error";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<NoteID | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const extractMessage = (e: unknown): string => {
    if (typeof e === "object" && e && "message" in e) {
      const m = (e as { message?: unknown }).message;
      if (typeof m === "string") return m;
    }
    return "An unexpected error occurred";
  };

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await listNotes();
      setNotes(
        data.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      );
      if (data.length && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch (e: unknown) {
      setError(extractMessage(e) || "Failed to load notes");
      setNotes([]);
    } finally {
      setStatus("idle");
    }
  }, [selectedId]);

  const create = useCallback(async () => {
    setStatus("saving");
    setError(null);
    try {
      const created = await createNote();
      setNotes((prev) => [created, ...prev]);
      setSelectedId(created.id);
    } catch (e: unknown) {
      setError(extractMessage(e) || "Failed to create note");
    } finally {
      setStatus("idle");
    }
  }, []);

  const save = useCallback(
    async (id: NoteID, fields: Partial<Pick<Note, "title" | "content">>) => {
      setStatus("saving");
      setError(null);
      // Optimistic update
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...fields, updatedAt: new Date().toISOString() } : n))
      );
      try {
        const updated = await updateNote(id, fields);
        setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
      } catch (e: unknown) {
        setError(extractMessage(e) || "Failed to save note");
        // on error, refresh to get server truth
        refresh();
      } finally {
        setStatus("idle");
      }
    },
    [refresh]
  );

  const remove = useCallback(async (id: NoteID) => {
    setStatus("deleting");
    setError(null);
    const previous = notes;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
    try {
      await deleteNote(id);
    } catch (e: unknown) {
      setError(extractMessage(e) || "Failed to delete note");
      // rollback
      setNotes(previous);
    } finally {
      setStatus("idle");
    }
  }, [notes, selectedId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    notes,
    selected,
    selectedId,
    setSelectedId,
    status,
    error,
    actions: { refresh, create, save, remove },
  };
}
