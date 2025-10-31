export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded shadow flex flex-col gap-2 bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-black">{note.title}</h3>
        <div className="flex gap-2 ">
          <button
            onClick={() => onEdit(note)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
      {note.image_url && (
        <img
          src={note.image_url}
          alt="note"
          className="w-full h-max-48 object-cover rounded"
        />
      )}
      <p className="text-black">{note.content}</p>
    </div>
  );
}
