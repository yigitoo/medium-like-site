import { getUserById } from "../../api/_db";
import * as mongodb from 'mongodb';
import User from '../../api/db/user';
import type { PageLoad } from './$types';

export interface ProfileData {
  user: User,
  id: string
}

export const load = (async ({ params, session }) => {
  if (!session) {
    return {
      status: 302,
      redirect: '/sign-in',
    };
  }
  
  const id  = params.slug;

  const client: mongodb.MongoClient = new mongodb.MongoClient(process.env.MONGO_URI || 'mongodb+srv://localhost:27017/');
  await client.connect();
  
  const db: mongodb.Db = client.db(process.env.DB_NAME || "blog");
  
  const user = db.collection<User>('users').findOne({ _id: new mongodb.ObjectId(id) });
  if (!user) {
    return {
      status: 404,
      body: {
        message: 'user not found'
      },
    }
  } else {
    return {
      user: user,
      id: id
    }
  }
}) satisfies PageLoad;