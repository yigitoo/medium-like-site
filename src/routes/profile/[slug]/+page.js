require('dotenv').config();
const mongodb = require('mongodb');

const findUser = async (username) => {
  const client = mongodb.MongoClient(process.env.MONGO_URI || "mongodb+srv://localhost:27017");
  const database = client.db(process.env.DB_NAME || "blog");
  const users = database.collection(process.env.USERS_COLLECTION || "users");

  const query = { name: username };
  const options = {};

  const user = await users.findOne(query, options);
  return user;
}

export async function load({ params }) {
  const user = findUser(params.slug);

  return {
    status: 200,
    user: user
  }
   /*
  return {
    status: 404,
    message: "f*ck men!"
  } */
}