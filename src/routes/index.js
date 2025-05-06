const heroSectionRoutes = require("./heroSectionRoutes");
const authRoutes = require("./authRoutes");

function route(app) {
  app.use("/api/hero_section", heroSectionRoutes);
  app.use("/api", authRoutes);
}

module.exports = route;
