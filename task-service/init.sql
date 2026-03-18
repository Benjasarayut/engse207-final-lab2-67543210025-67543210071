CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      VARCHAR(20) DEFAULT 'TODO',
  priority    VARCHAR(10) DEFAULT 'medium',
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL,
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);


-- Seed data
-- alice (user_id=3): 6 tasks
-- bob   (user_id=4): 3 tasks
-- admin (user_id=2): 4 tasks
INSERT INTO tasks (user_id, title, description, status, priority) VALUES
  (3, 'ออกแบบ UI หน้า Login',       'ใช้ Figma ออกแบบ mockup',                 'TODO',        'high'),
  (3, 'เขียน API สำหรับ Task CRUD', 'Express.js + PostgreSQL',                  'IN_PROGRESS', 'high'),
  (3, 'เขียน Unit Test',            'ครอบคลุม auth และ task service',           'TODO',        'medium'),
  (3, 'ตั้งค่า Docker Compose',     'รวม 3 services + Nginx gateway',           'DONE',        'high'),
  (3, 'Deploy บน Railway',          'push และ config environment vars',         'IN_PROGRESS', 'medium'),
  (3, 'เพิ่ม Logging Middleware',   'บันทึก request/response ทุก endpoint',     'TODO',        'low'),
  (4, 'เขียน README',               'อธิบาย architecture และวิธีรัน',          'TODO',        'low'),
  (4, 'ทำ Rate Limiting',           'ตั้งค่า Nginx limit_req_zone',             'DONE',        'medium'),
  (4, 'เพิ่ม Security Headers',     'X-Frame-Options, CSP, HSTS',              'DONE',        'high'),
  (2, 'ตรวจสอบ User Permissions',   'ตรวจสอบสิทธิ์ admin vs member',           'TODO',        'high'),
  (2, 'Monitor Performance',        'วัด response time และ error rate',        'TODO',        'medium'),
  (2, 'Setup CI/CD Pipeline',       'GitHub Actions สำหรับ auto deploy',       'IN_PROGRESS', 'high'),
  (2, 'Database Backup Strategy',   'ตั้งค่า backup อัตโนมัติทุกวัน',         'DONE',        'medium');