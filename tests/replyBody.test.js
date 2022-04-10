const replyBody = require("../common/replyBody");

test('Generates a replyBody without any data', () => {
    expect(replyBody.done({}, {})).toStrictEqual({
        "errorCode": "",
        "message": "",
        "data": {},
        "error": false
    })
})

test('Generates a replyBody without any data', () => {
    const data = {
        dummyData: "dummyData"
    }
    expect(replyBody.done(data, {}).data).toStrictEqual({
        dummyData: "dummyData"
    })
})

test('Generates a replyBody Error without a message', () => {
    const error = "TestingError_ReplyBody"
    expect(replyBody.error(error, "Error Testing")).toStrictEqual({
        "errorCode": error,
        "message": "Error Testing",
        "data": {},
        "error": true
    })
})