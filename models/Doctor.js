module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("Doctor", {
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

    return Doctor;
};