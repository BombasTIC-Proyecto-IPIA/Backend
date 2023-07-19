const db = require('../../models')
const bcrypt = require('bcrypt');
const Paciente = db.pacientes;
const Doctor = db.doctors;

const login = async (usuario) => {
    var user;
    console.log(usuario);
    if (usuario.tipo == "D") {
        user = await Doctor.findOne({ where: { dni: usuario.dni } });
    }
    else {
        user = await Paciente.findOne({ where: { dni: usuario.dni } });
    }
    try {
        if (await bcrypt.compare(usuario.password, user.password)) {
            return user;
        }
        else {
            return false;
        }
    }catch{
        return false;
    }
}
const logout = () => {
    return;
}
const getToken = () => {
    return;
}

module.exports = {
    login,
    logout,
    getToken,
};

