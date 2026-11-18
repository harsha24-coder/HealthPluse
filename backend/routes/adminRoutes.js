const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// All admin routes require admin privileges
router.use(authenticateToken, requireAdmin);

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [[{ totalUsers }]] = await db.query('SELECT COUNT(*) as totalUsers FROM users WHERE role = "user"');
    const [[{ totalSurveys }]] = await db.query('SELECT COUNT(*) as totalSurveys FROM survey_responses');
    const [[{ totalQuizzes }]] = await db.query('SELECT COUNT(*) as totalQuizzes FROM quiz_results');
    const [[{ totalFeedback }]] = await db.query('SELECT COUNT(*) as totalFeedback FROM feedback');
    const [[{ avgRating }]] = await db.query('SELECT COALESCE(AVG(rating), 0) as avgRating FROM feedback');
    const [[{ totalActivities }]] = await db.query('SELECT COUNT(*) as totalActivities FROM activities');

    // Recent activity logs
    const [recentSurveys] = await db.query(
      'SELECT id, participant_name, area, submitted_at FROM survey_responses ORDER BY submitted_at DESC LIMIT 5'
    );
    const [recentQuizzes] = await db.query(
      'SELECT id, participant_name, score, total, badge, completed_at FROM quiz_results ORDER BY completed_at DESC LIMIT 5'
    );

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalSurveys,
        totalQuizzes,
        totalFeedback,
        avgRating: parseFloat(Number(avgRating).toFixed(1)),
        totalActivities
      },
      recentSurveys,
      recentQuizzes
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ success: false, message: 'Could not load administrative stats.' });
  }
});

// Get registered users list
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, age, gender, area, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ success: false, message: 'Error retrieving users.' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    // Prevent deleting self
    if (parseInt(req.params.id) === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own admin account.' });
    }

    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete user.' });
  }
});

module.exports = router;
