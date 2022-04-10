const express = require('express')
const replyBody = require('../../common/replyBody')
const addShipment = require('./common/addShipment')
const unifyDimentions = require('./common/unifyDimentions')
const validateShipmentDetials = require('./common/validateShipmentDetials')
const router = express.Router()

router.post('/', processData)

async function processData(req, res) {
    try {
        const { dimentions, carrierId } = req.body
        validateShipmentDetials(dimentions, carrierId, "SendShipment")
        const shipmentDetials = unifyDimentions(dimentions, carrierId, "SendShipment")

        const shipmentId = await addShipment(shipmentDetials)
        return res.send(replyBody.done({shipmentId: shipmentId}, {message: "Shipment sent"}))
    } catch (err) {
        console.log(err)
        if (errorList[err.errorCode] != undefined) return res.status(errorList[err.errorCode]).json(err)
        return res.status(400).json(replyBody.error("SendShipment_Error", "Error sending shipment"))
    }

}

const errorList = {
    "SendShipment_InputDataNotFound": 400,
    "SendShipment_InputDataTypeError": 400,
    "SendShipment_InputDataEmpty": 400,
    "SendShipment_InvalidDimention": 400,
    "SendShipment_InvalidDimentionUnit": 400,
    "SendShipment_InvalidCarrierId": 400,
}

module.exports = router