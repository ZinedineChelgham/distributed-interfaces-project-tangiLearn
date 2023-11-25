// This file is used to create a in memory database for testing purposes
import { MongoMemoryServer } from "mongodb-memory-server";
const mongod = await MongoMemoryServer.create();

const uri = mongod.getUri();
console.log(uri);
