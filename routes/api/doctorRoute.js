const express = require('express');
const router = express.Router();

const doctorController = require(`../../controllers/api/doctorController`)

router
    .get(`/`, doctorController.getAllDoctors)
    .get(`/:doctorDNI`, doctorController.getOneDoctor)
    .post(`/`, doctorController.createNewDoctor)
    .patch(`/:doctorDNI`, doctorController.updateOneDoctor)
    .delete(`/:doctorDNI`, doctorController.deleteOneDoctor);

module.exports = router;