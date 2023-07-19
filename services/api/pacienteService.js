const db = require('../../models')
const bcrypt = require('bcrypt');
const Paciente = db.pacientes;
const Doctor = db.doctors;

const getAllPacientes = async () => {

    const pacientes = await Paciente.findAll();
    return JSON.stringify(pacientes, null, 2);
}

const getAllPacientesByDoctorDni = async (dniDoctor) => {
    const pacientes = await Paciente.findAll({ where: { dni_Doctor: dniDoctor } });
    return JSON.stringify(pacientes, null, 2);
}

const getOnePaciente = async (dni) => {

    const paciente = await Paciente.findOne({ where: { dni: dni } });
    return JSON.stringify(paciente, null, 2);
}

const createNewPaciente = async (paciente) => {
    if (paciente != null) {
        const docEncargado = await Doctor.findOne({ where: { dni: paciente.dni_Doctor } });
        if (docEncargado != undefined) {
            const hashedPassword = await bcrypt.hash(paciente.password, 10);
            const newPaciente = await Paciente.create({
                dni: paciente.dni,
                password: hashedPassword,
                name: paciente.name,
                dni_Doctor: paciente.dni_Doctor,
            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            });
            return newPaciente;
        }

    }
    return null

}

const updateOnePaciente = async (paciente, dni) => {
    var updatedPaciente = null;
    var newPassword = false;
    if(paciente.password){
        newPassword = await bcrypt.hash(paciente.password, 10);
    }
    const newName = paciente.name;
    const newDoctor = paciente.dni_Doctor;
    var docEncargado = undefined;
    if(newDoctor != undefined){
        docEncargado = await Doctor.findOne({ where: { dni: newDoctor } });
    }
    if (docEncargado == undefined) {
        docEncargado = false;
    }
    try {
        await Paciente.findOne({ where: { dni } })
            .then((record) => {
                if (record) {
                    // Update the username field if provided
                    if (newName) {
                        record.name = newName;
                    }
                    // Update the password field if provided
                    if (newPassword) {
                        record.password = newPassword;
                    }
                    if(docEncargado){
                        record.dni_doctor = newDoctor;
                    }
                    // Save the changes
                    record.save();
                    updatedPaciente = record.dataValues;
                } else {
                    throw new Error('Record not found');
                }
            })
    } catch (err) {
        return null;
    }
    return updatedPaciente;
}

const deleteOnePaciente = async (dni) => {
    await Paciente.destroy({
        where: { dni: dni }
    })
    return;
}

module.exports = {
    getAllPacientes,
    getAllPacientesByDoctorDni,
    getOnePaciente,
    createNewPaciente,
    updateOnePaciente,
    deleteOnePaciente,
};

