const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all health content (optional ?category=)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM health_content';
    const params = [];

    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }
    sql += ' ORDER BY id ASC';

    const [rows] = await db.query(sql, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch health content error:', err);
    res.status(500).json({ success: false, message: 'Could not load health content.' });
  }
});

// Get single content by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM health_content WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Content not found.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Fetch single content error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Admin: Add new health content
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category, title_en, title_te, summary_en, summary_te, content_en, content_te, image_url, author } = req.body;

    if (!category || !title_en || !title_te || !content_en || !content_te) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
    }

    const [result] = await db.query(
      `INSERT INTO health_content (category, title_en, title_te, summary_en, summary_te, content_en, content_te, image_url, author)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [category, title_en, title_te, summary_en || '', summary_te || '', content_en, content_te, image_url || null, author || 'CSP Health Team']
    );

    res.status(201).json({ success: true, message: 'Content created successfully!', id: result.insertId });
  } catch (err) {
    console.error('Create content error:', err);
    res.status(500).json({ success: false, message: 'Error creating content.' });
  }
});

// Admin: Update health content
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category, title_en, title_te, summary_en, summary_te, content_en, content_te, image_url, author } = req.body;

    await db.query(
      `UPDATE health_content
       SET category = ?, title_en = ?, title_te = ?, summary_en = ?, summary_te = ?, content_en = ?, content_te = ?, image_url = ?, author = ?
       WHERE id = ?`,
      [category, title_en, title_te, summary_en, summary_te, content_en, content_te, image_url, author, req.params.id]
    );

    res.json({ success: true, message: 'Content updated successfully!' });
  } catch (err) {
    console.error('Update content error:', err);
    res.status(500).json({ success: false, message: 'Error updating content.' });
  }
});

// Admin: Delete health content
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM health_content WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Content deleted successfully!' });
  } catch (err) {
    console.error('Delete content error:', err);
    res.status(500).json({ success: false, message: 'Error deleting content.' });
  }
});

module.exports = router;
