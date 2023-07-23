const db = require('../../models')
const Paciente = db.pacientes;
const path = require('path');
const { spawn } = require('child_process');


const ejecutarModelo = (filename) => {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = path.join(__dirname, '../../scriptPY/image_prediction.py');

        // Ejecutar el script de Python y pasar el nombre del archivo como argumento
        // const pythonScript = spawn('C:/Users/PC/anaconda3/python', [pythonScriptPath, filename]);
        const pythonScript = spawn('python', [pythonScriptPath, filename]);
        //console.log(pythonScript);
        // Manejar la salida del script de Python
        var num = 0;
        var prediccion = "";
        pythonScript.stdout.on('data', (data) => {
            if (num === 2) {
                resolve(`${data}`);
            }
            num++;
        });

        // Manejar los errores del script de Python
        pythonScript.stderr.on('data', (data) => {
            console.error(`Error en el script de Python: ${data}`);
            reject(data);
        });

    });
}

module.exports = {
    ejecutarModelo,
};

