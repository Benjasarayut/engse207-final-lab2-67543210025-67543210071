const express       = require('express');
const { pool }      = require('../db/db');
const requireAuth   = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/users/health
router.get('/health', (_, res) => res.json({ status:'ok', service:'user-service' }));

// ทุก route ยกเว้น health ต้องผ่าน JWT middleware
router.use(requireAuth);

// GET /api/users/me — ดู profile ของตนเอง
router.get('/me', async (req, res) => {
  try {
    let result = await pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [req.user.sub]);
    let profile = result.rows[0];

    if (!profile) {
      // สร้าง profile เริ่มต้น
      const insertResult = await pool.query(
        `INSERT INTO user_profiles (user_id, username, email, role)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [req.user.sub, req.user.username, req.user.email, req.user.role]
      );
      profile = insertResult.rows[0];
    }

    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/users/me — แก้ไข profile ของตนเอง
router.put('/me', async (req, res) => {
  const { display_name, bio, avatar_url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE user_profiles
       SET display_name = $1, bio = $2, avatar_url = $3, updated_at = NOW()
       WHERE user_id = $4 RETURNING *`,
      [display_name, bio, avatar_url, req.user.sub]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users — ดูรายชื่อผู้ใช้ทั้งหมด (admin only)
router.get('/', requireAuth.requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM user_profiles ORDER BY updated_at DESC');
    res.json({ users: result.rows, count: result.rowCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;