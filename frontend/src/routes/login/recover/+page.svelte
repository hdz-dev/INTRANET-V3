<script>
	import swal from 'sweetalert';

	let email;

	function recovery(event) {
		event.preventDefault();
		swal({
			title: 'Recuperación de contraseña',
			text: 'La recuperación se habilitará cuando el servicio de autenticación esté conectado.',
			icon: 'info',
			button: 'Continuar'
		});
	}
</script>

<div class="bg-neutral flex h-screen items-center justify-center">
	<div class="flex w-1/3 flex-col items-center rounded-2xl border bg-white p-8 shadow-2xl">
		<img class=" mb-12 h-9" src="../logosx3.png" alt="" />
		<h1 class="mb-12 text-3xl">Restablece tu Contraseña</h1>

		<div>
			<div class="form1" action="">
				<label for="email">Email</label>
				<input
					bind:value={email}
					type="email"
					name="Email"
					id="email"
					class="mt-1 block w-56 rounded-xl border border-gray-300 py-2 pl-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder="Email"
				/>
			</div>
		</div>

		<div class=" m-12">
			<p>A continuación ingresa tu Email.</p>
		</div>

		<div class="btn btn-primary m-5 rounded-full">
			<button type="button" on:click={recovery} class="m-3">Restablecer</button>
		</div>

		<div class="m-8">
			<p>
				Deseas iniciar sesión?
				<a href="/login" class="link link-primary"> INICIAR SESIÓN</a>
			</p>
		</div>
	</div>
</div>
