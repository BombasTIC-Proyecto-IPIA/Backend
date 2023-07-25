// const { all } = require("../../routes/auth");
const multer = require('multer');
// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Use memory storage to avoid writing files to disk
const upload = multer({ storage: storage });
const diagnosticoService = require(`../../services/api/diagnosticoService`)



const getAllDiagnosticos = async (req, res) => {
    const allDiagnosticos = await diagnosticoService.getAllDiagnosticos();
    res.send(allDiagnosticos);
};

const getOneDiagnostico = async (req, res) => {
    const oneDiagnostico = await diagnosticoService.getOneDiagnosticoByPaciente(req.params.dniPaciente);
    res.send(oneDiagnostico);
};

const createNewDiagnostico = async (req, res) => {
    upload.single('imagen')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // Error de multer
            console.error('Error de multer:', err);
            return res.status(400).send('Error al cargar el archivo PDF.');
        } else if (err) {
            // Otro error
            console.error('Otro error:', err);
            return res.status(500).send('Ocurrió un error al cargar el archivo PDF.');
        }

        // The uploaded file is available as req.file
        const { originalname, buffer, mimetype } = req.file;

        // Now you can pass the file data to the createNewDiagnostico function along with other data
        const createdDiagnostico = await diagnosticoService.createNewDiagnostico(req.body, {
            filename: originalname,
            data: buffer,
            contentType: mimetype
        });

        if (!createdDiagnostico) {
            res.status(400).send({ status: "Error" });
        } else {
            res.status(201).send({ status: "OK", data: createdDiagnostico });
        }
    });
};


const updateOneDiagnostico = async (req, res) => {
        const updatedDiagnostico = await diagnosticoService.updateOneDiagnostico(req.body, req.params.dniPaciente);
        if (updatedDiagnostico == undefined || updatedDiagnostico == null) {
            res.status(400).send({ status: "Error" });
        }
        else {
            res.status(204).send({ status: "OK", data: updatedDiagnostico });
        }

};
const deleteOneDiagnostico = async (req, res) => {
    await diagnosticoService.deleteOneDiagnostico(req.params.idDiagnostico);
    res.status(204).send({ status: "OK" });
};

module.exports = {
    getAllDiagnosticos,
    getOneDiagnostico,
    createNewDiagnostico,
    updateOneDiagnostico,
    deleteOneDiagnostico,
};