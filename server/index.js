const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')

const uri =
  'mongodb+srv://erhamza:1zh6uLlrPFdJcV76@newton-mongo.omg25rb.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)

app.use(
  session({
    secret: '_my_secret',
    cookie: {
      expires: 60 * 1000,
    },
  })
)

const db = mongoose.createConnection(uri)

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
})

const userModel = db.model('user', userSchema)
const SALT = 5

const AuthMiddleware = async (req, res, next) => {
  console.log('Session', req.session.userId)
  if (!req.session.userId) {
    res.status(401).send({ err: 'Unauthorized' })
  } else {
    next()
  }
}

app.post('/signup', async function (req, res) {
  const { name, userName, email, password } = req.body
  const existingUser = await userModel.findOne({ userName: userName })
  const existingEmail = await userModel.findOne({ email: email })
  if (!existingUser && !existingEmail) {
    const hashedPassword = bcrypt.hashSync(password, SALT)
    const newUser = new userModel({
      name: name,
      userName: userName,
      email: email,
      password: hashedPassword,
    })
    await newUser.save()
    req.session.userId = newUser._id
    res
      .status(200)
      .send({message: `user created successfully ${userName} with email ${email}`,newUser})
  } else {
    res.status(400).send({
      error: `Username ${userName} with ${email} already exists.`,
    })
  }
})

app.post('/login', async function (req, res) {
  const { userName, password } = req.body
  const existingUser = await userModel.findOne({
    userName: userName,
  })

  let arePasswordSame = false
  if (existingUser) {
    arePasswordSame = bcrypt.compareSync(password, existingUser.password)
  }
  if (!existingUser || !arePasswordSame) {
    res
      .status(401)
      .send({ error: 'username/password incorrect' })
  } else {
    req.session.userId = existingUser._id
    res.status(200).send({ message: 'logged In' , existingUser})
  }
})

app.post('/logout', async function (req, res) {
  session.destroy(() => {
    res.status(200).send('you are logged out')
  })
})

app.post('/start-game', async function (req, res) {
  const email = req.body.email
  const existingEmail = await userModel.findOne({ email: email })
  if (existingEmail) {
    res.status(200).send(existingEmail)
  } else {
    res.status(404).send('user not found')
  }
})

app.get('/user', AuthMiddleware, async function (req, res) {
  console.log('user id', req.session.userId)
  const userInfo = await userModel.findOne({ _id: req.session.userId })
  if (userInfo) {
    res.status(200).send(userInfo)
  } else {
    res.status(404).send('user not found')
  }
})

app.listen(8080, () => {
  console.log('server running on ', 8080)
})
