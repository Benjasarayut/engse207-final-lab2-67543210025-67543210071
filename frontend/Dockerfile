FROM nginx:1.25-alpine

COPY index.html   /usr/share/nginx/html/index.html
COPY profile.html /usr/share/nginx/html/profile.html
COPY config.js    /usr/share/nginx/html/config.js
COPY nginx.conf   /etc/nginx/conf.d/default.conf

RUN echo 'window.ENV_AUTH_URL = "https://auth-service-production-38f8.up.railway.app";' >  /usr/share/nginx/html/env.js && \
    echo 'window.ENV_TASK_URL = "https://engse207-final-lab2-67543210025-67543210071-production.up.railway.app";' >> /usr/share/nginx/html/env.js && \
    echo 'window.ENV_USER_URL = "https://user-service-production-cbef.up.railway.app";' >> /usr/share/nginx/html/env.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]