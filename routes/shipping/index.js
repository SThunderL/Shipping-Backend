const express = require('express')
const router = express.Router()

router.use('/sendShipment', require('./sendShipment'))
router.use('/', require('./getShipmentDetails'))

module.exports = router