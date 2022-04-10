const checkInputs = require("../../../common/checkInputs");
const replyBody = require("../../../common/replyBody");

/**
 * checks input parameters for invalid inputs
 * @param {Object} dimentions shipment dimentions: {height, width, length, weight, unitSystem}
 * @param {String} carrierId shipment service carrier Id
 * @param {String} apiErrorCode ErrorStrings: "InputDataNotFound": 400, "InputDataTypeError": 400, "InputDataEmpty": 400, 
 * "InvalidDimention": 400, "InvalidDimentionUnit": 400, "InvalidServiceId": 400
 */
module.exports = function validateShipmentInputs(dimentions, carrierId, apiErrorCode) {
    checkInputs({ dimentions, carrierId }, true, apiErrorCode)
    if(!validTrasnportMethods.includes(carrierId))
        throw replyBody.error(`${apiErrorCode}_InvalidServiceId`, `Please supply a valid carrier service id`)
    
    
    let dimentionsTest = {
        "height": dimentions.height,
        "length": dimentions.length,
        "width": dimentions.width,
        "weight": dimentions.weight,
    }
    checkInputs({ ...dimentionsTest, "unitSystem": dimentions.unitSystem }, true, apiErrorCode)

    checkPositiveNumber(dimentionsTest, apiErrorCode)
    checkUnits(dimentions.unitSystem, apiErrorCode)
}


function checkPositiveNumber(inputParamsObject, apiErrorCode) {
    for (let i in inputParamsObject) {
        switch (Math.sign(inputParamsObject[i])) {
            case 1:
                continue;
            case -1:
                throw replyBody.error(`${apiErrorCode}_InvalidDimention`, `${i} cannot be negative`)
            case 0:
                throw replyBody.error(`${apiErrorCode}_InvalidDimention`, `${i} cannot be zero`)
            default:
                continue
        }
    }
}

const validUnits = ["metric", "imperial"]
const validTrasnportMethods = [
    "fedexAIR",
    "fedexGroud",
    "UPSExpress",
    "UPS2DAY"
]

function checkUnits(dimUnit, apiErrorCode) {
    if (!validUnits.includes(dimUnit)) throw replyBody.error(`${apiErrorCode}_InvalidDimentionUnit`, "Please supply a valid unit system: metric, imperial")
}