const multer = require('multer');
const path = require('path');


const utilitiesService = require(`../../services/utilities/utilitiesService`);


// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        // Generar un nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage });

const ejecutarModelo = async (req, res) => {
    upload.single('file')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // Error de multer
            console.error('Error de multer:', err);
            return res.status(400).send('Error al cargar el archivo PDF.');
        } else if (err) {
            // Otro error
            console.error('Otro error:', err);
            return res.status(500).send('Ocurrió un error al cargar el archivo PDF.');
        }
        const fileName = req.file.filename;
        utilitiesService.ejecutarModelo(fileName);

    });


};

module.exports = {
    ejecutarModelo,
};