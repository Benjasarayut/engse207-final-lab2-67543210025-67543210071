-- ═══════════════════════════════════════════════
--  USER PROFILES TABLE (user-service ใช้)
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS user_profiles (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER UNIQUE NOT NULL,
  username     VARCHAR(50),
  email        VARCHAR(100),
  role         VARCHAR(20) DEFAULT 'member',
  display_name VARCHAR(100),
  bio          TEXT,
  avatar_url   VARCHAR(255),
  updated_at   TIMESTAMP DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
--  LOGS TABLE (user-service ใช้)
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL       PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL    CHECK (level IN ('INFO','WARN','ERROR')),
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP    DEFAULT NOW()
);

-- Index สำหรับ query เร็ว
CREATE INDEX IF NOT EXISTS idx_logs_level      ON logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at DESC);