const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, optionalAuthenticateToken, requireAdmin } = require('../middleware/auth');

// Get all 17 survey questions grouped by section
router.get('/questions', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM survey_questions ORDER BY section_number ASC, order_seq ASC');

    // Parse options JSON if string
    const questions = rows.map(q => ({
      ...q,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
    }));

    res.json({ success: true, count: questions.length, data: questions });
  } catch (err) {
    console.error('Fetch survey questions error:', err);
    res.status(500).json({ success: false, message: 'Could not load survey questions.' });
  }
});

// Submit a survey response
router.post('/submit', optionalAuthenticateToken, async (req, res) => {
  try {
    const { participant_name, age, gender, area, answers } = req.body;

    if (!participant_name || !answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ success: false, message: 'Participant name and survey answers are required.' });
    }

    const userId = req.user ? req.user.id : null;
    const answersJson = typeof answers === 'string' ? answers : JSON.stringify(answers);

    const [result] = await db.query(
      `INSERT INTO survey_responses (user_id, participant_name, age, gender, area, answers)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, participant_name, age || null, gender || 'Other', area || '10th Ward, Tadepalligudem', answersJson]
    );

    res.status(201).json({
      success: true,
      message: 'Survey submitted successfully! Thank you for supporting the Community Service Project.',
      responseId: result.insertId
    });
  } catch (err) {
    console.error('Submit survey error:', err);
    res.status(500).json({ success: false, message: 'Could not record survey response.' });
  }
});

// Get user's own survey submissions
router.get('/my-surveys', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, participant_name, age, gender, area, submitted_at FROM survey_responses WHERE user_id = ? ORDER BY submitted_at DESC',
      [req.user.id]
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch user surveys error:', err);
    res.status(500).json({ success: false, message: 'Error retrieving user surveys.' });
  }
});

// Admin: Get all survey responses
router.get('/all-responses', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM survey_responses ORDER BY submitted_at DESC'
    );

    const parsedRows = rows.map(r => ({
      ...r,
      answers: typeof r.answers === 'string' ? JSON.parse(r.answers) : r.answers
    }));

    res.json({ success: true, count: parsedRows.length, data: parsedRows });
  } catch (err) {
    console.error('Fetch all surveys error:', err);
    res.status(500).json({ success: false, message: 'Error retrieving surveys.' });
  }
});

module.exports = router;
