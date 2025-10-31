const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../configs/db.js");
const auth = require("../middlewares/auth.js");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { course, title, content, image_url, is_public } = req.body;
  const public_slug = is_public ? uuidv4() : null;

  await db.query(
    "INSERT INTO notes (user_id, course, title, content, image_url, is_public, public_slug) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [req.user.id, course, title, content, image_url, is_public, public_slug]
  );

  res.json({ message: "Note created" });
});

router.get("/", auth, async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const offset = (page - 1) * limit;

  const [countResult] = await db.query(
    "SELECT COUNT(*) as total FROM notes WHERE user_id=? AND title LIKE ?",
    [req.user.id, `%${search}%`]
  );
  const total = countResult[0].total;

  const [notes] = await db.query(
    "SELECT * FROM notes WHERE user_id=? AND title LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?",
    [req.user.id, `%${search}%`, +limit, +offset]
  );

  res.json({ notes, total, totalPages: Math.ceil(total / limit), page: +page });
});

router.put("/:id", auth, async (req, res) => {
  const { title, content, image_url, is_public } = req.body;
  const public_slug = is_public ? uuidv4() : null;
  console.log("Updating note:", {
    title,
    content,
    image_url,
    is_public,
    public_slug,
  });
  await db.query(
    "UPDATE notes SET title=?, content=?, image_url=?, is_public=?, public_slug=? WHERE id=? AND user_id=?",
    [
      title,
      content,
      image_url,
      is_public,
      public_slug,
      req.params.id,
      req.user.id,
    ]
  );

  res.json({ message: "Note updated" });
});

router.delete("/:id", auth, async (req, res) => {
  await db.query("DELETE FROM notes WHERE id=? AND user_id=?", [
    req.params.id,
    req.user.id,
  ]);
  res.json({ message: "Note deleted" });
});

router.get("/public/:slug", async (req, res) => {
  const [note] = await db.query("SELECT * FROM notes WHERE public_slug=?", [
    req.params.slug,
  ]);
  if (!note.length) return res.status(404).json({ message: "Not found" });
  res.json(note[0]);
});

module.exports = router;
