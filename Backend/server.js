import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🧩 Connect to MariaDB (on port 3307)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // apna MariaDB username
  password: "santoor711",        // agar password hai to yahan likho
  database: "userdb",  // apna database name
  port: 3307           // 👈 tumhara MariaDB port
});

// ✅ Test connection
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MariaDB on port 3307");
  }
});

// ✅ Signup API
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("❌ Error inserting user:", err);
      return res.status(500).json({ message: "Database error or duplicate email" });
    }
    res.json({ message: "Signup successful" });
  });
});

// ✅ Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "User not found or wrong password" });
    }
  });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
