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
INSERT INTO tasks (user_id, title, description, status, priority) VALUES
  (1, 'ออกแบบ UI หน้า Login',      'ใช้ Figma ออกแบบ mockup',           'TODO',        'high'),
  (1, 'เขียน API สำหรับ Task CRUD','Express.js + PostgreSQL',            'IN_PROGRESS', 'high'),
  (1, 'เขียน Unit Test',            'ครอบคลุม auth และ task service',    'TODO',        'medium'),
  (1, 'ตั้งค่า Docker Compose',     'รวม 3 services + Nginx gateway',    'DONE',        'high'),
  (1, 'Deploy บน Railway',          'push และ config environment vars',  'IN_PROGRESS', 'medium'),
  (2, 'เขียน README',               'อธิบาย architecture และวิธีรัน',   'TODO',        'low'),
  (2, 'ทำ Rate Limiting',           'ตั้งค่า Nginx limit_req_zone',      'DONE',        'medium'),
  (2, 'เพิ่ม Security Headers',     'X-Frame-Options, CSP, HSTS',        'DONE',        'high');
