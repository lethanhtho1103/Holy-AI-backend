const express = require("express");
const router = express.Router();
const PriceListController = require("../app/controllers/PriceListController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", PriceListController.getAllPlansWithFeatures);
router.put("/:id", PriceListController.updatePlanFeature);
router.post("", PriceListController.addPlanFeature);
router.delete("/:id", PriceListController.deletePlanFeature);

router.get("/plans", PriceListController.getAllPlans);
router.put("/plans/:id", PriceListController.updatePlan);
router.post("/plans", PriceListController.addPlan);
router.delete("/plans/:id", PriceListController.deletePlan);

router.get("/features", PriceListController.getAllFeatures);
router.put("/features/:id", PriceListController.updateFeature);
router.post("/features", PriceListController.addFeature);
router.delete("/features/:id", PriceListController.deleteFeature);

module.exports = router;
