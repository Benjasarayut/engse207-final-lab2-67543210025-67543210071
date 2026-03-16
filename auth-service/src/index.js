const express = require("express");
const cors = require("cors");
const pool = require("./db/db");

const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);

// root health check
app.get("/", (req, res) => {
  res.json({ service: "auth-service", status: "running", port: PORT });
});

// ─── Start ────────────────────────────────────────────────────────────────────
async function start() {
  // รอ DB พร้อม (retry สูงสุด 10 ครั้ง)
  let retries = 10;
  while (retries > 0) {
    try {
      await pool.query("SELECT 1");
      console.log("[auth-service] ✅ Connected to auth-db");
      break;
    } catch (err) {
      retries--;
      console.warn(
        `[auth-service] DB not ready, retrying... (${retries} left)`,
      );
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  if (retries === 0) {
    console.error("[auth-service] ❌ Cannot connect to DB. Exiting.");
    process.exit(1);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[auth-service] 🚀 Running on port ${PORT}`);
  });
}

start();
