const heroSectionRoutes = require("./heroSectionRoutes");

function route(app) {
  app.use("/api/hero_section", heroSectionRoutes);
}

module.exports = route;
