<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	$: navigation = [
		{
			href: '/',
			name: 'Home',
		},
		{
			href: '/search',
			name: `Search and explore ${$session.user ? '' : '(🔒)'}`,
		},
	];

	async function handleSignOut() {
		await fetch('/api/sign-out');
		$session = {};
		await goto('/login');
	}
</script>

<header class="bg-indigo-600">
	<nav class="container mx-auto">
		<div class="w-full py-4 flex items-center justify-between">
			<div class="flex items-center">
				<div class="ml-10 space-x-8">
					{#each navigation as link}
						<a href={link.href} class="text-lg font-medium text-white hover:text-indigo-50">
							{link.name}
						</a>
					{/each}
				</div>
			</div>
			<div class="ml-10 space-x-4">
				{#if $session.user}
					<a href="/profile/{$session.user.name}">
						<button
							class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
						>
							<b>{$session.user.name}</b>
						</button>
					</a>
					<button
						on:click={handleSignOut}
						class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
					>
						Sign out
					</button>
				{:else}
					<a
						href="/login"
						class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
					>
						Login
					</a>
					<a
						href="/sign-up"
						class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
					>
						Sign up
					</a>
				{/if}
				<span class="mx-10 px-1" />
			</div>
		</div>
	</nav>
</header>
