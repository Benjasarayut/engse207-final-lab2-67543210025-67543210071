# INDIVIDUAL_REPORT_67543210025-2.md

## ข้อมูลผู้จัดทำ

* ชื่อ-นามสกุล: นาย เบญจศรายุทธ น้อยอุบล
* รหัสนักศึกษา: 676543210071-6
* กลุ่ม: S1-7

---

## ขอบเขตงานที่รับผิดชอบ

ในโครงงาน Final Lab นี้ รับผิดชอบในส่วนของ **Backend Services และระบบ Authentication** ซึ่งประกอบด้วย

* การพัฒนา **Auth Service**
* การพัฒนา **Task Service**
* การออกแบบ **Database Schema**
* การจัดการ **JWT Authentication**
* การเชื่อมต่อ **PostgreSQL Database**
* การทดสอบ API ผ่าน curl และ browser

---

## สิ่งที่ได้ดำเนินการด้วยตนเอง

ได้ดำเนินการพัฒนาในส่วนสำคัญดังต่อไปนี้

* พัฒนา **Auth Service**

  * สร้าง API สำหรับ login
  * สร้าง JWT token หลังจาก login สำเร็จ
  * เขียน middleware สำหรับ verify token
  * เพิ่มระบบ logging สำหรับ login success และ login failed

* พัฒนา **Task Service**

  * สร้าง API สำหรับจัดการ task ได้แก่

    * Create Task
    * Get Tasks
    * Update Task
    * Delete Task
  * เพิ่ม middleware สำหรับตรวจสอบ JWT ก่อนเข้าถึง API

* ออกแบบ **Database Schema**

  * ตาราง users
  * ตาราง tasks
  * ตาราง logs

* เชื่อมต่อ service กับ **PostgreSQL Database**

* ทดสอบ API ด้วย **curl และ browser**

---

## ปัญหาที่พบและวิธีการแก้ไข

### ปัญหา 1: Docker container ไม่สามารถเชื่อมต่อฐานข้อมูลได้

ในช่วงแรก service ไม่สามารถเชื่อมต่อ PostgreSQL ได้ เนื่องจากชื่อ host ใน configuration ไม่ตรงกับชื่อ container

วิธีแก้ไข

* ตรวจสอบ docker-compose.yml
* ใช้ชื่อ service `postgres` เป็น host ใน connection string
* restart container ใหม่

### ปัญหา 2: การ login ไม่สำเร็จเนื่องจาก bcrypt hash ไม่ถูกต้อง

ในขั้นตอน seed database มีการใช้ placeholder hash ทำให้การตรวจสอบ password ด้วย bcrypt.compare ไม่ผ่าน

วิธีแก้ไข

* สร้าง bcrypt hash ใหม่ด้วยคำสั่ง node
* แก้ไขค่าในไฟล์ init.sql
* reset database ด้วย docker compose down -v

---

## สิ่งที่ได้เรียนรู้จากงานนี้

จากการพัฒนาระบบนี้ทำให้ได้เรียนรู้แนวคิดสำคัญของ Software Architecture ได้แก่

* การออกแบบระบบแบบ **Microservices Architecture**
* การใช้ **JWT (JSON Web Token)** สำหรับ authentication
* การแยก service ตามหน้าที่ เช่น auth-service, task-service และ log-service
* การใช้ **Docker และ Docker Compose** เพื่อจัดการ service หลายตัว
* การเชื่อมต่อ service ผ่าน **REST API**
* การใช้ **PostgreSQL เป็น shared database**

นอกจากนี้ยังได้เรียนรู้การ debug ปัญหาในระบบ distributed service และการทำงานร่วมกันเป็นทีม

---

## แนวทางการพัฒนาต่อไปใน Set 2

หากต้องพัฒนาระบบนี้ต่อไปใน Set 2 สามารถปรับปรุงระบบได้ดังนี้

* แยกฐานข้อมูลของแต่ละ service ออกจากกัน เพื่อลด coupling
* เพิ่ม **API Gateway** สำหรับจัดการ routing และ security
* เพิ่มระบบ **Centralized Logging**
* ใช้ **Container orchestration เช่น Kubernetes**
* เพิ่มระบบ **Monitoring และ Health Check**

การปรับปรุงเหล่านี้จะช่วยให้ระบบมี scalability และ reliability ที่สูงขึ้น