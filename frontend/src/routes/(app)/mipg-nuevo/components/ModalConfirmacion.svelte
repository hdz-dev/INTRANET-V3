<script>
	import ModalBase from './ModalBase.svelte';

	let {
		open = $bindable(false),
		title = 'Confirmar acción',
		message = 'Esta acción no se puede deshacer.',
		confirmLabel = 'Confirmar',
		cancelLabel = 'Cancelar',
		tone = 'danger',
		onConfirm = () => {},
		onCancel = () => {}
	} = $props();

	function cancel() {
		open = false;
		onCancel();
	}

	function confirm() {
		open = false;
		onConfirm();
	}
</script>

<ModalBase bind:open {title}>
	<p class="text-sm leading-6 text-gray-600">{message}</p>
	<div class="mt-6 flex justify-end gap-3">
		<button
			type="button"
			class="focus-visible:ring-primary rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2"
			onclick={cancel}>{cancelLabel}</button
		>
		<button
			type="button"
			class="rounded-xl px-4 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
			class:bg-red-700={tone === 'danger'}
			class:hover:bg-red-800={tone === 'danger'}
			class:focus-visible:ring-red-600={tone === 'danger'}
			class:bg-primary={tone !== 'danger'}
			class:hover:brightness-95={tone !== 'danger'}
			class:focus-visible:ring-primary={tone !== 'danger'}
			onclick={confirm}>{confirmLabel}</button
		>
	</div>
</ModalBase>
