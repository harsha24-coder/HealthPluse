const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// Get all reminders for logged in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM reminders WHERE user_id = ? ORDER BY target_time ASC',
      [req.user.id]
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch reminders error:', err);
    res.status(500).json({ success: false, message: 'Could not load reminders.' });
  }
});

// Add a new reminder
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title_en, title_te, reminder_type, frequency, target_time } = req.body;

    if (!title_en || !reminder_type || !target_time) {
      return res.status(400).json({ success: false, message: 'Title, type, and target time are required.' });
    }

    const [result] = await db.query(
      `INSERT INTO reminders (user_id, title_en, title_te, reminder_type, frequency, target_time)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, title_en, title_te || title_en, reminder_type, frequency || 'Daily', target_time]
    );

    res.status(201).json({
      success: true,
      message: 'Reminder added successfully!',
      reminderId: result.insertId
    });
  } catch (err) {
    console.error('Add reminder error:', err);
    res.status(500).json({ success: false, message: 'Error adding reminder.' });
  }
});

// Toggle reminder active/inactive
router.patch('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    await db.query(
      'UPDATE reminders SET is_active = NOT is_active WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    res.json({ success: true, message: 'Reminder status updated!' });
  } catch (err) {
    console.error('Toggle reminder error:', err);
    res.status(500).json({ success: false, message: 'Error updating reminder.' });
  }
});

// Delete reminder
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await db.query(
      'DELETE FROM reminders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    res.json({ success: true, message: 'Reminder deleted.' });
  } catch (err) {
    console.error('Delete reminder error:', err);
    res.status(500).json({ success: false, message: 'Error deleting reminder.' });
  }
});

module.exports = router;
