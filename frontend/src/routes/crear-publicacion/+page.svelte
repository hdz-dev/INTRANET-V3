<script>
	import Editor from '$lib/components/editor.svelte';
</script>

<main
	class="h-screen max-h-screen min-h-screen justify-end overflow-y-auto bg-[url('/src/lib/assets/bg-2.jpg')] bg-cover bg-center bg-repeat p-6"
>
	<h1 class="mb-4 text-center text-xl font-semibold text-gray-800">
		Crea y comparte con toda la organización
	</h1>

	<div class="mx-auto max-w-[1080px]">
		<Editor />
	</div>
</main>
