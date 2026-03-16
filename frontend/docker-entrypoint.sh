#!/bin/sh
cat <<ENVJS > /usr/share/nginx/html/env.js
window.ENV_AUTH_URL = "${AUTH_SERVICE_URL:-http://localhost:3001}";
window.ENV_TASK_URL = "${TASK_SERVICE_URL:-http://localhost:3002}";
window.ENV_USER_URL = "${USER_SERVICE_URL:-http://localhost:3003}";
ENVJS
exec "$@"
