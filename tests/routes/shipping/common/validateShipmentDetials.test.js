const validateShipmentDetials = require("../../../../routes/shipping/common/validateShipmentDetials")

test("validate shipment details", () => {
    const dimentions = {
        "length": 1,
        "width": 1,
        "height": 1,
        "weight": 1,
        "unitSystem": "imperial"
    }
    try {
        const checked = validateShipmentDetials(dimentions, "fedexAIR", "UnifyTestError")
        expect(checked).toBeUndefined()
    } catch (err) {
        expect(true).toBe(false)
    }
})

test("validateShipmentDetails Invalid CarrierId", () => {
    const dimentions = {
        "length": 1,
        "width": 1,
        "height": 1,
        "weight": 1,
        "unitSystem": "imperial"
    }
    try {
        validateShipmentDetials(dimentions, "feAIR", "UnifyTestError")
        expect(true).toBe(false)
    } catch (err) {
        expect(err.errorCode).toBe("UnifyTestError_InvalidServiceId")
    }
})

test("validateShipmentDetails: Incorrect dimentions length", () => {
    const dimentions = {
        "length": -1,
        "width": 0,
        "height": -1,
        "weight": 1,
        "unitSystem": "imperial"
    }
    try {
        validateShipmentDetials(dimentions, "fedexAIR", "UnifyTestError")
        expect(true).toBe(false)
    } catch (err) {
        expect(err.errorCode).toBe("UnifyTestError_InvalidDimention")
    }
})

test("validateShipmentDetails: InvalidDimentionUnit", () => {
    const dimentions = {
        "length": 1,
        "width": 1,
        "height": 1,
        "weight": 1,
        "unitSystem": "incorrect"
    }
    try {
        validateShipmentDetials(dimentions, "fedexAIR", "UnifyTestError")
        expect(true).toBe(false)
    } catch (err) {
        expect(err.errorCode).toBe("UnifyTestError_InvalidDimentionUnit")
    }
})

test("validateShipmentDetails: InputDataNotFound", () => {
    const dimentions = {
        "length": 1,
        "width": 1,
        "weight": 1,
    }
    try {
        validateShipmentDetials(dimentions, "fedexAIR", "UnifyTestError")
        expect(true).toBe(false)
    } catch (err) {
        expect(err.errorCode).toBe("UnifyTestError_InputDataNotFound")
    }
})

test("validateShipmentDetails: InputDataTypeError", () => {
    const dimentions = {
        "length": "hello",
        "width": 1,
        "height": 1,
        "weight": 1,
        "unitSystem": "incorrect"
    }
    try {
        validateShipmentDetials(dimentions, "fedexAIR", "UnifyTestError")
        expect(true).toBe(false)
    } catch (err) {
        expect(err.errorCode).toBe("UnifyTestError_InputDataTypeError")
    }
})

test("validateShipmentDetails: InputDataEmpty", () => {
    const dimentions = {}
    try {
        validateShipmentDetials(dimentions, "fedexAIR", "UnifyTestError")
        expect(true).toBe(false)
    } catch (err) {
        expect(err.errorCode).toBe("UnifyTestError_InputDataEmpty")
    }
})