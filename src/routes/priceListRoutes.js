const express = require("express");
const router = express.Router();
const PriceListController = require("../app/controllers/PriceListController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", PriceListController.getAllPlansWithFeatures);
router.put("/:id", authMiddleware, PriceListController.updatePlanFeature);
router.post("", authMiddleware, PriceListController.addPlanFeature);
router.delete("/:id", authMiddleware, PriceListController.deletePlanFeature);

router.get("/plans", PriceListController.getAllPlans);
router.put("/plans/:id", authMiddleware, PriceListController.updatePlan);
router.post("/plans", authMiddleware, PriceListController.addPlan);
router.delete("/plans/:id", authMiddleware, PriceListController.deletePlan);

router.get("/features", PriceListController.getAllFeatures);
router.put("/features/:id", authMiddleware, PriceListController.updateFeature);
router.post("/features", authMiddleware, PriceListController.addFeature);
router.delete(
  "/features/:id",
  authMiddleware,
  PriceListController.deleteFeature
);

module.exports = router;
