<script context="module">
export async function load({ fetch, params }) {
  const response = await fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify({ username: params.username }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  if (response.ok) {
    return {
      status: 200,
      user: body
    }
  } else {
    throw Error("User not found!");
  }
}
</script>
<script>
  import { page } from "$app/stores";
</script>

<div>
{JSON.stringify($page.data)}
</div>