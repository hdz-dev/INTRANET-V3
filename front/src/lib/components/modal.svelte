<script>
	import { createEventDispatcher } from 'svelte';

	export let isModalOpen = false;
	export let title = 'Confirmar acción';
	export let message = '';
	export let confirmLabel = 'Confirmar';
	export let cancelLabel = 'Cancelar';
	export let tone = 'primary';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('cancel');
	}

	function confirmAction() {
		dispatch('confirm');
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') closeModal();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isModalOpen}
	<div class="fixed h-full inset-0 z-[60] flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-[0px]" role="presentation" on:click={closeModal}>
		<section
			class="w-full max-w-md rounded-xl borderx bg-white/90 p-5 shadow-2xl"
			class:border-red-200={tone === 'danger'}
			class:border-green-200={tone === 'success'}
			class:border-blue-200={tone === 'primary'}
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			on:click|stopPropagation
		>
			<div class="flex items-start justify-between gap-4">
				<h2 id="modal-title" class="m-0 text-lg font-bold text-gray-900">{title}</h2>
				<button type="button" class="rounded-md px-1.5 py-0.5 text-xl leading-none text-gray-500 hover:bg-gray-100" aria-label="Cerrar" on:click={closeModal}>×</button>
			</div>
			{#if message}<p class="mt-2 text-sm leading-6 text-gray-600">{message}</p>{/if}
			<div class="mt-5 flex justify-end gap-2">
				<button type="button" class="rounded-md border border-gray-300 px-3.5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50" on:click={closeModal}>{cancelLabel}</button>
				<button
					type="button"
					class="rounded-md px-3.5 py-2 text-sm font-semibold text-white"
					class:bg-red-700={tone === 'danger'}
					class:hover:bg-red-800={tone === 'danger'}
					class:bg-green-700={tone === 'success'}
					class:hover:bg-green-800={tone === 'success'}
					class:bg-blue-600={tone === 'primary'}
					class:hover:bg-blue-700={tone === 'primary'}
					on:click={confirmAction}>{confirmLabel}</button
				>
			</div>
		</section>
	</div>
{/if}
