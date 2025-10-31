import { useState, useEffect } from "react";
import API from "../api";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `/notes/?search=${search}&page=${page}&limit=5`
      );
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error("Error loading notes:", err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this note?")) return;
    await API.delete(`/notes/${id}`);
    loadNotes();
  };

  const handleSubmit = async (data) => {
    console.log("Submitting note:", data);
    if (data.id) {
      await API.put(`/notes/${data.id}`, data);
    } else {
      await API.post("/notes", data);
    }
    setShowForm(false);
    setEditNote(null);
    loadNotes();
  };

  return (
    <div className="p-6  min-h-screen w-screen">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Note
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-gray-500">No notes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(n) => {
                setEditNote(n);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="p-2 border rounded"
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="p-2 border rounded"
          disabled={notes.length < 5}
        >
          Next
        </button>
      </div>

      <NoteForm
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setEditNote(null);
        }}
        onSubmit={handleSubmit}
        note={editNote}
      />
    </div>
  );
}
