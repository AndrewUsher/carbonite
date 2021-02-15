// Import Dependencies
import url from 'url'
import mongoose, { Connection } from 'mongoose'
import { VercelRequest, VercelResponse } from '@vercel/node'

// Create cached connection variable
let cachedDb: Connection | null = null

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase (uri): Promise<Connection> {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }
  const client = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  cachedDb = client
  return client
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase(process.env.DATABASE_URL)
  const favoritesCollection = db.collection('favorites')
  const sessionsCollection = db.collection('sessions')
  console.log(req.cookies['next-auth.session-token'])
  console.log(req.cookies)

  sessionsCollection.findOne({ sessionToken: req.cookies['next-auth.session-token'] }, (err, session) => {
    if (err) console.log(err)
    const { userId = 'jdfsajfd' } = session || {}

    db.collection('favorites').findOne({ itemId: req.body.itemId }, async (err, item) => {
      if (err) {
        console.log(err)
        res.status(500).json({ err })
      }
      if (item === null) {
        favoritesCollection.insertOne({ itemId: req.body.itemId, users: userId.toString() })
        res.status(200).json({ message: 'Added to favorites' })
      } else {
        const currentUsersList = item.users.split(',')
        if (currentUsersList.includes(userId.toString())) {
          res.status(202).json({
            message: 'This item has already been added to favorites'
          })
        } else {
          const newUsersList = currentUsersList.concat(userId.toString()).join(',')
          item.users = newUsersList
          favoritesCollection.updateOne({ _id: item._id }, { $set: { users: newUsersList } })
          res.status(200).json({ hi: 'hj' })
        }
      }
    })
  })

  // Select the "users" collection from the database

  // Respond with a JSON string of all users in the collection
}
