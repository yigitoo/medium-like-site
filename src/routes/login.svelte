<script>
	import SignInForm from '$lib/components/SignInForm.svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import Title from '$lib/components/Title.svelte';

	let error;

	async function handleSubmit({ detail: { email, password } }) {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const body = await response.json();
		if (response.ok) {
			// session from getSession hook will otherwise not be set before navigation
			// that would trigger redirect from /protected back to /login
			$session = body;
			await goto('/');
		}
		error = body.message;
	}
</script>

<Title val="Login Page" />
<h1 class="text-2xl font-semibold text-center">Login</h1>
{#if error}
	<p class="mt-3 text-red-500 text-center font-semibold">{error}</p>
{/if}
<SignInForm class="max-w-xl mx-auto mt-8" on:submit={handleSubmit} />
