# ENGSE207 Software Architecture
# Final Lab — ชุดที่ 2: Microservices Scale-Up + Cloud Deployment (Railway)

## 👥 รายชื่อสมาชิก
1. รหัสนักศึกษา: 67543210025-2 ชื่อ-นามสกุล: นาย ชนสรณ์ บุตรถา
2. รหัสนักศึกษา: 67543210071-6 ชื่อ-นามสกุล: นาย เบญจศรายุทธ  น้อยอุบล

---

## 🌐 URLs ของระบบบน Cloud (Railway)
- **Auth Service:** `https://auth-service-production-7268.up.railway.app/api/auth/health`
- **Task Service:** `https://task-service-production-747e.up.railway.app/api/tasks/health`
- **User Service:** `https://user-service-production-57b1.up.railway.app/api/users/health`
- **Frontend / Client:** `http://172.22.130.4:8080/`

## ✅ สถานะ Set 2
- งาน Set 2 เสร็จสมบูรณ์ (ครบตามข้อกำหนดหลัก 3 services + 3 databases + deployment)

---

## 📝 Project Overview (ภาพรวมของระบบ)
โปรเจกต์นี้เป็นการต่อยอดจาก Final Lab Set 1 โดยมีการขยายสถาปัตยกรรม (Scale-Up) ดังนี้:
1. **เพิ่ม User Service:** สำหรับจัดการข้อมูลโปรไฟล์ผู้ใช้โดยเฉพาะ
2. **ปรับเป็น Database-per-Service:** แยกฐานข้อมูลออกจากกันเป็น 3 ก้อน ได้แก่ `auth-db`, `task-db` และ `user-db` เพื่อลดการพึ่งพากันระหว่าง Service (Loose Coupling)
3. **เพิ่มระบบ Register:** เพิ่ม API สำหรับสมัครสมาชิกใน Auth Service
4. **Cloud Deployment:** นำระบบทั้งหมดขึ้นไปรันบน Railway Cloud

---

## 🏛️ Architecture Diagram (Cloud Version)

```text
Browser / Postman / Frontend Client
       │
       ├─(Gateway Strategy: Option A)─┐
       │                              │
       ▼                              ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│ 🔑 Auth Service  │         │ 📋 Task Service  │         │ 👤 User Service  │
│ (Railway URL 1)  │         │ (Railway URL 2)  │         │ (Railway URL 3)  │
│                  │         │                  │         │                  │
│ • /register      │         │ • CRUD Tasks     │         │ • /me (Profile)  │
│ • /login         │         │ • JWT Guard      │         │ • / (Admin List) │
│ • /me            │         │                  │         │ • JWT Guard      │
└────────┬─────────┘         └────────┬─────────┘         └────────┬─────────┘
         │                            │                            │
         ▼                            ▼                            ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│   🗄️ auth-db     │         │   🗄️ task-db     │         │   🗄️ user-db     │
│ (Railway PG 1)   │         │ (Railway PG 2)   │         │ (Railway PG 3)   │
│ - users          │         │ - tasks          │         │ - user_profiles  │
│ - logs           │         │ - logs           │         │ - logs           │
└──────────────────┘         └──────────────────┘         └──────────────────┘
```
* JWT_SECRET ใช้ค่าเดียวกันทุก Service เพื่อให้สามารถ Verify Token ข้ามระบบได้
การออกแบบ 3 Services และ 3 Databases
Auth Service + auth-db: ดูแลการจัดการรหัสผ่านผู้ใช้ บันทึกข้อมูลตั้งต้น (Email, Username, Password Hash) และออก JWT Token

Task Service + task-db: ดูแลเรื่องงาน (Tasks) ล้วนๆ โดยบันทึกผู้สร้างงานด้วย user_id (เป็น Logical Reference อ้างอิงถึง ID ใน auth-db)

User Service + user-db: ดูแลข้อมูลโปรไฟล์ (Display Name, Bio, Avatar) โดยมีระบบสร้าง Profile ให้อัตโนมัติเมื่อ User ล็อกอินครั้งแรก

🚪 Gateway Strategy ที่เลือกใช้
เลือกใช้: Option A (Frontend เรียก URL ของแต่ละ Service โดยตรง)

