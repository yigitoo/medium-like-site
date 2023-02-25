<script context="module">
import dotenv from 'dotenv'
import * as mongodb from 'mongodb'
import { getUserByName } from '../api/_db' 
dotenv.config();

export async function load({ params }) {
  const user = await getUserByName(params.username)
  if (user) {
    return {
      status: 200,
      ...user
    }
  } else {
    throw Error("User not found!");
  }
}
</script>
<script>
	export let data;
</script>

{data.name}
