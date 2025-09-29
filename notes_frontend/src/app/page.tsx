"use client";

import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { NoteEditor } from "@/components/NoteEditor";
import { EmptyState } from "@/components/EmptyState";
import { Toast } from "@/components/Toast";
import { useNotes } from "@/hooks/useNotes";

export default function Home() {
  const { notes, selected, selectedId, setSelectedId, status, error, actions } = useNotes();

  return (
    <main className="grid h-[100dvh] grid-rows-[auto,1fr]">
      <TopBar
        onNew={actions.create}
        onRefresh={actions.refresh}
        saving={status === "saving"}
      />
      <section className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0 h-full">
        <Sidebar
          className="hidden md:flex"
          notes={notes}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
        <div className="flex h-full flex-col p-3 md:p-6">
          <div className="container-card h-full p-4 md:p-6">
            {!selected ? (
              <EmptyState onCreate={actions.create} />
            ) : (
              <NoteEditor
                note={selected}
                onSave={(changes) => actions.save(selected.id, changes)}
                onDelete={() => actions.remove(selected.id)}
                saving={status === "saving"}
              />
            )}
          </div>
        </div>
      </section>

      <Toast message={error} type="error" />
    </main>
  );
}
