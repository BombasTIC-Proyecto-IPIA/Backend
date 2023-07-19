const express = require("express");
const router = express.Router();
const authController = require(`../../controllers/utilities/utilitiesController`)

router
    .post(`/save-file`, authController.saveFile);

module.exports = router;