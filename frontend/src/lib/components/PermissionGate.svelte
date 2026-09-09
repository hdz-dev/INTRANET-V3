<script>
	export let permission = '';
	export let userPermissions = [];

	$: allowed = !permission || userPermissions.includes(permission);
</script>

{#if allowed}
	<slot />
{/if}
