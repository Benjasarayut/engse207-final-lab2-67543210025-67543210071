# INDIVIDUAL REPORT

## Set 2: สรุปสิ่งที่ทำในงานนี้
- ขยายระบบจาก Set 1 เป็น 3 Services (Auth / Task / User)
- ใช้ Database-per-Service (auth-db, task-db, user-db)
- Deploy บริการบน Railway (Auth, Task, User)
- **สถานะ:** เสร็จสมบูรณ์แล้ว

## นาย ชนสรณ์ บุตรถา (67543210025)

### ข้อมูลผู้จัดทำ
* ชื่อ-นามสกุล: นาย ชนสรณ์ บุตรถา
* รหัสนักศึกษา: 67543210025
* กลุ่ม: S1-7

---

### ขอบเขตงานที่รับผิดชอบ
รับผิดชอบในส่วนของ **Frontend และ Infrastructure ของระบบ** ซึ่งประกอบด้วย

* การพัฒนา **Frontend UI**
* การพัฒนา **Log Service**
* การตั้งค่า **Nginx Reverse Proxy**
* การตั้งค่า **HTTPS**
* การจัดการ **Docker Compose**
* การทดสอบระบบผ่าน browser

---

### สิ่งที่ได้ดำเนินการด้วยตนเอง
งานที่ดำเนินการมีดังนี้

* พัฒนา **Frontend Interface**
  * หน้า Login
  * หน้า Task Board
  * แสดงรายการ tasks
  * ปุ่ม create, update และ delete tasks
* พัฒนา **Log Service**
  * API สำหรับบันทึก log จาก services ต่าง ๆ
  * API สำหรับดึงข้อมูล log
  * รองรับ log ระดับ INFO, WARN และ ERROR
* ตั้งค่า **Nginx Reverse Proxy**
  * route request ไปยัง auth-service, task-service และ log-service
  * ตั้งค่า HTTPS ด้วย self-signed certificate
* ตั้งค่า **Rate Limiting**
  * จำกัดจำนวน request ต่อช่วงเวลา
  * ป้องกันการโจมตีแบบ brute force
* เขียน **Docker Compose configuration**
  * จัดการ container ทั้งหมดในระบบ
  * ตั้งค่า network สำหรับ service communication
* ทดสอบระบบผ่าน browser และตรวจสอบผลลัพธ์ผ่าน screenshot

---

### ปัญหาที่พบและวิธีการแก้ไข

#### ปัญหา 1: การ redirect HTTP ไป HTTPS ทำให้ curl ได้ 301
ในช่วงทดสอบ API ผ่าน curl พบว่า request ถูก redirect ไป HTTPS

**วิธีแก้ไข**
* ใช้ option `-L` ในคำสั่ง curl เพื่อ follow redirect
* ใช้ option `-k` เพื่อข้าม certificate verification

#### ปัญหา 2: Nginx ไม่สามารถ resolve service name ได้
ในช่วงแรก nginx ไม่สามารถเชื่อมต่อกับ service อื่นได้

**วิธีแก้ไข**
* ตรวจสอบ docker network
* ตรวจสอบชื่อ service ใน docker-compose.yml
* แก้ไข upstream configuration ใน nginx.conf

---

### สิ่งที่ได้เรียนรู้จากงานนี้
* การใช้ **Nginx เป็น Reverse Proxy**
* การตั้งค่า **HTTPS และ SSL Certificate**
* การทำงานของ **Docker Compose**
* การจัดการ communication ระหว่าง container
* การสร้าง **Frontend ที่เชื่อมต่อกับ Backend API**
* การทำระบบ **Logging สำหรับ microservices**
* การออกแบบระบบที่มีหลาย service และการทำงานร่วมกันของทีมพัฒนา

---

### แนวทางการพัฒนาต่อไปใน Set 2
* เพิ่ม **API Gateway** เพื่อจัดการ routing, security และ rate limiting
* เพิ่มระบบ **Authentication ที่รองรับ OAuth หรือ SSO**
* ปรับปรุง frontend ให้เป็น **Single Page Application**
* เพิ่มระบบ **Monitoring เช่น Prometheus และ Grafana**
* เพิ่มระบบ **Centralized Log Management**

---

## นาย เบญจศรายุทธ น้อยอุบล (67543210071)

### ข้อมูลผู้จัดทำ
* ชื่อ-นามสกุล: นาย เบญจศรายุทธ น้อยอุบล
* รหัสนักศึกษา: 67543210071
* กลุ่ม: S1-7

---

### ขอบเขตงานที่รับผิดชอบ
รับผิดชอบในส่วนของ **Backend Services และระบบ Authentication** ซึ่งประกอบด้วย

* การพัฒนา **Auth Service**
* การพัฒนา **Task Service**
* การออกแบบ **Database Schema**
* การจัดการ **JWT Authentication**
* การเชื่อมต่อ **PostgreSQL Database**
* การทดสอบ API ผ่าน curl และ browser

---

### สิ่งที่ได้ดำเนินการด้วยตนเอง
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

### ปัญหาที่พบและวิธีการแก้ไข
#### ปัญหา 1: Docker container ไม่สามารถเชื่อมต่อฐานข้อมูลได้
ในช่วงแรก service ไม่สามารถเชื่อมต่อ PostgreSQL ได้ เนื่องจากชื่อ host ใน configuration ไม่ตรงกับชื่อ container

**วิธีแก้ไข**
* ตรวจสอบ docker-compose.yml
* ใช้ชื่อ service `postgres` เป็น host ใน connection string
* restart container ใหม่

#### ปัญหา 2: การ login ไม่สำเร็จเนื่องจาก bcrypt hash ไม่ถูกต้อง
ในขั้นตอน seed database มีการใช้ placeholder hash ทำให้การตรวจสอบ password ด้วย bcrypt.compare ไม่ผ่าน

**วิธีแก้ไข**
* สร้าง bcrypt hash ใหม่ด้วยคำสั่ง node
* แก้ไขค่าในไฟล์ init.sql
* reset database ด้วย docker compose down -v

---

### สิ่งที่ได้เรียนรู้จากงานนี้
* การออกแบบระบบแบบ **Microservices Architecture**
* การใช้ **JWT (JSON Web Token)** สำหรับ authentication
* การแยก service ตามหน้าที่ เช่น auth-service, task-service และ log-service
* การใช้ **Docker และ Docker Compose** เพื่อจัดการ service หลายตัว
* การเชื่อมต่อ service ผ่าน **REST API**
* การใช้ **PostgreSQL เป็น shared database**
* การ debug ปัญหาในระบบ distributed service และการทำงานร่วมกันเป็นทีม

---

### แนวทางการพัฒนาต่อไปใน Set 2
* แยกฐานข้อมูลของแต่ละ service ออกจากกัน เพื่อลด coupling
* เพิ่ม **API Gateway** สำหรับจัดการ routing และ security
* เพิ่มระบบ **Centralized Logging**
* ใช้ **Container orchestration เช่น Kubernetes**
* เพิ่มระบบ **Monitoring และ Health Check**

---
