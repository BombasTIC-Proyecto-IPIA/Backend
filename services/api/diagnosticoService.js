const db = require('../../models')
const bcrypt = require('bcrypt');
const Diagnostico = db.diagnostico;
const Paciente = db.pacientes;

const getAllDiagnosticos = async () => {

    const diagnosticos = await Diagnostico.findAll();
    return JSON.stringify(diagnosticos, null, 2);
}

const getOneDiagnosticoByPaciente = async (dni) => {

    const diagnostico = await Diagnostico.findOne({ where: { PacienteDni: dni } });
    return JSON.stringify(diagnostico, null, 2);
}
const createNewDiagnostico = async (diagnosticoData, fileData) => {
    if (diagnosticoData != null && fileData != null) {
        const pacienteDiagnosticado = await Paciente.findOne({ where: { dni: diagnosticoData.PacienteDni } });
        if (pacienteDiagnosticado != undefined) {
            const newDiagnostico = await Diagnostico.create({
                resultados: diagnosticoData.resultados,
                imagen: fileData.data, // Save the image data from the fileData object
                PacienteDni: diagnosticoData.PacienteDni,
                resultado_Prediccion: diagnosticoData.resultado_Prediccion,
            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            });
            return newDiagnostico;
        }
    }
    return null;
};

const updateOneDiagnostico = async (diagnostico, dni) => {
    var updatedDiagnostico = null;
    try {
        await Diagnostico.findOne({ where: { PacienteDni: dni } })
            .then((record) => {
                if (record) {
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
    console.log(updatedDiagnostico)
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

