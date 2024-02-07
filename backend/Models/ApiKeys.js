module.exports = (Sequelize, DataTypes) => {
    const ApiKeys = Sequelize.define("ApiKeys", {

        key: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        ownerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        applicationName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        }
        
        

    });
    return ApiKeys
}