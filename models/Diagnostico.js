module.exports = (sequelize, DataTypes) => {
    const Diagnostico = sequelize.define("Diagnostico", {
        id_Diagnostico:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        resultados:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true,
            },
        },
        documento:{
            type: DataTypes.BLOB('medium'),
            allowNull:false,
        }
});

    return Diagnostico;
};