import { v4 as uuidv4 } from 'uuid';
import * as mongodb from 'mongodb';
import User from './db/user';

const client: mongodb.MongoClient = new mongodb.MongoClient(process.env.MONGO_URI || 'mongodb+srv://localhost:27017/');
await client.connect();
const db: mongodb.Db = client.db(process.env.DB_NAME || "blog");

let users: User[] = (await db.collection<User>('users').find<User>({}).toArray()) as User[];
$: users = (await db.collection<User>('users').find<User>({}).toArray()) as User[];

let sessions: { id: string; email: any }[] = [];

export const getUserByEmail = async (email) => {
	const existingUser = users.find((user) => user.email === email);
	if (!existingUser) return Promise.resolve(null);
	return Promise.resolve(existingUser);
};

export const registerUser = (user) => {
	const existingUser = users.find((u) => (u.email === user.email) && (u.name === user.name));
	if (existingUser) return Promise.reject(new Error('User already exists'));
	users.push(user);
	return Promise.resolve(user);
};

export const createSession = (email) => {
	const session = {
		id: uuidv4(),
		email,
	};
	sessions.push(session);
	return Promise.resolve(session);
};

export const getSession = (id) => {
	const session = sessions.find((session) => session.id === id);
	if (!session) return Promise.resolve(null);
	return Promise.resolve(session);
};

export const removeSession = (id) => {
	const session = sessions.find((session) => session.id === id);
	if (!session) return Promise.reject(new Error('Session not found'));
	sessions = sessions.filter((session) => session.id !== id);
	return Promise.resolve(session);
};
