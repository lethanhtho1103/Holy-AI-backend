const db = require("../../config/db");

class HeroSectionController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM hero_section");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async updateById(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (!content) {
      return res
        .status(400)
        .json({ message: "Missing content in request body" });
    }

    try {
      const [result] = await db.query(
        "UPDATE hero_section SET content = ? WHERE id = ?",
        [content, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Content not found" });
      }

      res.json({ message: "Content updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }
}

module.exports = new HeroSectionController();
