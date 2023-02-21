<script context="module">	
	export async function load({ session }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/sign-in',
			};
		}
		return {
			props: {
				user: session.user,
			},
		};
	}
</script>

<script>
	import Title from '$lib/components/Title.svelte';
	// import { session } from '$app/stores';
	// $session.user;
</script>
<Title val="Search Page"/>
<h1 class="text-2xl font-semibold text-center">Search page!</h1>
{props.user}