เหตุผล: เป็นวิธีที่ตรงไปตรงมาและลดความซับซ้อนในการทำ API Gateway แยกอีกหนึ่ง Service บน Railway ทำให้ดูแลรักษาง่ายขึ้นสำหรับโจทย์ระดับนี้ โดยทาง Frontend จะมีการตั้งค่า config.js เพื่อชี้ URL ไปยัง Service ต่างๆ โดยตรง

💻 วิธีการรันระบบบน Local ด้วย Docker Compose
ตรวจสอบว่ามีไฟล์ docker-compose.yml และ .env อยู่ที่หน้า Root Directory

เปิด Terminal แล้วรันคำสั่ง:

Bash
docker compose up --build -d
ระบบจะสร้างคอนเทนเนอร์ 6 ตัว (3 Services + 3 Databases)

ทดสอบ API ผ่าน http://localhost:3001 (Auth), 3002 (Task), 3003 (User)

☁️ วิธีการ Deploy ขึ้น Railway
อัปโหลดโค้ดทั้งหมดขึ้น GitHub Repository

สร้าง Project ใหม่ใน Railway เลือก Deploy from GitHub repo

สร้าง Service ใหม่ 3 ตัว โดยกำหนด Root Directory ไปที่โฟลเดอร์ auth-service, task-service, และ user-service

เพิ่ม Plugin PostgreSQL 3 ก้อน และตั้งชื่อให้ตรงกับแต่ละ Service

เชื่อมต่อฐานข้อมูลโดยกำหนด Environment Variables ตามด้านล่าง

รันคำสั่ง SQL สร้างตาราง (จากไฟล์ init.sql ของแต่ละ service) ผ่านแท็บ Data ของ PostgreSQL ใน Railway

🔐 Environment Variables ที่ใช้ (Railway ENV)
แต่ละ Service ต้องตั้งค่าตัวแปรในหน้า Variables ของ Railway ดังนี้:
```
Auth Service

DATABASE_URL: ${{auth-db.DATABASE_URL}}

JWT_SECRET: [ใส่ Secret Key ของคุณ]

JWT_EXPIRES_IN: 1h

PORT: 3001

Task Service

DATABASE_URL: ${{task-db.DATABASE_URL}}

JWT_SECRET: [ต้องตรงกับ Auth Service]

PORT: 3002

User Service

DATABASE_URL: ${{user-db.DATABASE_URL}}

JWT_SECRET: [ต้องตรงกับ Auth Service]

PORT: 3003
```
🧪 วิธีทดสอบระบบ (Testing with cURL)
ตัวอย่างการทดสอบระบบบางส่วน (แก้ไข [AUTH_URL] เป็น URL จริงของ Railway):

1. สมัครสมาชิกใหม่ (Register)
```
Bash
curl -X POST https://[AUTH_URL]/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser", "email":"testuser@example.com", "password":"123456"}'
```
2. เข้าสู่ระบบ (Login) เพื่อเอา Token
```
Bash
curl -X POST https://[AUTH_URL]/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com", "password":"123456"}'
(หมายเหตุ: ทดสอบ Endpoint อื่นๆ เพิ่มเติมได้ในโฟลเดอร์ screenshots/)
```
⚠️ Known Limitations (ข้อจำกัดของระบบ)
ไม่มี Foreign Key ข้าม Database: เนื่องจากแยกฐานข้อมูลออกจากกันอย่างเด็ดขาด (Database-per-Service) การอ้างอิงข้อมูล เช่น user_id ใน task-db จึงเป็นเพียง Logical Reference เท่านั้น หากมีการลบผู้ใช้ใน auth-db จะไม่มีการ Cascade Delete ข้อมูลใน task-db โดยอัตโนมัติที่ระดับฐานข้อมูล

Data Duplication: มีการเก็บข้อมูล Username และ Email ไว้ในหลาย Database (เช่น ใน auth-db และ user-db) เพื่อลดการยิง API ข้าม Service บ่อยๆ ซึ่งอาจทำให้ต้องสร้างระบบซิงค์ข้อมูล (Eventual Consistency) ในอนาคตหากมีการแก้ไขข้อมูลพื้นฐานเหล่านี้
