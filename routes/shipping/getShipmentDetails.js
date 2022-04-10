const express = require('express')
const checkInputs = require('../../common/checkInputs')
const replyBody = require('../../common/replyBody')
const router = express.Router()
const db = require("./../../database/createTables")

router.get('/:shipmentId', processData)

async function processData(req, res) {
    try {
        const { shipmentId } = req.params
        checkInputs({ shipmentId }, true, "GetShipment")

        const shipment = await db.ShipmentDetials.findByPk(shipmentId)

        const composed = {
            dimentions: {
                height: shipment.height,
                width: shipment.width,
                length: shipment.length,
                weight: shipment.weight,
            },
            serviceSystem: shipment.shippingSystem
        }

        return res.send(replyBody.done(composed))
    } catch (err) {
        console.log(err)
        if (errorList[err.errorCode] != undefined) return res.status(errorList[err.errorCode]).json(err)
        return res.status(400).json(replyBody.error("SendShipment_Error", "Error sending shipment"))
    }

}

const errorList = {
    "GetShipment_InputDataNotFound": 400,
    "GetShipment_InputDataTypeError": 400,
    "GetShipment_InputDataEmpty": 400,
}

module.exports = router