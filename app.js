const express = require('express')
const ddos = require('ddos')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({ path: "./config/config.env" })

const db = require('./database/createTables')

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')) // shows requested urls
}
app.use(cors())
app.use(new ddos({ burst: 20, limit: 30 }).express)

app.use(express.json())
// app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/'))


const PORT = process.env.PORT || 5000
app.listen(PORT, "0.0.0.0", console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))