import * as mongodb from 'mongodb';
import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { username } = request.json();

  const client = new mongodb.MongoClient(process.env.MONGO_URI || 'mongodb+srv://localhost:27017/');
  const db = client.db(process.env.DB_NAME || "blog");

	let users = db.collection('users');

	let user = await users.findOne({ name: username });
	return {
		status: 200,
		body: {
			...user
		},
	};
}
