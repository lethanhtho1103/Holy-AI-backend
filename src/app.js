const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
