module.exports = (Sequelize, DataTypes) => {
    const ApiLogs = Sequelize.define("ApiLogs", {

        key: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        ulip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reqData: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resData: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        

    });
    return ApiLogs
}