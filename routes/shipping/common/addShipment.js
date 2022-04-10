const replyBody = require("../../../common/replyBody")
const db = require("./../../../database/createTables")

module.exports = async function (details){
    try{
        const newShipment = await db.ShipmentDetials.create({
            height: details.dimentions.height,
            length: details.dimentions.length,
            width: details.dimentions.width,
            weight: details.dimentions.weight,
            shippingSystem: details.serviceSystem
        })
        return newShipment.dataValues.id
    }catch(err){
        console.log(err)
        throw replyBody.error("AddShipment_DBError", "Unable to add your shipment")
    }
}