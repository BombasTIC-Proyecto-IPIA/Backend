const express = require('express');
const router = express.Router();

const diagnosticoController = require(`../../controllers/api/diagnosticoController`)

router
    .get(`/`, diagnosticoController.getAllDiagnosticos)
    .get(`/:dniPaciente`, diagnosticoController.getOneDiagnostico)
    .post(`/`, diagnosticoController.createNewDiagnostico)
    .patch(`/:dniPaciente`, diagnosticoController.updateOneDiagnostico)
    .delete(`/:idDiagnostico`, diagnosticoController.deleteOneDiagnostico);

module.exports = router;