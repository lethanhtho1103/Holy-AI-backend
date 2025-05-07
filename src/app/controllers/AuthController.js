const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../../app/Models/UserModel");
const db = require("../../config/db");
class AuthController {
  async register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    try {
      const existingUser = await UserModel.findByUsername(email);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
        email,
        hashedPassword,
      ]);

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    try {
      const user = await UserModel.findByUsername(email);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Tài khoản hoặc mật khẩu không đúng." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Tài khoản hoặc mật khẩu không đúng." });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const { password: _removed, ...userWithoutPassword } = user;

      res.json({ token, user: userWithoutPassword });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
