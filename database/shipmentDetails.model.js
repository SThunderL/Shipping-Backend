const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define('shipmentDetails', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        width: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        length: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        shippingSystem: {
            type: DataTypes.STRING,
            allowNull: false,
            length: 2
        }
    }, {
        // options
    })
}