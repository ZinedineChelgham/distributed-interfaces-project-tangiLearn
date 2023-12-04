// This file is used to create a in memory database for testing purposes
import { MongoMemoryServer } from "mongodb-memory-server";
await MongoMemoryServer.create({
  instance: {
    port: 27017,
  },
});
