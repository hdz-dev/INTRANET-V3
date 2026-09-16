<script>
	import { onMount } from 'svelte';

	let {
		open = $bindable(false),
		title = '',
		labelledBy = 'mipg-modal-title',
		children,
		footer
	} = $props();
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

	function close() {
		open = false;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			event.preventDefault();
			close();
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
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
		role="presentation"
		onclick={(event) => event.currentTarget === event.target && close()}
	>
		<section
			bind:this={dialogElement}
			class="flex max-h-[min(720px,calc(100vh-2rem))] w-full max-w-lg flex-col rounded-2xl border border-white/70 bg-white/95 shadow-2xl outline-none"
			role="dialog"
			aria-modal="true"
			aria-labelledby={labelledBy}
			tabindex="-1"
		>
			<header class="flex items-start justify-between gap-4 border-b border-gray-200/70 px-5 py-4">
				<h2 id={labelledBy} class="text-lg font-semibold text-gray-900">{title}</h2>
				<button
					type="button"
					class="focus-visible:ring-primary rounded-lg px-2 py-1 text-xl leading-none text-gray-500 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2"
					aria-label="Cerrar modal"
					onclick={close}>×</button
				>
			</header>
			<div class="min-h-0 flex-1 overflow-y-auto p-5">{@render children?.()}</div>
			{#if footer}<footer class="border-t border-gray-200/70 px-5 py-4">
					{@render footer()}
				</footer>{/if}
		</section>
	</div>
{/if}
