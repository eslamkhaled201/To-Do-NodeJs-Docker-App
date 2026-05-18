const express = require('express');
const pool    = require('../db');
const auth    = require('../middleware/auth');

const router = express.Router();

// All routes below require a valid JWT
router.use(auth);

// GET /api/todos — get current user's todos
router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json(rows);
});

// POST /api/todos — create a todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const [result] = await pool.query(
    'INSERT INTO todos (user_id, title) VALUES (?, ?)',
    [req.user.id, title]
  );
  res.status(201).json({ id: result.insertId, user_id: req.user.id, title, completed: false });
});

// PUT /api/todos/:id — toggle completed
router.put('/:id', async (req, res) => {
  const { completed } = req.body;
  await pool.query(
    'UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?',
    [completed, req.params.id, req.user.id]
  );
  res.json({ success: true });
});

// DELETE /api/todos/:id
router.delete('/:id', async (req, res) => {
  await pool.query(
    'DELETE FROM todos WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id]
  );
  res.json({ success: true });
});

module.exports = router;