const db = require('../../models')
const bcrypt = require('bcrypt');
const Doctor = db.doctors;

const getAllDoctors = async () => {

    const doctors = await Doctor.findAll();
    return JSON.stringify(doctors, null, 2);
}

const getOneDoctor = async (dni) => {

    const doctor = await Doctor.findOne({ where: { dni: dni } });
    return JSON.stringify(doctor, null, 2);
}

const createNewDoctor = async (doctor) => {

    if (doctor != null) {
        const hashedPassword = await bcrypt.hash(doctor.password, 10);
        const newDoctor = await Doctor.create({
            dni: doctor.dni,
            password: hashedPassword,
            name: doctor.name,
        }).catch(err => {
            if (err) {
                console.log(err);
            }
        });
        return newDoctor;
    }
    return null

}

const updateOneDoctor = async (doctor, dni) => {
    var updatedDoctor = null;
    var newPassword = false;
    if(doctor.password){
        newPassword = await bcrypt.hash(doctor.password, 10);
    }
    const newName = doctor.name;
    try {
        await Doctor.findOne({ where: { dni } })
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
                    // Save the changes
                    record.save();
                    updatedDoctor = record.dataValues;
                } else {
                    throw new Error('Record not found');
                }
            })
    } catch (err) {
        return null;
    }
    return updatedDoctor;
}

const deleteOneDoctor = async(dni) => {
    await Doctor.destroy({
        where: { dni: dni }
    })
    return;
}

module.exports = {
    getAllDoctors,
    getOneDoctor,
    createNewDoctor,
    updateOneDoctor,
    deleteOneDoctor,
};

