const express = require("express");
const router = new express.Router();

const worldController = require('../controllers/worldcoin')

router
  .route("/verify-world-id")
  .post(worldController.verifyID);


module.exports = router