# INDIVIDUAL_REPORT_676543210071-6.md

## ข้อมูลผู้จัดทำ

* ชื่อ-นามสกุล: นาย ชนสรณ์ บุตรถา
* รหัสนักศึกษา: 676543210071-6
* กลุ่ม: S1-7

---

## ขอบเขตงานที่รับผิดชอบ

รับผิดชอบในส่วนของ **Frontend และ Infrastructure ของระบบ** ซึ่งประกอบด้วย

* การพัฒนา **Frontend UI**
* การพัฒนา **Log Service**
* การตั้งค่า **Nginx Reverse Proxy**
* การตั้งค่า **HTTPS**
* การจัดการ **Docker Compose**
* การทดสอบระบบผ่าน browser

---

## สิ่งที่ได้ดำเนินการด้วยตนเอง

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

## ปัญหาที่พบและวิธีการแก้ไข

### ปัญหา 1: การ redirect HTTP ไป HTTPS ทำให้ curl ได้ 301

ในช่วงทดสอบ API ผ่าน curl พบว่า request ถูก redirect ไป HTTPS

วิธีแก้ไข

* ใช้ option -L ในคำสั่ง curl เพื่อ follow redirect
* ใช้ option -k เพื่อข้าม certificate verification

### ปัญหา 2: Nginx ไม่สามารถ resolve service name ได้

ในช่วงแรก nginx ไม่สามารถเชื่อมต่อกับ service อื่นได้

วิธีแก้ไข

* ตรวจสอบ docker network
* ตรวจสอบชื่อ service ใน docker-compose.yml
* แก้ไข upstream configuration ใน nginx.conf

---

## สิ่งที่ได้เรียนรู้จากงานนี้

จากการพัฒนาระบบนี้ทำให้ได้เรียนรู้เรื่องสำคัญหลายด้าน เช่น

* การใช้ **Nginx เป็น Reverse Proxy**
* การตั้งค่า **HTTPS และ SSL Certificate**
* การทำงานของ **Docker Compose**
* การจัดการ communication ระหว่าง container
* การสร้าง **Frontend ที่เชื่อมต่อกับ Backend API**
* การทำระบบ **Logging สำหรับ microservices**

นอกจากนี้ยังได้เรียนรู้การออกแบบระบบที่มีหลาย service และการทำงานร่วมกันของทีมพัฒนา

---

## แนวทางการพัฒนาต่อไปใน Set 2

หากพัฒนาระบบต่อไปใน Set 2 สามารถปรับปรุงได้ดังนี้

* เพิ่ม **API Gateway**
* เพิ่มระบบ **Authentication ที่รองรับ OAuth หรือ SSO**
* ปรับปรุง frontend ให้เป็น **Single Page Application**
* เพิ่มระบบ **Monitoring เช่น Prometheus และ Grafana**
* เพิ่มระบบ **Centralized Log Management**

แนวทางเหล่านี้จะช่วยให้ระบบสามารถใช้งานในระดับ production ได้มากขึ้น