module.exports = (sequelize, DataTypes) => {
    const Paciente = sequelize.define("Paciente", {
        dni:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true,
            },
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true,
            },
        },
        refresh_token:{
            type: DataTypes.STRING,
            allowNull:true,
        }
});

    return Paciente;
};