<script>
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	import { createEventDispatcher } from 'svelte';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let username = '';
	let category = '';
	let error; 
	let confirmPasswordInputRef;

	const dispatch = createEventDispatcher();

	function submit() {
		error = null;
		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			confirmPasswordInputRef.focus();
			return;
		}

		dispatch('submit', {
			email,
			username,
			password,
			category
		});
	}
</script>

<form on:submit|preventDefault={submit} class="space-y-5 {$$props.class}">
	<Input label="Email" id="email" name="email" type="email" bind:value={email} />
	<Input label="Username" id="username" name="username" type="text" bind:value={username} />
	<Input label="Category" id="category" name="category" type="text" bind:value={category} />
	<Input label="Password" id="password" name="password" type="password" bind:value={password} />
	<Input
		label="Confirm Password"
		id="confirm-password"
		name="confirm-password"
		type="password"
		bind:value={confirmPassword}
		bind:inputRef={confirmPasswordInputRef}
	/>
	{#if error}
		<p class="text-red-600 text-sm font-semibold">{error}</p>
	{/if}
	<Button type="submit">Sign Up</Button>
</form>
