const express = require("express");
const router = express.Router();
const authController = require(`../../controllers/auth/authController`)

router
    .post(`/login`, authController.login)
    .delete(`/logout`, authController.logout)
    .post(`/token`, authController.getToken);

module.exports = router;