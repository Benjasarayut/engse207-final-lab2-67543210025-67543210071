const { verifyToken } = require('./jwtUtils');
const { pool } = require('../db/db');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    req.user = verifyToken(token);  // { sub, email, role, username }
    next();
  } catch (err) {
    // ส่ง log JWT error ไปยัง logs table
    pool.query(
      `INSERT INTO logs (level, event, user_id, message, meta)
       VALUES ($1, $2, $3, $4, $5)`,
      ['ERROR', 'JWT_INVALID', null, 'Invalid JWT token: ' + err.message, JSON.stringify({ error: err.message })]
    ).catch(() => {});
    return res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
};