import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache | undefined = (global as { mongoose?: MongooseCache }).mongoose;

if (!cached) {
  cached = (global as { mongoose?: MongooseCache }).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!cached) {
    throw new Error('MongoDB connection cache not initialized');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'wedding',
    };

    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  }

  return cached.conn;
}

export default dbConnect; 