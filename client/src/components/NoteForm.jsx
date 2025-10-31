import { useState, useEffect } from "react";

export default function NoteForm({ show, onClose, onSubmit, note }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImage] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setImage(note.image || "");
    } else {
      setTitle("");
      setContent("");
      setImage("");
    }
  }, [note]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image_url, id: note?.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96 flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold text-black">
          {note ? "Edit Note" : "Add Note"}
        </h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 rounded placeholder:text-gray-500 text-black"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 p-2 rounded placeholder:text-gray-500 text-black"
          rows={4}
          required
        />
        <input
          placeholder="Image URL (optional)"
          value={image_url}
          onChange={(e) => setImage(e.target.value)}
          className="border  border-gray-300  p-2 rounded placeholder:text-gray-500 text-black"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded border"
          >
            Cancel
          </button>
          <button type="submit" className="p-2 rounded bg-blue-500 text-white">
            {note ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
