const express = require("express");
const runTestController = require("../controllers/testController");

const router = express.Router();

router.post("/run-test", runTestController);

module.exports = router;