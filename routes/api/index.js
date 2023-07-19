const express = require('express');
const app = express();
const router = express.Router();
const routerDoctor = require("./doctorRoute");
const routerPaciente = require("./pacienteRoute");
const routerDiagnostico = require("./diagnosticoRoute");

router.use("/doctor", routerDoctor);
router.use("/paciente", routerPaciente);
router.use("/diagnostico", routerDiagnostico)

module.exports = router;