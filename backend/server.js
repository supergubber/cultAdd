const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
// const TodoRoute = require('./routes/todos')
const authRouter = require('./routes/atuhroute')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use(express.static(path.join(_dirname, '/frontend/dist')))
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'))
})
app.get('/', (req, res) => {
  res.send(`<h1>this is homepage baby</h1>`)
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
  connectDB()
})
