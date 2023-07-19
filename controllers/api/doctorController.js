// const { all } = require("../../routes/auth");
const doctorService = require(`../../services/api/doctorService`)

const getAllDoctors = async(req, res) => {
    const allDoctors = await doctorService.getAllDoctors();
    res.send(allDoctors);
};

const getOneDoctor = async(req, res) => {
    const oneDoctor = await doctorService.getOneDoctor(req.params.doctorDNI);
    res.send(oneDoctor);
};

const createNewDoctor = async(req, res) => {
    const createdDoctor = await doctorService.createNewDoctor(req.body);
    if (createdDoctor == undefined){
        res.status(400).send({status:"Error"});
    }
    res.status(201).send({status:"OK", data: createdDoctor});
};

const updateOneDoctor = async(req, res) => {
    const updatedDoctor = await doctorService.updateOneDoctor(req.body, req.params.doctorDNI);
    console.log(updatedDoctor);
    if (updatedDoctor == undefined || updatedDoctor == null){
        res.status(400).send({status:"Error"});
    }
    else{
        res.status(204).send({status:"OK", data: updatedDoctor});
    }
};
const deleteOneDoctor = async(req, res) => {
    await doctorService.deleteOneDoctor(req.params.doctorDNI);
    res.status(204).send({status:"OK"});
};

module.exports = {
    getAllDoctors,
    getOneDoctor,
    createNewDoctor,
    updateOneDoctor,
    deleteOneDoctor,
};