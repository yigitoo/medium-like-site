<script>
	export let data;
	function defineVariables() {
		if (data.status != 200) {
			let { user } = data;
		} else {
			let { message } = data;
		}

		return [user, message];
	}
	let [user, message] = defineVariables();
</script>

{#if data.status != 200}
	{message}
{:else}
  {user.name}
{/if}
{data.name}
