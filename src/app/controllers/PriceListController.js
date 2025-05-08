const db = require("../../config/db");

class PriceListController {
  async getAllPlans(req, res) {
    try {
      const [plans] = await db.query(
        "SELECT id, name, description, icon FROM plans"
      );

      if (plans.length === 0) {
        return res.status(404).json({ message: "No plans found" });
      }

      res.json(plans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async updatePlan(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Tên và mô tả không thể để trống" });
    }

    try {
      const [result] = await db.query(
        "UPDATE plans SET name = ?, description = ? WHERE id = ?",
        [name, description, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Gói dịch vụ không tồn tại" });
      }

      res.json({ message: "Gói dịch vụ đã được cập nhật" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi cơ sở dữ liệu" });
    }
  }

  async addPlan(req, res) {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const [result] = await db.query(
        "INSERT INTO plans (name, description) VALUES (?, ?)",
        [name, description]
      );

      res
        .status(201)
        .json({ message: "Plan added successfully", id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async deletePlan(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const [result] = await db.query("DELETE FROM plans WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Plan not found" });
      }

      res.json({ message: "Plan deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async getAllFeatures(req, res) {
    try {
      const [features] = await db.query("SELECT id, name FROM features");

      if (features.length === 0) {
        return res.status(404).json({ message: "No features found" });
      }

      res.json(features);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async getFeatureById(req, res) {
    const { id } = req.params;

    try {
      const [feature] = await db.query(
        "SELECT id, name FROM features WHERE id = ?",
        [id]
      );

      if (feature.length === 0) {
        return res.status(404).json({ message: "Feature not found" });
      }

      res.json(feature[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async addFeature(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Feature name is required" });
    }

    try {
      const [result] = await db.query(
        "INSERT INTO features (name) VALUES (?)",
        [name]
      );

      res
        .status(201)
        .json({ message: "Feature added successfully", id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async updateFeature(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Feature name is required" });
    }

    try {
      const [result] = await db.query(
        "UPDATE features SET name = ? WHERE id = ?",
        [name, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Feature not found" });
      }

      res.json({ message: "Feature updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async deleteFeature(req, res) {
    const { id } = req.params;

    try {
      const [result] = await db.query("DELETE FROM features WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Feature not found" });
      }

      res.json({ message: "Feature deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async getAllPlansWithFeatures(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT p.id AS plan_id, p.name AS plan_name, p.description, p.icon,
          f.id AS feature_id, f.name AS feature_name, pf.monthly_limit, pf.daily_limit, pf.note
        FROM plans p
        LEFT JOIN plan_features pf ON p.id = pf.plan_id
        LEFT JOIN features f ON pf.feature_id = f.id`
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "No plans found" });
      }

      const plans = rows.reduce((acc, item) => {
        let plan = acc.find((p) => p.id === item.plan_id);

        if (!plan) {
          plan = {
            id: item.plan_id,
            name: item.plan_name,
            description: item.description,
            icon: item.icon,
            features: [],
          };
          acc.push(plan);
        }

        if (item.feature_id) {
          plan.features.push({
            id: item.feature_id,
            name: item.feature_name,
            monthly_limit: item.monthly_limit,
            daily_limit: item.daily_limit,
            note: item.note,
          });
        }

        return acc;
      }, []);

      res.json(plans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async getPlanFeatureById(req, res) {
    const { id } = req.params;

    try {
      const [planFeature] = await db.query(
        `SELECT pf.id, pf.plan_id, pf.feature_id, pf.monthly_limit, pf.daily_limit, pf.note, f.name AS feature_name, p.name AS plan_name
        FROM plan_features pf
        LEFT JOIN features f ON pf.feature_id = f.id
        LEFT JOIN plans p ON pf.plan_id = p.id
        WHERE pf.id = ?`,
        [id]
      );

      if (planFeature.length === 0) {
        return res.status(404).json({ message: "Plan feature not found" });
      }

      res.json(planFeature[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async addPlanFeature(req, res) {
    const { plan_id, feature_id, monthly_limit, daily_limit, note } = req.body;

    if (!plan_id || !feature_id) {
      return res
        .status(400)
        .json({ message: "Plan ID and Feature ID are required" });
    }

    try {
      const [result] = await db.query(
        `INSERT INTO plan_features (plan_id, feature_id, monthly_limit, daily_limit, note)
         VALUES (?, ?, ?, ?, ?)`,
        [plan_id, feature_id, monthly_limit, daily_limit, note]
      );

      res.status(201).json({
        message: "Plan feature added successfully",
        id: result.insertId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async updatePlanFeature(req, res) {
    const { id } = req.params;
    const { plan_id, feature_id, monthly_limit, daily_limit, note } = req.body;

    if (!plan_id || !feature_id) {
      return res
        .status(400)
        .json({ message: "Plan ID and Feature ID are required" });
    }

    try {
      const [result] = await db.query(
        `UPDATE plan_features
         SET plan_id = ?, feature_id = ?, monthly_limit = ?, daily_limit = ?, note = ?
         WHERE id = ?`,
        [plan_id, feature_id, monthly_limit, daily_limit, note, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Plan feature not found" });
      }

      res.json({ message: "Plan feature updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }

  async deletePlanFeature(req, res) {
    const { id } = req.params;

    try {
      const [result] = await db.query(
        "DELETE FROM plan_features WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Plan feature not found" });
      }

      res.json({ message: "Plan feature deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }
}

module.exports = new PriceListController();
