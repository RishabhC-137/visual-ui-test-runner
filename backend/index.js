const express = require("express");
const cors = require("cors");
const testRoutes = require("./src/routes/testRoutes");

const app = express();

app.use(cors()); // enable CORS

app.use(express.json());

app.use("/screenshots", express.static("src/screenshots"));

app.use("/api", testRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});