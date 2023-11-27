require('express-async-errors')
require("dotenv/config")
const express = require('express')
const cors = require("cors");

const AppError = require('./utils/AppError')
const database = require('./database/sqlite')
const uploadConfigs = require("./configs/upload");

const app = express()

app.use(cors());

app.use(express.json())

app.use("/files", express.static(uploadConfigs.UPLOAD_FOLDER));

const routes = require('./routes')

app.use(routes)

database()

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))