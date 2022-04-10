const replyBody = require("../../../common/replyBody")

const carrierIdDictionary = {
    "fedexAIR": "metric",
    "fedexGroud": "metric",
    "UPSExpress": "imperial",
    "UPS2DAY": "imperial",
}

const measurmentSystems = {
    imperial: {
        "system": "ups",
        "type": "imperial",
        "weight": "pound",
        "length": "inch"
    },
    metric: {
        "system": "fedEx",
        "type": "metric",
        "weight": "grams",
        "length": "cm"
    }
}


/**
 * checks if carrierId is valid and returns a valid measuring system, throws an error if carrier id is invalid
 * @param {String} carrierId Service Carrier Id
 * @param {String} apiErrorCode Errors: "InvalidCarrierId": 400
 * @returns measuring system = {weight: "grams/pound", length: "inch/cm", type: "metric/imperial"}
 */
module.exports = (carrierId, apiErrorCode) => {
    if (carrierIdDictionary[carrierId] == undefined)
        throw replyBody.error(`${apiErrorCode}_InvalidCarrierId`, "Carrier Id is invalid, please supply a valid carrierId")
    return measurmentSystems[carrierIdDictionary[carrierId]]
}