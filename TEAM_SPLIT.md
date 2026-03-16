# TEAM_SPLIT.md

## ข้อมูลกลุ่ม

* กลุ่มที่: S1-7
* รายวิชา: ENGSE207 Software Architecture

## รายชื่อสมาชิก

* 67543210025-2 นาย ชนสรณ์ บุตรถา
* 676543210071-6 นาย เบญจศรายุทธ น้อยอุบล

---

# การแบ่งงานหลัก

## สมาชิกคนที่ 1: นาย ชนสรณ์ บุตรถา

รับผิดชอบงานด้าน Frontend และ Infrastructure

หน้าที่หลัก

* พัฒนา **Frontend UI**

  * Login Page
  * Task Board UI
  * Task CRUD interaction
* พัฒนา **Log Service**

  * API สำหรับบันทึก log
  * API สำหรับดึง log
* ตั้งค่า **Nginx Reverse Proxy**

  * HTTPS configuration
  * SSL certificate
  * Reverse proxy ไปยัง services
* ตั้งค่า **Rate Limiting**
* สร้าง **Docker Compose orchestration**
* ทดสอบระบบผ่าน browser
* จัดเตรียม **screenshots สำหรับรายงาน**


---

## สมาชิกคนที่ 2: นาย เบญจศรายุทธ น้อยอุบล

รับผิดชอบงานด้าน Backend และ Security

หน้าที่หลัก

* พัฒนา **Auth Service**

  * Login API
  * JWT Token generation / verification
  * Middleware สำหรับ authentication
* ออกแบบ **Database Schema**

  * users
  * tasks
  * logs
* เขียน **Task Service API**

  * Create Task
  * Get Tasks
  * Update Task
  * Delete Task
* จัดการ **Database Integration (PostgreSQL)**
* ทดสอบ API ด้วย curl / Postman
* จัดการ **Docker configuration สำหรับ backend services**

---

# งานที่ดำเนินการร่วมกัน

สมาชิกทั้งสองคนได้ร่วมกันทำงานในส่วนสำคัญดังต่อไปนี้

* ออกแบบ **Microservices Architecture**
* ออกแบบโครงสร้างระบบ

  * Auth Service
  * Task Service
  * Log Service
  * Frontend
  * Reverse Proxy (Nginx)
* ทดสอบระบบแบบ **End-to-End**
* ตรวจสอบ **Security ของระบบ (JWT + HTTPS)**
* จัดทำ **README.md**
* จัดเตรียม **Screenshots สำหรับการส่ง Final Lab**

---

# เหตุผลในการแบ่งงาน

การแบ่งงานของกลุ่มนี้อิงตาม **Service Boundary ของ Microservices Architecture** เพื่อให้แต่ละสมาชิกสามารถรับผิดชอบส่วนของระบบได้อย่างชัดเจน

* สมาชิกคนที่ 1 เน้นงานด้าน **Frontend Interface และ Infrastructure Configuration**
* สมาชิกคนที่ 2 เน้นงานด้าน **Backend และ Security Implementation**

การแบ่งงานในลักษณะนี้ช่วยให้สามารถพัฒนาแต่ละ service ได้อย่างเป็นอิสระ และทำให้การรวมระบบ (Integration) เป็นไปอย่างมีประสิทธิภาพ

---

# สรุปการเชื่อมโยงงานของสมาชิก

งานของสมาชิกทั้งสองคนเชื่อมต่อกันผ่าน **REST API และ Docker Network**

* Auth Service ใช้สำหรับ **Authentication และ JWT Token**
* Task Service ใช้ JWT จาก Auth Service เพื่อ **ควบคุมการเข้าถึง API**
* Log Service รับ log จากทุก service เพื่อ **บันทึกเหตุการณ์ของระบบ**
* Frontend ติดต่อกับ backend services ผ่าน **Nginx Reverse Proxy**
* Nginx ทำหน้าที่เป็น **API Gateway และจัดการ HTTPS**

การทำงานร่วมกันของ services เหล่านี้ทำให้ระบบสามารถทำงานในรูปแบบ **Secure Microservices Architecture** ได้อย่างสมบูรณ์