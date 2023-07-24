module.exports = (sequelize, DataTypes) => {
    const Diagnostico = sequelize.define("Diagnostico", {
        id_Diagnostico:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        resultado_Prediccion:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        resultados:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        imagen:{
            type: DataTypes.BLOB('medium'),
            allowNull:false,
        }
});

    return Diagnostico;
};