<script>
	import { onMount } from 'svelte';

	let { open = $bindable(false), title = '', children } = $props();
	let dialogElement;
	let previousOverflow = '';
	let previouslyFocused;

	$effect(() => {
		if (!open || typeof document === 'undefined') return;
		previousOverflow = document.body.style.overflow;
		previouslyFocused = document.activeElement;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previousOverflow;
			if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
		};
	});

	$effect(() => {
		if (open && dialogElement) dialogElement.focus();
	});

	onMount(() => {
		const handleKeydown = (event) => {
			if (!open) return;
			if (event.key === 'Escape') {
				event.preventDefault();
				open = false;
				return;
			}
			if (event.key !== 'Tab' || !dialogElement) return;
			const focusable = dialogElement.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-[70] bg-slate-900/35 backdrop-blur-[2px]"
		role="presentation"
		onclick={(event) => event.currentTarget === event.target && (open = false)}
	>
		<aside
			bind:this={dialogElement}
			class="ml-auto flex h-full w-full max-w-md flex-col border-l border-white/60 bg-white/90 shadow-2xl backdrop-blur-xl"
			role="dialog"
			aria-modal="true"
			aria-label={title}
			tabindex="-1"
		>
			<header class="flex items-center justify-between border-b border-gray-200/70 px-5 py-4">
				<h2 class="text-lg font-semibold text-gray-900">{title}</h2>
				<button
					type="button"
					class="rounded-lg px-2 py-1 text-xl text-gray-500 hover:bg-gray-100"
					aria-label="Cerrar panel"
					onclick={() => (open = false)}>×</button
				>
			</header>
			<div class="min-h-0 flex-1 overflow-y-auto p-5">{@render children()}</div>
		</aside>
	</div>
{/if}
