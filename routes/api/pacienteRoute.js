const express = require('express');
const router = express.Router();

const pacienteController = require(`../../controllers/api/pacienteController`)

router
    .get(`/`, pacienteController.getAllPacientes)
    .get(`/d/:docDni`, pacienteController.getAllPacientesByDoctorDni)
    .get(`/:pacienteDNI`, pacienteController.getOnePaciente)
    .post(`/`, pacienteController.createNewPaciente)
    .patch(`/:pacienteDNI`, pacienteController.updateOnePaciente)
    .delete(`/:pacienteDNI`, pacienteController.deleteOnePaciente);

module.exports = router;