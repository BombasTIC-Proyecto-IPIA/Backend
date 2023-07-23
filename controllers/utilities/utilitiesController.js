const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp'); // Import the 'sharp' package


const utilitiesService = require(`../../services/utilities/utilitiesService`);


// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: './scriptPY',
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
            return res.status(400).send('Error al cargar la imagen.');
        } else if (err) {
            // Otro error
            console.error('Otro error:', err);
            return res.status(500).send('Ocurrió un error al cargar la imagen');
        }

        var fileName = req.file.filename;
        const resultado = await utilitiesService.ejecutarModelo(fileName);
        const fileNameConverted = fileName.replace('.tif', '');

        // Use the 'sharp' package to read the TIFF image and convert it to PNG
        const imageFilePath = path.join(__dirname, '../../scriptPY', fileName);

        try {
            await sharp(imageFilePath).toFile(path.join(__dirname, '../../scriptPY', `${fileNameConverted}.png`));

            // Read the converted PNG image into a buffer
            const convertedImageFilePath = path.join(__dirname, '../../scriptPY', `${fileNameConverted}.png`);
            const convertedImage = fs.readFileSync(convertedImageFilePath);
            const base64Image = convertedImage.toString('base64');
            fs.unlinkSync(imageFilePath);
            // Enviar el resultado y la imagen convertida al cliente
            res.status(201).send({ status: "OK", data: { resultado, imagen: base64Image } });

            // Eliminar la imagen original (opcional)

        } catch (error) {
            console.error('Error during conversion:', error);
            return res.status(500).send('Ocurrió un error al guardar la imagen convertida');
        }
    });
};

module.exports = {
    ejecutarModelo,
};