<script>
	import { authUser } from '$lib/api/auth.js';

	let email = '';
	let password = '';
	let errorMessage = '';
	let isSubmitting = false;
	let showPassword = false;

	async function handleLogin() {
		errorMessage = '';
		if (!email.trim() || !password) {
			errorMessage = 'Ingresa tu usuario y contraseña.';
			return;
		}
		isSubmitting = true;
		try {
			await authUser(email.trim(), password);
		} catch {
			errorMessage = 'No fue posible iniciar sesión. Verifica tus credenciales e inténtalo nuevamente.';
		} finally {
			isSubmitting = false;
		}
	}
</script>


<main
	class="min-h-screenx h-screenx bg-centerx flex items-center justify-end bg-cover bg-no-repeat"
	style="background-image: url('/src/lib/assets/1.png'); "
>
	<container class="flex h-screen items-center justify-center p-6">
		<section class="glass flex h-full w-full flex-col items-center rounded-2xl border p-8 shadow-md lg:h-5/6 lg:w-96">
			<img
				style="filter: drop-shadow(0 0 0.90rem black);"
				class=" mb-9 h-16 w-auto drop-shadow-md"
				src="/logo1.png"
				alt=""
			/>

			<h1 class="text-primary mb-5 text-3xl">Inicia Sesión</h1>
			<form class="w-60" on:submit|preventDefault={handleLogin} novalidate>
				<label class="text-secondary block font-medium" for="email">Usuario</label>
				<input bind:value={email} id="email" name="email" type="email" autocomplete="username" required placeholder="Usuario" class="text-secondary focus:border-primary focus:ring-primary mt-1 mb-4 block w-full rounded-xl border border-gray-300 bg-white py-2 pl-3 shadow-sm focus:outline-none sm:text-sm" />
				<label class="text-secondary block font-medium" for="password">Contraseña</label>
				<div class="relative mb-4">
					<input bind:value={password} id="password" name="password" type={showPassword ? 'text' : 'password'} autocomplete="current-password" required placeholder="Contraseña" class="text-secondary focus:border-primary focus:ring-primary mt-1 block w-full rounded-xl border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm" />
					<button type="button" class="absolute inset-y-0 right-0 px-3 text-sm text-gray-600" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} on:click={() => (showPassword = !showPassword)}>{showPassword ? 'Ocultar' : 'Ver'}</button>
				</div>
				{#if errorMessage}<p role="alert" class="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>{/if}
				<button type="submit" disabled={isSubmitting} class="bg-primary text-base-300 text-md w-full rounded-full px-6 py-2 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Autenticando...' : 'Inicia sesión'}</button>
			</form>
			<!-- <div class="m-12">
    <a href="/login/recover" class="link link-primary"
      >¿Olvidaste tu contraseña? </a
    >
  </div> -->
			<div class="mb-8"></div>
		</section>
	</container>
</main>


// End of login page component