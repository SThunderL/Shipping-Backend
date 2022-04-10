const unifyDimentions = require("../../../../routes/shipping/common/unifyDimentions")

test("unify test data according to carrierId Metric to Imperial", () => {
    const dimentions = {
        "length": 1,
        "width": 1,
        "height": 1,
        "weight": 1,
        "unitSystem": "imperial"
    }
    const newDimentions = unifyDimentions(dimentions, "fedexAIR", "UnifyTestError")
    expect(newDimentions.dimentions.length).toBeCloseTo(3.3, 0.1)
})
test("unify test data according to carrierId", () => {
    const dimentions = {
        "length": 1,
        "width": 1,
        "height": 1,
        "weight": 1,
    }
    let newDimentions = unifyDimentions(dimentions, "UPS2DAY", "UnifyTestError")
    expect(newDimentions.dimentions.length).toBe(1)
})

test("unify test: check service system", () => {
    const dimentions = {
        "length": 1,
        "width": 1,
        "height": 1,
        "weight": 1,
    }
    let newDimentions = unifyDimentions(dimentions, "UPS2DAY", "UnifyTestError")
    expect(newDimentions.serviceSystem).toBe("ups")
})