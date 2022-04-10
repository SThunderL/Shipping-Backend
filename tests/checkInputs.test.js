const checkInputs = require("../common/checkInputs");

test('Checks Parameter types', () => {
    const testParameters = {
        testString: "string",
        testNumber: 3,
        testArray: ["testArray"],
        testObject: { "object": "object" },
    }
    expect(checkInputs(testParameters, true, "TestError")).toBe(true)
})
test('Checks Empty Parameter types', () => {
    const emptyTestParams = {
        testString: "",
        testNumber: 0,
        testArray: [],
        testObject: {},
    }
    expect(checkInputs(emptyTestParams, false, "TestError")).toBe(true)
})
test('Checks Incorrect Parameter types', () => {
    const testParameters = {
        testString: 3,
        testNumber: "3",
        testArray: "testArray",
        testObject: { "object": "object" },
    }
    try {
        checkInputs(testParameters, true, "TestError")
    } catch (err) {
        expect(err.errorCode).toBe("TestError_InputDataTypeError")
    }
})
test('Check Empty String', () => {
    try {
        const emptyTestParams = {
            testString: "",
        }
        checkInputs(emptyTestParams, true, "TestError")
    } catch (err) {
        expect(err.errorCode).toBe("TestError_InputDataEmpty")
    }
})
test('Check Empty Int', () => {
    try {
        const emptyTestParams = {
            testNumber: 0,
        }
        checkInputs(emptyTestParams, true, "TestError")
    } catch (err) {
        expect(err.errorCode).toBe("TestError_InputDataEmpty")
    }
})
test('Check Empty Array', () => {
    try {
        const emptyTestParams = {
            testArray: [],
        }
        checkInputs(emptyTestParams, true, "TestError")
    } catch (err) {
        expect(err.errorCode).toBe("TestError_InputDataEmpty")
    }
})
test('Check Empty Object', () => {
    try {
        const emptyTestParams = {
            testObject: {},
        }
        checkInputs(emptyTestParams, true, "TestError")
    } catch (err) {
        expect(err.errorCode).toBe("TestError_InputDataEmpty")
    }
})