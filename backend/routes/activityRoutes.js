const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all 8-week CSP activities
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM activities ORDER BY week_number ASC');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch activities error:', err);
    res.status(500).json({ success: false, message: 'Could not load activities.' });
  }
});

// Get specific activity
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM activities WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Activity not found.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Fetch activity error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Admin: Add new activity
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { week_number, title_en, title_te, location_en, location_te, description_en, description_te, target_audience, participants_count, activity_date, image_url } = req.body;

    const [result] = await db.query(
      `INSERT INTO activities (week_number, title_en, title_te, location_en, location_te, description_en, description_te, target_audience, participants_count, activity_date, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [week_number, title_en, title_te, location_en, location_te, description_en, description_te, target_audience, participants_count || 0, activity_date || null, image_url || null]
    );

    res.status(201).json({ success: true, message: 'Activity added successfully!', id: result.insertId });
  } catch (err) {
    console.error('Add activity error:', err);
    res.status(500).json({ success: false, message: 'Failed to add activity.' });
  }
});

// Admin: Update activity
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { week_number, title_en, title_te, location_en, location_te, description_en, description_te, target_audience, participants_count, activity_date, image_url } = req.body;

    await db.query(
      `UPDATE activities
       SET week_number = ?, title_en = ?, title_te = ?, location_en = ?, location_te = ?,
           description_en = ?, description_te = ?, target_audience = ?, participants_count = ?, activity_date = ?, image_url = ?
       WHERE id = ?`,
      [week_number, title_en, title_te, location_en, location_te, description_en, description_te, target_audience, participants_count, activity_date, image_url, req.params.id]
    );

    res.json({ success: true, message: 'Activity updated successfully!' });
  } catch (err) {
    console.error('Update activity error:', err);
    res.status(500).json({ success: false, message: 'Failed to update activity.' });
  }
});

// Admin: Delete activity
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM activities WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Activity deleted successfully!' });
  } catch (err) {
    console.error('Delete activity error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete activity.' });
  }
});

module.exports = router;
