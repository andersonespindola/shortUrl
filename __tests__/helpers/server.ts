import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const createdDatabase = MongoMemoryServer.create()

/**
 * Connect to the in-memory database.
 */
export const connectDatabase = async () => {
  const mongod = (await createdDatabase).getUri()

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  await mongoose.connect(mongod, mongooseOpts)
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await (await createdDatabase).stop()
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

jest.setTimeout(20000)
