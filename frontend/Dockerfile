# ===== Dockerfile =====
# Static frontend served by Nginx
# Build: docker build -t frontend .
# Run:   docker run -p 8080:80 frontend

FROM nginx:1.25-alpine

COPY index.html   /usr/share/nginx/html/index.html
COPY profile.html /usr/share/nginx/html/profile.html
COPY config.js    /usr/share/nginx/html/config.js
COPY nginx.conf   /etc/nginx/conf.d/default.conf

# สร้าง env.js ที่ชี้ไปยัง localhost (browser เรียกผ่าน localhost เสมอ)
RUN echo 'window.ENV_AUTH_URL = "http://localhost:3001";' >  /usr/share/nginx/html/env.js && \
    echo 'window.ENV_TASK_URL = "http://localhost:3002";' >> /usr/share/nginx/html/env.js && \
    echo 'window.ENV_USER_URL = "http://localhost:3003";' >> /usr/share/nginx/html/env.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]