require('dotenv').config()

const express = require('express')
const bodyParser = require("body-parser")
const { MongoClient } = require('mongodb')
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE, NODE_PORT } = process.env
const app = express()
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`
const client = new MongoClient(url)
const collectionName = 'books'

app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('Hello, world')
})
app.get('/books', async function(req, res) {
  await client.connect()
  const db = client.db(MONGO_DATABASE)
  const collection = db.collection(collectionName)
  const books = await collection.find({}).toArray()

  client.close()
  res.json({ data: { books } })
})
app.post('/books', async function(req, res) {
  await client.connect()
  const db = client.db(MONGO_DATABASE)
  const collection = db.collection(collectionName)
  const result = await collection.insertOne(req.body)

  client.close()
  res.json({ data: { result } })
})
app.listen(NODE_PORT)