<script>
	import Loader from '$lib/components/loader.svelte';
	import { onMount } from 'svelte';
	import { backClose } from '$lib/stores/state.js';

	export let data;

	let liqStore = data.data;

	// formatea numeros tipo moneda
	const formatter = new Intl.NumberFormat('in-IN', {
		maximumFractionDigits: 0
	});

	async function loadImage(url) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = url;
		});
	}

	let imageUrl;
	let imageLoaded = false;

	async function loadAndDisplayImage() {
		try {
			imageUrl = await liqStore.code;
			await loadImage(imageUrl);
			imageLoaded = true;
		} catch (error) {
			console.error('Error al cargar la imagen', error);
		}
	}

	onMount(loadAndDisplayImage);
</script>

{#if imageLoaded}
	<!-- contenedor  -->

	<div id="body" class=" border-gray m-auto h-[11in] w-[8.5in] border-x px-[0.5in]">
		<!-- ENCABEZADO -->

		<div id="page-header" class="m-auto h-[1in] w-[190mm] bg-white">
			<div class="h-[0.1in]" />

			<div class="flex flex-row rounded-2xl border-2 border-black" id="">
				<div class="basis-9/12 border-black py-0 text-center">
					<p class="p-0 text-[13px] font-bold">
						SECRETARIA DE TRANSITO Y TRANSPORTE MUNICIPAL JAMUNDI VALLE
					</p>

					<div class="datos-encabezado mt-2 flex">
						<div class="espacio ml-3" />

						<div class=" w-auto flex-col text-left">
							<p class="text-[9px] font-bold">Codigo:</p>
							<p class="text-[9px] font-bold">Telefono:</p>
						</div>

						<div class=" mx-1 w-auto flex-col text-left">
							<p class="text-[9px]">76364000 - 800197224</p>
							<p class="text-[9px]">5190969</p>
						</div>

						<div class=" mx-1 w-auto flex-col text-left font-bold">
							<p class="text-[9px]">Dirección:</p>
							<p class="text-[9px]">Pagina Web:</p>
						</div>

						<div class=" mx-1 w-auto flex-col text-left">
							<p class="text-[9px]">Centro Comercial Caña Dulce</p>
							<p class="text-[9px]">www.jamundi.gov.co</p>
						</div>

						<div class=" mx-1 w-auto flex-col text-left font-bold">
							<p class="text-[9px]">Email:</p>
							<p class="text-[9px]" />
						</div>

						<div class=" mx-1 w-auto flex-col text-left">
							<p class="text-[9px]">secretaria.transito@jamundi.gov.co</p>
							<p class="text-[9px]" />
						</div>
					</div>
				</div>

				<div class="basis-3/12">
					<img
						class="m-auto my-1 h-12 w-auto"
						src="./logo_transito.png"
						alt="Logo Secretaría de Tránsito"
						on:load={() => {
							close(($backClose = true)); //////////////////////////////////
						}}
					/>
				</div>
			</div>
		</div>

		<!-- TABLA LIQUIDACION -->

		<!-- -->

		<div id="container factura" class="relative h-auto w-full border-2 border-black">
			<div
				style="top: -1rem;"
				class=" absolute top-0 left-1/2 z-10 flex w-[679px] -translate-x-1/2 transform flex-row rounded-2xl border-2 border-black bg-white text-center"
			>
				<p class="ml-3 w-full basis-1/5 text-left text-[10px] font-bold">RECIBO DE PAGO</p>
				<p class="w-full basis-2/5 text-right text-[10px] font-bold">Funcionario:</p>
				<p class=" basis-2/5 pl-3 text-left text-[9px]">
					{liqStore.funcionario || ' NO DEFINIDO '}
				</p>
			</div>

			<div class="m-4 my-[2px] mt-2 flex flex-row items-center">
				<p class="basis-1/5 px-3 text-[11px] font-bold">EXPEDICIÓN</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaExp).toLocaleDateString() || ' NO DEFINIDO '}
				</p>
				<p class="basis-1/5 px-3 text-left text-[11px] font-bold">FECHA DE PAGO</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaPag).toLocaleDateString() || ' NO DEFINIDO '}
				</p>
				<div class="mx-2 my-1 flex w-36 basis-1/5 rounded-full border border-black">
					<p class="px-3 text-left text-[11px] font-bold">Nro</p>
					<p class="px-3 text-right text-[11px]">
						{liqStore.serieNro.toString().padStart(5, '0') || ' NO DEFINIDO '}
					</p>
				</div>
			</div>

			<div class="flex p-4 py-0">
				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/3 border-r-2 border-black px-3 text-[11px] font-bold">SOLICITANTE</p>
					<p class="basis-1/3 px-3 text-[11px]">Indentificacion</p>
					<p class="basis-1/3 border-l-2 border-black px-3 text-right text-[11px]">
						{liqStore.identificacion || ' NO DEFINIDO '}
					</p>
				</div>

				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/5 border-r-2 border-black px-3 text-[11px]">Nombre</p>
					<p class="basis-4/5 border-black px-3 text-center text-[11px]">
						{liqStore.nombre || ' NO DEFINIDO '}
					</p>
				</div>
			</div>

			<div class="w-full p-4">
				<div class="flex w-full flex-row rounded-2xl border-2 border-black text-center font-bold">
					<p class="w-full basis-2/5 text-[10px]">TRÁMITE</p>
					<p class="w-full basis-2/5 text-[10px]">CONCEPTO</p>
					<p class="w-full basis-1/5 text-[10px]">VALOR</p>
				</div>

				<div class="flex w-[727px] justify-end">
					<div
						class=" h-0 w-[85px] -rotate-90 pl-6 text-left text-[10px]"
						style=" writingMode: 'vertical-rl'; "
					>
						CLIENTE
					</div>
				</div>

				<table class=" w-full border border-black">
					<tbody class="divide divide-black">
						{#each liqStore.tarifas as cont, index (cont.id || index)}
							<tr class="flex flex-row">
								<td class="basis-2/5 border-t border-r border-black p-0">
									<p class="text-left text-[8px]">
										{cont.tramite || ' NO DEFINIDO '}
									</p>
								</td>

								<td class="basis-2/5 border-t border-r border-black p-0">
									<p class="text-[8px]">
										{cont.concepto || ' NO DEFINIDO '}
									</p>
								</td>

								<td class="basis-1/5 border-t border-black p-0">
									<p class="text-right text-[8px]">
										{cont.valor.toLocaleString(formatter) || ' NO DEFINIDO '}
									</p>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<div class="my-[2px] flex flex-row items-center border-2 border-black">
					<p class="basis-1/4 px-3 text-[11px] font-bold">Banco</p>
					<p class="basis-1/4 px-3 text-left text-[11px]">
						{liqStore.banco || ' NO DEFINIDO '}
					</p>
					<p class="basis-1/4 px-3 text-right text-[11px] font-bold">VALOR TOTAL A</p>
					<div class="mx-2 my-1 w-36 basis-1/4 rounded-full border border-black">
						<p class="px-3 text-right text-[11px]">
							${liqStore.valTotal.toLocaleString(formatter) || ' NO DEFINIDO '}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class=" mt-2 mb-7 border border-dashed border-black" />

		<!-- -->
		<!-- -->

		<div id="container factura" class="relative h-auto w-full border-2 border-black">
			<div
				style="top: -1rem;"
				class=" absolute top-0 left-1/2 z-10 flex w-[679px] -translate-x-1/2 transform flex-row rounded-2xl border-2 border-black bg-white text-center"
			>
				<p class="ml-3 w-full basis-1/5 text-left text-[10px] font-bold">RECIBO DE PAGO</p>
				<p class="w-full basis-2/5 text-right text-[10px] font-bold">Funcionario:</p>
				<p class=" basis-2/5 pl-3 text-left text-[9px]">{liqStore.funcionario}</p>
			</div>

			<div class="m-4 my-[2px] mt-2 flex flex-row items-center">
				<p class="basis-1/5 px-3 text-[11px] font-bold">EXPEDICIÓN</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaExp).toLocaleDateString()}
				</p>
				<p class="basis-1/5 px-3 text-left text-[11px] font-bold">FECHA DE PAGO</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaPag).toLocaleDateString()}
				</p>
				<div class="mx-2 my-1 flex w-36 basis-1/5 rounded-full border border-black">
					<p class="px-3 text-left text-[11px] font-bold">Nro</p>
					<p class="px-3 text-right text-[11px]">{liqStore.serieNro.toString().padStart(5, '0')}</p>
				</div>
			</div>

			<div class="flex p-4 py-0">
				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/3 border-r-2 border-black px-3 text-[11px] font-bold">SOLICITANTE</p>
					<p class="basis-1/3 px-3 text-[11px]">Indentificacion</p>
					<p class="basis-1/3 border-l-2 border-black px-3 text-right text-[11px]">
						{liqStore.identificacion}
					</p>
				</div>

				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/5 border-r-2 border-black px-3 text-[11px]">Nombre</p>
					<p class="basis-4/5 border-black px-3 text-center text-[11px]">
						{liqStore.nombre}
					</p>
				</div>
			</div>

			<div class="w-full p-4">
				<div class="flex w-full flex-row rounded-2xl border-2 border-black text-center font-bold">
					<p class="w-full basis-2/5 text-[10px]">TRÁMITE</p>
					<p class="w-full basis-2/5 text-[10px]">CONCEPTO</p>
					<p class="w-full basis-1/5 text-[10px]">VALOR</p>
				</div>

				<div class="flex w-[727px] justify-end">
					<div
						class=" h-0 w-[85px] -rotate-90 pl-6 text-left text-[10px]"
						style=" writingMode: 'vertical-rl'; "
					>
						CARPETA
					</div>
				</div>

				<table class=" w-full border border-black">
					<tbody class="divide divide-black">
						{#each liqStore.tarifas as cont, index (cont.id || index)}
							<tr class="flex flex-row">
								<td class="basis-2/5 border-t border-r border-black p-0">
									<p class="text-left text-[8px]">
										{cont.tramite}
									</p>
								</td>

								<td class="basis-2/5 border-t border-r border-black p-0">
									<p class="text-[8px]">
										{cont.concepto}
									</p>
								</td>

								<td class="basis-1/5 border-t border-black p-0">
									<p class="text-right text-[8px]">
										{cont.valor.toLocaleString(formatter)}
									</p>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<div class="my-[2px] flex flex-row items-center border-2 border-black">
					<p class="basis-1/4 px-3 text-[11px] font-bold">Banco</p>
					<p class="basis-1/4 px-3 text-left text-[11px]">
						{liqStore.banco}
					</p>
					<p class="basis-1/4 px-3 text-right text-[11px] font-bold">VALOR TOTAL A</p>
					<div class="mx-2 my-1 w-36 basis-1/4 rounded-full border border-black">
						<p class="px-3 text-right text-[11px]">
							${liqStore.valTotal.toLocaleString(formatter)}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-2 mb-7 border border-dashed border-black" />

		<!-- -->

		<!-- -->

		<div id="container factura" class="relative h-auto w-full border-2 border-black">
			<div
				style="top: -1rem;"
				class=" absolute top-0 left-1/2 z-10 flex w-[679px] -translate-x-1/2 transform flex-row rounded-2xl border-2 border-black bg-white text-center"
			>
				<p class="ml-3 w-full basis-1/5 text-left text-[10px] font-bold">RECIBO DE PAGO</p>
				<p class="w-full basis-2/5 text-right text-[10px] font-bold">Funcionario:</p>
				<p class=" basis-2/5 pl-3 text-left text-[9px]">{liqStore.funcionario}</p>
			</div>

			<div class="m-4 my-[2px] mt-2 flex flex-row items-center">
				<p class="basis-1/5 px-3 text-[11px] font-bold">EXPEDICIÓN</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaExp).toLocaleDateString()}
				</p>
				<p class="basis-1/5 px-3 text-left text-[11px] font-bold">FECHA DE PAGO</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaPag).toLocaleDateString()}
				</p>
				<div class="mx-2 my-1 flex w-36 basis-1/5 rounded-full border border-black">
					<p class="px-3 text-left text-[11px] font-bold">Nro</p>
					<p class="px-3 text-right text-[11px]">{liqStore.serieNro.toString().padStart(5, '0')}</p>
				</div>
			</div>

			<div class="flex p-4 py-0">
				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/3 border-r-2 border-black px-3 text-[11px] font-bold">SOLICITANTE</p>
					<p class="basis-1/3 px-3 text-[11px]">Indentificacion</p>
					<p class="basis-1/3 border-l-2 border-black px-3 text-right text-[11px]">
						{liqStore.identificacion}
					</p>
				</div>

				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/5 border-r-2 border-black px-3 text-[11px]">Nombre</p>
					<p class="basis-4/5 border-black px-3 text-center text-[11px]">
						{liqStore.nombre}
					</p>
				</div>
			</div>

			<div class="w-full p-4">
				<div class="flex w-full flex-row rounded-2xl border-2 border-black text-center font-bold">
					<p class="w-full basis-2/5 text-[10px]">TRÁMITE</p>
					<p class="w-full basis-2/5 text-[10px]">CONCEPTO</p>
					<p class="w-full basis-1/5 text-[10px]">VALOR</p>
				</div>

				<div class="flex w-[727px] justify-end">
					<div
						class=" h-0 w-[85px] -rotate-90 pl-6 text-left text-[10px]"
						style=" writingMode: 'vertical-rl'; "
					>
						TESORERIA
					</div>
				</div>

				<table class=" w-full border border-black">
					<tbody class="divide divide-black">
						{#each liqStore.tarifas as cont, index (cont.id || index)}
							<tr class="flex flex-row">
								<td class="basis-2/5 border-t border-r border-black p-0">
									<p class="text-left text-[8px]">
										{cont.tramite}
									</p>
								</td>

								<td class="basis-2/5 border-t border-r border-black p-0">
									<p class="text-[8px]">
										{cont.concepto}
									</p>
								</td>

								<td class="basis-1/5 border-t border-black p-0">
									<p class="text-right text-[8px]">
										{cont.valor.toLocaleString(formatter)}
									</p>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<div class="my-[2px] flex flex-row items-center border-2 border-black">
					<p class="basis-1/4 px-3 text-[11px] font-bold">Banco</p>
					<p class="basis-1/4 px-3 text-left text-[11px]">
						{liqStore.banco}
					</p>
					<p class="basis-1/4 px-3 text-right text-[11px] font-bold">VALOR TOTAL A</p>
					<div class="mx-2 my-1 w-36 basis-1/4 rounded-full border border-black">
						<p class="px-3 text-right text-[11px]">
							${liqStore.valTotal.toLocaleString(formatter)}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-2 mb-7 border border-dashed border-black" />

		<!-- -->

		<div id="container factura" class="relative h-auto w-full border-2 border-black">
			<div
				style="top: -1rem;"
				class=" absolute top-0 left-1/2 z-10 flex w-[679px] -translate-x-1/2 transform flex-row rounded-2xl border-2 border-black bg-white text-center"
			>
				<p class="ml-3 w-full basis-1/5 text-left text-[10px] font-bold">RECIBO DE PAGO</p>
				<p class="w-full basis-2/5 text-right text-[10px] font-bold">Funcionario:</p>
				<p class=" basis-2/5 pl-3 text-left text-[9px]">{liqStore.funcionario}</p>
			</div>

			<div class="m-4 my-[2px] mt-2 flex flex-row items-center">
				<p class="basis-1/5 px-3 text-[11px] font-bold">EXPEDICIÓN</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaExp).toLocaleDateString()}
				</p>
				<p class="basis-1/5 px-3 text-left text-[11px] font-bold">FECHA DE PAGO</p>
				<p class="basis-1/5 px-3 text-left text-[11px]">
					{new Date(liqStore.fechaPag).toLocaleDateString()}
				</p>
				<div class="mx-2 my-1 flex w-36 basis-1/5 rounded-full border border-black">
					<p class="px-3 text-left text-[11px] font-bold">Nro</p>
					<p class="px-3 text-right text-[11px]">{liqStore.serieNro.toString().padStart(5, '0')}</p>
				</div>
			</div>

			<div class="flex p-4 py-0">
				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/3 border-r-2 border-black px-3 text-[11px] font-bold">SOLICITANTE</p>
					<p class="basis-1/3 px-3 text-[11px]">Indentificacion</p>
					<p class="basis-1/3 border-l-2 border-black px-3 text-right text-[11px]">
						{liqStore.identificacion}
					</p>
				</div>

				<div class="m-[3px] flex w-1/2 flex-row border-2 border-black">
					<p class="basis-1/5 border-r-2 border-black px-3 text-[11px]">Nombre</p>
					<p class="basis-4/5 border-black px-3 text-center text-[11px]">
						{liqStore.nombre}
					</p>
				</div>
			</div>

			<div class="w-full p-4">
				<div class="flex w-full flex-row rounded-2xl border-2 border-black text-center font-bold">
					<p class="w-full basis-2/5 text-[10px]">TRÁMITE</p>
					<p class="w-full basis-2/5 text-[10px]">CONCEPTO</p>
					<p class="w-full basis-1/5 text-[10px]">VALOR</p>
				</div>

				<div class="flex w-[727px] justify-end">
					<div
						class=" h-0 w-[85px] -rotate-90 pl-6 text-left text-[10px]"
						style=" writingMode: 'vertical-rl'; "
					>
						BANCO
					</div>
				</div>

				<div class="my-[2px] flex flex-row items-center border-2 border-black">
					<p class="basis-1/4 px-3 text-[11px] font-bold">Banco</p>
					<p class="basis-1/4 px-3 text-left text-[11px]">
						{liqStore.banco}
					</p>
					<p class="basis-1/4 px-3 text-right text-[11px] font-bold">VALOR TOTAL A</p>
					<div class="mx-2 my-1 w-36 basis-1/4 rounded-full border border-black">
						<p class="px-3 text-right text-[11px]">
							${liqStore.valTotal.toLocaleString(formatter)}
						</p>
					</div>
				</div>
			</div>

			<!-- <div
			class="text-center flex flex-row items-center border-2 border-black my-[2px] m-auto w-[470px] h-16"
		>
			<img class=" h-12 m-auto" src="./logo_transito.png" alt="" />
		</div> -->

			<!-- <div class="my-[12px] max-w-[470px] mx-auto text-center">
			<p class="m-auto text-xs">
				000000000000000000000000000000000000000000000000000000000000000000
			</p>   liqStore !== undefined
		</div> -->

			<div class="mx-36 mb-3">
				<img alt="Barcode" src={imageUrl} />
			</div>
		</div>
	</div>
{:else}
	<div class="mt-96">
		<Loader />
	</div>
{/if}
