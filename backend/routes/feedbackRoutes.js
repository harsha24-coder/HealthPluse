const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { optionalAuthenticateToken, authenticateToken, requireAdmin } = require('../middleware/auth');

// Submit feedback
router.post('/', optionalAuthenticateToken, async (req, res) => {
  try {
    const { name, email, rating, category, comments } = req.body;

    if (!name || !rating || !comments) {
      return res.status(400).json({ success: false, message: 'Name, rating (1-5), and comments are required.' });
    }

    const userId = req.user ? req.user.id : null;

    const [result] = await db.query(
      `INSERT INTO feedback (user_id, name, email, rating, category, comments)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, name, email || (req.user ? req.user.email : null), rating, category || 'General', comments]
    );

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully! Thank you for your valuable feedback.',
      feedbackId: result.insertId
    });
  } catch (err) {
    console.error('Feedback submission error:', err);
    res.status(500).json({ success: false, message: 'Could not submit feedback.' });
  }
});

// Get all feedback (public or admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM feedback ORDER BY created_at DESC');

    // Calculate average rating
    const avgRating = rows.length > 0
      ? (rows.reduce((sum, item) => sum + item.rating, 0) / rows.length).toFixed(1)
      : '5.0';

    res.json({
      success: true,
      count: rows.length,
      averageRating: parseFloat(avgRating),
      data: rows
    });
  } catch (err) {
    console.error('Fetch feedback error:', err);
    res.status(500).json({ success: false, message: 'Error retrieving feedback.' });
  }
});

// Admin: Delete feedback
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM feedback WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Feedback entry deleted.' });
  } catch (err) {
    console.error('Delete feedback error:', err);
    res.status(500).json({ success: false, message: 'Error deleting feedback.' });
  }
});

module.exports = router;
