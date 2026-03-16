const express       = require('express');
const { pool }      = require('../db/db');
const requireAuth   = require('../middleware/authMiddleware');

const router = express.Router();

// Helper: ส่ง log
async function logEvent({ level, event, userId, message, meta }) {
  try {
    await pool.query(
      `INSERT INTO logs (level, event, user_id, message, meta)
       VALUES ($1, $2, $3, $4, $5)`,
      [level, event, userId, message, JSON.stringify(meta)]
    );
  } catch (err) {
    console.error('Log error:', err.message);
  }
}

// GET /api/users/health
router.get('/health', (_, res) => res.json({ status:'ok', service:'user-service' }));

// ทุก route ยกเว้น health ต้องผ่าน JWT middleware
router.use(requireAuth);

// Helper: สร้าง profile เริ่มต้นถ้ายังไม่มี
async function ensureProfile(userId, userInfo) {
  const existing = await pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);
  if (existing.rows.length > 0) return existing.rows[0];

  // สร้าง profile ใหม่
  const result = await pool.query(
    `INSERT INTO user_profiles (user_id, username, email, role, display_name, bio, avatar_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, userInfo.username, userInfo.email, userInfo.role, userInfo.username, '', '']
  );

  await logEvent({
    level: 'INFO',
    event: 'PROFILE_CREATED',
    userId,
    message: `Auto-created profile for user ${userInfo.username}`,
    meta: { userId, username: userInfo.username }
  });

  return result.rows[0];
}

// GET /api/users/me — ดู profile ของตนเอง
router.get('/me', async (req, res) => {
  try {
    const profile = await ensureProfile(req.user.sub, req.user);

    res.json({ profile });
  } catch (err) {
    console.error('[USER] Get me error:', err.message);
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
       WHERE user_id = $4
       RETURNING *`,
      [display_name || '', bio || '', avatar_url || '', req.user.sub]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    await logEvent({
      level: 'INFO',
      event: 'PROFILE_UPDATED',
      userId: req.user.sub,
      message: `User ${req.user.username} updated profile`,
      meta: { userId: req.user.sub, username: req.user.username }
    });

    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error('[USER] Update me error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users — ดูรายชื่อผู้ใช้ทั้งหมด (admin only)
router.get('/', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin only' });
  }

  try {
    const result = await pool.query(
      `SELECT up.user_id, up.username, up.email, up.role, up.display_name, up.bio, up.avatar_url, up.updated_at
       FROM user_profiles up
       ORDER BY up.updated_at DESC`
    );

    res.json({ users: result.rows });
  } catch (err) {
    console.error('[USER] Get users error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;