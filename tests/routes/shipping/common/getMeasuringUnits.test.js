const getMeasuringUnits = require("../../../../routes/shipping/common/getMeasuringUnits");

test("Test Incorrect carrierId measuring system", () => {
    try {
        getMeasuringUnits("PS", "TestError")
    } catch (err) {
        expect(err.errorCode).toBe("TestError_InvalidCarrierId")
    }
})
test("Get correct measuring system", () => {
    expect(getMeasuringUnits("fedexAIR", "TestError")).toStrictEqual({
        "system": "fedEx",
        "type": "metric",
        "weight": "grams",
        "length": "cm"
    })
})