const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, optionalAuthenticateToken, requireAdmin } = require('../middleware/auth');

// Helper to determine achievement badge
function calculateBadge(score) {
  if (score >= 5) return 'Health Champion';
  if (score === 4) return 'Health Expert';
  if (score === 3) return 'Health Learner';
  if (score === 2) return 'Health Beginner';
  return 'Keep Learning';
}

// Get all quiz categories
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM quizzes ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Fetch quizzes error:', err);
    res.status(500).json({ success: false, message: 'Could not load quizzes.' });
  }
});

// Get questions for a quiz category (omits correct_option for secure testing)
router.get('/:id/questions', async (req, res) => {
  try {
    const quizId = parseInt(req.params.id) || 1;
    let [rows] = await db.query(
      `SELECT id, quiz_id, question_en, question_te,
              option_a_en, option_a_te,
              option_b_en, option_b_te,
              option_c_en, option_c_te,
              option_d_en, option_d_te
       FROM quiz_questions
       WHERE quiz_id = ?
       ORDER BY RAND()
       LIMIT 5`,
      [quizId]
    );

    if (!rows || rows.length === 0) {
      const [fallback] = await db.query(
        `SELECT id, quiz_id, question_en, question_te,
                option_a_en, option_a_te,
                option_b_en, option_b_te,
                option_c_en, option_c_te,
                option_d_en, option_d_te
         FROM quiz_questions
         LIMIT 5`
      );
      rows = fallback;
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'No questions found for this quiz.' });
    }

    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch quiz questions error:', err);
    res.status(500).json({ success: false, message: 'Error loading quiz questions.' });
  }
});

// Submit quiz answers & grade
router.post('/:id/submit', optionalAuthenticateToken, async (req, res) => {
  try {
    const quizId = req.params.id;
    const { participant_name, user_answers } = req.body;
    // user_answers format: { question_id: 'A' | 'B' | 'C' | 'D' }

    if (!user_answers || typeof user_answers !== 'object') {
      return res.status(400).json({ success: false, message: 'Answers object is required.' });
    }

    const questionIds = Object.keys(user_answers);
    if (questionIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No answers provided.' });
    }

    // Retrieve correct answers for these questions
    const [questions] = await db.query(
      `SELECT id, correct_option, explanation_en, explanation_te
       FROM quiz_questions
       WHERE id IN (?)`,
      [questionIds]
    );

    let score = 0;
    const review = [];

    questions.forEach(q => {
      const selected = user_answers[q.id];
      const isCorrect = selected && selected.toUpperCase() === q.correct_option.toUpperCase();
      if (isCorrect) score++;

      review.push({
        question_id: q.id,
        user_choice: selected,
        correct_option: q.correct_option,
        is_correct: isCorrect,
        explanation_en: q.explanation_en,
        explanation_te: q.explanation_te
      });
    });

    const badge = calculateBadge(score);
    const userId = req.user ? req.user.id : null;
    const participant = participant_name || (req.user ? req.user.name : 'Guest Participant');

    // Save result to quiz_results
    const [result] = await db.query(
      `INSERT INTO quiz_results (user_id, participant_name, quiz_id, score, total, badge)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, participant, quizId, score, questions.length, badge]
    );

    res.json({
      success: true,
      result_id: result.insertId,
      score,
      total: questions.length,
      badge,
      percentage: Math.round((score / questions.length) * 100),
      review
    });
  } catch (err) {
    console.error('Quiz grading error:', err);
    res.status(500).json({ success: false, message: 'Error grading quiz.' });
  }
});

// Get user's quiz history
router.get('/my-history', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT qr.*, q.title_en as quiz_title_en, q.title_te as quiz_title_te
       FROM quiz_results qr
       JOIN quizzes q ON qr.quiz_id = q.id
       WHERE qr.user_id = ?
       ORDER BY qr.completed_at DESC`,
      [req.user.id]
    );

    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch user quiz history error:', err);
    res.status(500).json({ success: false, message: 'Could not load quiz history.' });
  }
});

// Admin: Get all quiz results
router.get('/all-results', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT qr.*, q.title_en as quiz_title_en, q.title_te as quiz_title_te
       FROM quiz_results qr
       JOIN quizzes q ON qr.quiz_id = q.id
       ORDER BY qr.completed_at DESC`
    );

    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch all quiz results error:', err);
    res.status(500).json({ success: false, message: 'Error retrieving quiz records.' });
  }
});

module.exports = router;
