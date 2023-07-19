// const { all } = require("../../routes/auth");
const pacienteService = require(`../../services/api/pacienteService`)

const getAllPacientes = async (req, res) => {
    const allPacientes = await pacienteService.getAllPacientes();
    res.send(allPacientes);
};

const getAllPacientesByDoctorDni = async (req, res) => {
    const allPacientes = await pacienteService.getAllPacientesByDoctorDni(req.params.docDni);
    res.send(allPacientes);
};

const getOnePaciente = async (req, res) => {
    const onePaciente = await pacienteService.getOnePaciente(req.params.pacienteDNI);
    res.send(onePaciente);
};

const createNewPaciente = async (req, res) => {
    const createdPaciente = await pacienteService.createNewPaciente(req.body);
    if (createdPaciente == undefined) {
        res.status(400).send({ status: "Error" });
    }
    else {
        console.log(createdPaciente);
        res.status(201).send({ status: "OK", data: createdPaciente });
    }
};

const updateOnePaciente = async (req, res) => {
    const updatedPaciente = await pacienteService.updateOnePaciente(req.body, req.params.pacienteDNI);
    if (updatedPaciente == undefined || updatedPaciente == null) {
        res.status(400).send({ status: "Error" });
    }
    else {
        res.status(204).send({ status: "OK", data: updatedPaciente });
    }
};
const deleteOnePaciente = async (req, res) => {
    await pacienteService.deleteOnePaciente(req.params.pacienteDNI);
    res.status(204).send({ status: "OK" });
};

module.exports = {
    getAllPacientes,
    getAllPacientesByDoctorDni,
    getOnePaciente,
    createNewPaciente,
    updateOnePaciente,
    deleteOnePaciente,
};