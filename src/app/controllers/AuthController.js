const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../../app/Models/UserModel");
const db = require("../../config/db");
class AuthController {
  async register(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    try {
      const existingUser = await UserModel.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    try {
      const user = await UserModel.findByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
