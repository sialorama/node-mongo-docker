require('dotenv').config()

const express = require('express')
const bodyParser = require("body-parser")
const { MongoClient, ObjectId } = require('mongodb') // Ajout de ObjectId
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE, NODE_PORT } = process.env
const app = express()
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`
const client = new MongoClient(url)
const collectionName = 'books'

app.use(bodyParser.json())

// Route d'accueil
app.get('/', function (req, res) {
  res.send('Welcome !')
})

// Récupérer tous les livres
app.get('/get-all-books', async function(req, res) {
  await client.connect()
  const db = client.db(MONGO_DATABASE)
  const collection = db.collection(collectionName)
  const books = await collection.find({}).toArray()

  client.close()
  res.json({ data: { books } })
})

// Ajouter un livre
app.post('/add-book', async function(req, res) {
  await client.connect()
  const db = client.db(MONGO_DATABASE)
  const collection = db.collection(collectionName)
  const result = await collection.insertOne(req.body)

  client.close()
  res.json({ data: { result } })
})

// Ajouter plusieurs livres
app.post('/add-many-books', async function(req, res) {
  await client.connect()
  const db = client.db(MONGO_DATABASE)
  const collection = db.collection(collectionName)
  const result = await collection.insertMany(req.body)

  client.close()
  res.json({ data: { result } })
})

// Supprimer un livre par ID
app.delete('/delete-book/:id', async function(req, res) {
  try {
    await client.connect();
    const db = client.db(MONGO_DATABASE);
    const collection = db.collection(collectionName);
    // Utilisation correcte de l'ObjectId avec une chaîne (string)
    const bookId = req.params.id;
    // Assure-toi que l'ID est une chaîne valide pour MongoDB
    const result = await collection.deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the book' });
  } finally {
    client.close();
  }
});

// Lancement du serveur
app.listen(NODE_PORT, () => {
  console.log(`Server is running on port ${NODE_PORT}`)
})
