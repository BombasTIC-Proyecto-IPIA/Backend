const db = require('../../models')
const bcrypt = require('bcrypt');
const Diagnostico = db.diagnostico;
const Paciente = db.pacientes;
const fs = require('fs');

const getAllDiagnosticos = async () => {

    const diagnosticos = await Diagnostico.findAll();
    return JSON.stringify(diagnosticos, null, 2);
}

const getOneDiagnosticoByPaciente = async (dni) => {

    const diagnostico = await Diagnostico.findOne({ where: { PacienteDni: dni } });
    return JSON.stringify(diagnostico, null, 2);
}

const createNewDiagnostico = async (diagnostico, fichero) => {
    if (diagnostico != null) {
        const pacienteDiagnosticado = await Paciente.findOne({ where: { dni: diagnostico.PacienteDni } });
        if (pacienteDiagnosticado != undefined) {
            const pdf = fs.readFileSync(fichero.path);
            console.log(fichero);
            const newDiagnostico = await Diagnostico.create({
                resultados: diagnostico.resultados,
                documento: pdf,
                PacienteDni: diagnostico.PacienteDni,
                resultado_Prediccion: diagnostico.resultado_Prediccion,
            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            });
            return newDiagnostico;
        }

    }
    return null

}

const updateOneDiagnostico = async (diagnostico, dni, fichero) => {
    var updatedDiagnostico = null;
    const pdf = fs.readFileSync(fichero.path);
    try {
        await Diagnostico.findOne({ where: { PacienteDni: dni } })
            .then((record) => {
                if (record) {
                    // Update the username field if provided
                    if (pdf) {
                        record.documento = pdf;
                    }
                    // Update the password field if provided
                    if (diagnostico.resultados) {
                        record.resultados = diagnostico.resultados;
                    }
                    // Save the changes
                    record.save();
                    updatedDiagnostico = record.dataValues;
                } else {
                    throw new Error('Record not found');
                }
            })
    } catch (err) {
        return null;
    }
    return updatedDiagnostico;
}

const deleteOneDiagnostico = async (id) => {
    await Diagnostico.destroy({
        where: { id_Diagnostico: id }
    })
    return;
}

module.exports = {
    getAllDiagnosticos,
    getOneDiagnosticoByPaciente,
    createNewDiagnostico,
    updateOneDiagnostico,
    deleteOneDiagnostico,
};

