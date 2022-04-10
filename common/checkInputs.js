const dataTypes = require("./checkInputsDataTypes")
const replyBody = require("./replyBody")

/**
 * check input data for correct data types and values, throws an error if datatype mismatch
 * @param {Object} data data object containing keys and values
 * @param {Boolean} checkEmpty checks if data sent is not null, arrays and objects are not empty
 * @param {String} apiErrorCode Error Strings: "InputDataNotFound": 400, "InputDataTypeError": 400, "InputDataEmpty": 400
 * @returns true if no error is thrown, throws an error if any incompatibility is found, Errors Thrown are as 
 * "${apiErrorCode}_ErrorReason" in accordance to replyBody.error
 */
module.exports = function (data, checkEmpty, apiErrorCode) {
    for (let i in data) {
        if (dataTypes[i] == undefined) throw (replyBody.error(`${apiErrorCode}_InputDataNotFound`, `${i} is not found or is undefined in the types`))
        if (checkEmpty && data[i] == undefined) throw (replyBody.error(`${apiErrorCode}_InputDataNotFound`, `${i} is not found`))

        switch (dataTypes[i]) {
            case "string": {
                if (checkEmpty) {
                    if (data[i] === undefined || data[i] === null) {
                        throw (replyBody.error(`${apiErrorCode}_InputDataEmpty`, `${i} is empty`))
                    }
                    if (data[i].length < 1) {
                        throw (replyBody.error(`${apiErrorCode}_InputDataEmpty`, `${i} is empty`))
                    }
                    if (typeof (data[i]) !== dataTypes[i]) {
                        throw (replyBody.error(`${apiErrorCode}_InputDataTypeError`, `Incorrect data type => ${i} Not a String`))
                    }
                } else {
                    if (typeof (data[i]) !== dataTypes[i] && data[i] != undefined) {
                        throw (replyBody.error(`${apiErrorCode}_InputDataTypeError`, `Incorrect data type => ${i} Not a String`))
                    }
                }
                break;
            }
            case "number": {
                if (isNaN(data[i])) throw (replyBody.error(`${apiErrorCode}_InputDataTypeError`, `Incorrect data type => ${i} Not a number`))
                if (typeof (Number(data[i])) !== dataTypes[i]) throw (replyBody.error(`${apiErrorCode}_InputDataTypeError`, `Incorrect data type => ${i} Not a number`))
                break;
            }
            case "object": {
                if (typeof (data[i]) !== dataTypes[i]) throw (replyBody.error(`${apiErrorCode}_InputDataTypeError`, `Incorrect data type => ${i} Not an Object`))
                if (checkEmpty && Object.values(data[i]).length < 1) throw (replyBody.error(`${apiErrorCode}_InputDataEmpty`, `${i} is empty`))
                break;
            }
            case "array": {
                if (!Array.isArray(data[i])) throw (replyBody.error(`${apiErrorCode}_InputDataTypeError`, `Incorrect data type => ${i} Not an Array`))
                if (checkEmpty && data[i].length < 1) throw (replyBody.error(`${apiErrorCode}_InputDataEmpty`, `${i} is empty`))
                break;
            }
        }
    }
    return true
}