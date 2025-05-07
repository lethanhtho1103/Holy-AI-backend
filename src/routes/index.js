const heroSectionRoutes = require("./heroSectionRoutes");
const stuckRoutes = require("./stuckRoutes");
const solutionRoutes = require("./solutionRoutes");
const imagineRoutes = require("./imagineRoutes");
const faqsRoutes = require("./faqsRoutes");
const headerRoutes = require("./headerRoutes");
const priceListRoutes = require("./priceListRoutes");

const authRoutes = require("./authRoutes");

function route(app) {
  app.use("/api/hero_section", heroSectionRoutes);
  app.use("/api/stuck", stuckRoutes);
  app.use("/api/solution", solutionRoutes);
  app.use("/api/imagine", imagineRoutes);
  app.use("/api/faqs", faqsRoutes);
  app.use("/api/header", headerRoutes);
  app.use("/api/price_list", priceListRoutes);

  app.use("/api", authRoutes);
}

module.exports = route;
