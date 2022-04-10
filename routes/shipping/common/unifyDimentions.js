const replyBody = require("../../../common/replyBody")
const getMeasuringUnits = require("./getMeasuringUnits")

/**
 * changes units to align with service provider provided as carrierId
 * if the unitSystem is undefined in dimentions, it will assume the units are default
 * to carrier's unit system
 * @param {Object} dimentions shipment dimentions {}
 * @param {String} carrierId service system id
 * @param {String} apiErrorCode Erros: "InvalidCarrierId": 400,
 * @returns object containing unified {dimentions, carrierId, serviceSystem} used
 */
module.exports = function (dimentions, carrierId, apiErrorCode) {
    const measuringSystem = getMeasuringUnits(carrierId, apiErrorCode)

    const convertMetricToImperial = {
        length: val => val * 0.3048,
        weight: val => val * 0.00220462
    }
    const convertImperialToMetric = {
        length: val => val * 3.28084,
        weight: val => val * 453.592
    }

    let newDimentions
    if (measuringSystem.type === dimentions.unitSystem || dimentions.unitSystem == undefined) {
        newDimentions = {
            "length": dimentions.length,
            "width": dimentions.width,
            "height": dimentions.height,
            "weight": dimentions.weight,
        }
    } else {
        if (measuringSystem.type === "metric") {
            newDimentions = {
                "length": convertImperialToMetric.length(dimentions.length),
                "width": convertImperialToMetric.length(dimentions.width),
                "height": convertImperialToMetric.length(dimentions.height),
                "weight": convertImperialToMetric.weight(dimentions.weight)
            }
        } else {
            newDimentions = {
                "length": convertMetricToImperial.length(dimentions.length),
                "width": convertMetricToImperial.length(dimentions.width),
                "height": convertMetricToImperial.length(dimentions.height),
                "weight": convertMetricToImperial.weight(dimentions.weight)
            }
        }
    }

    return {
        "dimentions": newDimentions,
        "carrierId": carrierId,
        "serviceSystem": measuringSystem.system
    }
}