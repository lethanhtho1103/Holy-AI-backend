const express = require("express");
const router = express.Router();
const HeroSectionController = require("../app/controllers/HerosectionController");

router.get("/", HeroSectionController.getAll);
router.put("/:id", HeroSectionController.updateById);

module.exports = router;
