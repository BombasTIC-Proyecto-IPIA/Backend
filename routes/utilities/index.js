const express = require("express");
const router = express.Router();
const utilitiesController = require(`../../controllers/utilities/utilitiesController`)

router
    .post(`/executeModel`, utilitiesController.ejecutarModelo );

module.exports = router;