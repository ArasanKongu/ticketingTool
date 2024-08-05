import express from 'express';
import pool from './db';

const router = express.Router();

// // Example route to get all users
// router.get('/users', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM users');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Example route to add a new user
// router.post('/users', async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
//     res.json({ id: result.insertId, name, email });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;
