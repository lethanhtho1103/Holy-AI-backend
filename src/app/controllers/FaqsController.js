const db = require("../../config/db");

class FaqsController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM faqs");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async updateById(req, res) {
    const { id } = req.params;
    const { question, answer } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Missing question or answer in request body" });
    }

    try {
      const [result] = await db.query(
        "UPDATE faqs SET question = ?, answer = ? WHERE id = ?",
        [question, answer, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "FAQ not found" });
      }

      res.json({ message: "FAQ updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }
}

module.exports = new FaqsController();
