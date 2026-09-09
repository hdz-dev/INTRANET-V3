<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';

	// Estado del editor
	let content = [];
	let selectedElementType = null;
	let isEditing = false;
	let editingIndex = -1;

	// Tipos de elementos disponibles
	const elementTypes = [
		{ id: 'title', label: 'Título', icon: 'fa-heading' },
		{ id: 'paragraph', label: 'Párrafo', icon: 'fa-paragraph' },
		{ id: 'list', label: 'Lista', icon: 'fa-list-ul' },
		{ id: 'numbered-list', label: 'Lista Numerada', icon: 'fa-list-ol' },
		//{ id: 'table', label: 'Tabla', icon: 'fa-table' },
		{ id: 'image', label: 'Imagen', icon: 'fa-image' },
		{ id: 'video', label: 'Video', icon: 'fa-video' },
		{ id: 'code', label: 'Código', icon: 'fa-code' }
	];

	const setElement = (element) => {
		const el = elementTypes.find((el) => el.id === element);
		return el ? el.label : '';
	};

	// Añadir al inicio del script
	let isFullScreen = false;

	// Función para alternar vista completa
	const toggleFullScreen = () => {
		isFullScreen = !isFullScreen;
	};

	// Estado temporal para nuevos elementos

	let tempContent = {
		text: '',
		url: '',
		rows: 3,
		cols: 3,
		file: null,
		align: 'left', // Añadir alineación
		size: '100%' // Añadir tamaño
	};

	// Añadir después de las variables de estado existentes
	let showUrlInput = false;
	let tempUrl = '';
	let savedSelection = null;

	// Añadir las funciones de formato
	const formatText = (format) => {
		document.execCommand(format, false, null);
		handleInput();
	};

	const handleInput = () => {
		const editor = document.querySelector('[contenteditable]');
		tempContent.text = editor.innerHTML;
	};

	function sanitizeRichText(value = '') {
		return value
			.replace(/<script[\s\S]*?<\/script>/gi, '')
			.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '')
			.replace(/javascript:/gi, '');
	}

	// Añadir después de las funciones de formato existentes
	const addLink = () => {
		const selection = window.getSelection();
		if (selection.toString()) {
			savedSelection = selection.getRangeAt(0);
			showUrlInput = true;
		} else {
			alert('Por favor seleccione el texto que desea convertir en enlace');
		}
	};

	const applyLink = () => {
		if (tempUrl && savedSelection) {
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(savedSelection);

			document.execCommand('createLink', false, tempUrl);
			showUrlInput = false;
			tempUrl = '';
			savedSelection = null;
			handleInput();
		}
	};

	// Función para seleccionar tipo de elemento
	const selectElementType = (type) => {
		selectedElementType = type;
		isEditing = true;
		resetTempContent();
	};

	// Función para resetear contenido temporal
	const resetTempContent = () => {
		tempContent = {
			text: '',
			url: '',
			rows: 3,
			cols: 3,
			file: null,
			align: 'left',
			size: '100%'
		};
	};

	// Función para añadir elemento
	const addElement = () => {
		const newElement = {
			type: selectedElementType,
			id: Date.now(),
			content: {
				align: tempContent.align,
				size: tempContent.size
			}
		};

		switch (selectedElementType) {
			case 'title':
			case 'paragraph':
			case 'code':
				newElement.content = { ...newElement.content, text: tempContent.text };
				break;
			case 'list':
			case 'numbered-list':
				newElement.content = { ...newElement.content, items: tempContent.text.split('\n') };
				break;
			case 'image':
				newElement.content = tempContent.url
					? { ...newElement.content, url: tempContent.url }
					: { ...newElement.content, file: tempContent.file };
				break;
			case 'video':
				newElement.content = { ...newElement.content, url: tempContent.url };
				break;
			case 'table':
				newElement.content = {
					...newElement.content,
					rows: tempContent.rows,
					cols: tempContent.cols,
					data: Array(tempContent.rows)
						.fill()
						.map(() => Array(tempContent.cols).fill(''))
				};
				break;
		}

		if (editingIndex >= 0) {
			content[editingIndex] = newElement;
		} else {
			content = [...content, newElement];
		}

		isEditing = false;
		selectedElementType = null;
		editingIndex = -1;
		resetTempContent();
	};

	// Función para manejar archivos
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				tempContent.file = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	};

	// Modificar la función editElement
	const editElement = (index) => {
		const element = content[index];
		selectedElementType = element.type;
		isEditing = true;
		editingIndex = index;

		// Mantener los atributos de alineación y tamaño
		tempContent = {
			...tempContent,
			align: element.content.align || 'left',
			size: element.content.size || '100%'
		};

		switch (element.type) {
			case 'title':
			case 'paragraph':
			case 'code':
				tempContent.text = element.content.text;
				break;
			case 'list':
			case 'numbered-list':
				tempContent.text = element.content.items.join('\n');
				break;
			case 'image':
				tempContent.url = element.content.url;
				tempContent.file = element.content.file;
				break;
			case 'video':
				tempContent.url = element.content.url;
				break;
			case 'table':
				tempContent.rows = element.content.rows;
				tempContent.cols = element.content.cols;
				tempContent.data = element.content.data;
				break;
		}
	};

	// Función para eliminar elemento
	const deleteElement = (index) => {
		content = content.filter((_, i) => i !== index);
	};

	// Funciones para drag and drop
	let draggedIndex = null;

	const handleDragStart = (event, index) => {
		draggedIndex = index;
		event.dataTransfer.effectAllowed = 'move';
		event.target.classList.add('dragging');
	};

	const handleDragOver = (event, index) => {
		event.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			const items = [...content];
			const draggedItem = items[draggedIndex];
			items.splice(draggedIndex, 1);
			items.splice(index, 0, draggedItem);
			content = items;
			draggedIndex = index;
		}
	};

	const handleDragEnd = (event) => {
		draggedIndex = null;
		event.target.classList.remove('dragging');
	};
</script>

<div
	class="max-w-[1200px]x bg-primaryx glass-3 container mx-auto flex min-h-[900px] flex-col rounded p-4"
>
	<!--******************** barra de herramientas ********************-->
	<div class="bg-whitex glass-3x bg-whitex shadowx m-auto mb-4 rounded-lg p-4">
		<h1 class="mb-4 text-center text-xl font-bold">Crea Nueva Publicación</h1>
		<div class="flex flex-wrap gap-2">
			{#each elementTypes as type (type.id)}
				<button
					aria-label={type.label}
					class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 shadow transition-colors hover:bg-gray-200"
					on:click={() => selectElementType(type.id)}
				>
					<i class="fas {type.icon}"></i>
					{type.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Contenido del editor -->
	{#if isEditing}
		<div class="bg-opacity-50x glass fixed inset-0 z-50 flex items-center justify-center">
			<div class="w-full max-w-2xl rounded-lg bg-white p-6">
				<h2 class="mb-4 text-xl font-bold">
					Agregar {elementTypes.find((t) => t.id === selectedElementType).label}
				</h2>

				<!-- Opciones de formato -->
				{#if ['title', 'paragraph'].includes(selectedElementType)}
					<div class="mb-4 flex gap-2 rounded-lg bg-gray-50 p-2">
						<!-- Opciones de alineación -->
						<div class="m-auto flex gap-2">
							<button
								class="rounded p-2 hover:bg-gray-200 {tempContent.align === 'left'
									? 'bg-gray-200'
									: ''}"
								on:click={() => (tempContent.align = 'left')}
								title="Alinear a la izquierda"
								aria-label="Alinear a la izquierda"
							>
								<i class="fas fa-align-left"></i>
							</button>
							<button
								class="rounded p-2 hover:bg-gray-200 {tempContent.align === 'center'
									? 'bg-gray-200'
									: ''}"
								on:click={() => (tempContent.align = 'center')}
								title="Centrar"
								aria-label="Centrar"
							>
								<i class="fas fa-align-center"></i>
							</button>
							<button
								class="rounded p-2 hover:bg-gray-200 {tempContent.align === 'right'
									? 'bg-gray-200'
									: ''}"
								on:click={() => (tempContent.align = 'right')}
								title="Alinear a la derecha"
								aria-label="Alinear a la derecha"
							>
								<i class="fas fa-align-right"></i>
							</button>
							<button
								class="rounded p-2 hover:bg-gray-200 {tempContent.align === 'justify'
									? 'bg-gray-200'
									: ''}"
								on:click={() => (tempContent.align = 'justify')}
								title="Justificar"
								aria-label="Justificar"
							>
								<i class="fas fa-align-justify"></i>
							</button>
						</div>

						{#if ['paragraph'].includes(selectedElementType)}
							<!-- Opciones de formato de texto -->
							<div class="border-lx pl-2x m-auto flex gap-2">
								<button
									aria-label="Negrita"
									class="rounded p-2 transition-all duration-200 hover:scale-105 hover:bg-gray-200"
									on:click={() => formatText('bold')}
									title="Negrita"
								>
									<i class="fas fa-bold"></i>
								</button>
								<button
									aria-label="Cursiva"
									class="rounded p-2 hover:bg-gray-200"
									on:click={() => formatText('italic')}
									title="Cursiva"
								>
									<i class="fas fa-italic"></i>
								</button>
								<button
									aria-label="Subrayado"
									class="rounded p-2 hover:bg-gray-200"
									on:click={() => formatText('underline')}
									title="Subrayado"
								>
									<i class="fas fa-underline"></i>
								</button>

								{#if showUrlInput}
									<div class="flex items-center gap-2 rounded bg-gray-100 p-1">
										<input
											type="text"
											bind:value={tempUrl}
											placeholder="Ingrese URL..."
											class="rounded border p-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
										/>
										<button
											aria-label="Aplicar enlace"
											class="rounded p-1 text-green-600 hover:bg-gray-200"
											on:click={applyLink}
											title="Aplicar enlace"
										>
											<i class="fas fa-check"></i>
										</button>
										<button
											aria-label="Cancelar enlace"
											class="rounded p-1 text-red-600 hover:bg-gray-200"
											on:click={() => {
												showUrlInput = false;
												tempUrl = '';
												savedSelection = null;
											}}
											title="Cancelar"
										>
											<i class="fas fa-times"></i>
										</button>
									</div>
								{:else}
									<button
										aria-label="Añadir enlace"
										class="rounded p-2 hover:bg-gray-200"
										on:click={addLink}
										title="Añadir enlace"
									>
										<i class="fas fa-link"></i>
									</button>
								{/if}
							</div>
						{/if}
					</div>

					<div
						class="min-h-[100px] w-full cursor-text rounded-lg border p-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						contenteditable="true"
						bind:innerHTML={tempContent.text}
						on:input={handleInput}
						placeholder="Escriba aquí..."
					></div>
				{/if}

				{#if selectedElementType === 'image'}
					<div class="space-y-4">
						<!-- Controles de imagen existentes -->
						<div class="mb-4 flex gap-2 rounded-lg bg-gray-50 p-2">
							<button
								aria-label="Alinear imagen a la izquierda"
								class="rounded p-2 hover:bg-gray-200 {tempContent.align === 'left'
									? 'bg-gray-200'
									: ''}"
								on:click={() => (tempContent.align = 'left')}
								title="Alinear a la izquierda"
							>
								<i class="fas fa-align-left"></i>
							</button>
							<button
								aria-label="Centrar imagen"
								class="rounded p-2 hover:bg-gray-200 {tempContent.align === 'center'
									? 'bg-gray-200'
									: ''}"
								on:click={() => (tempContent.align = 'center')}
								title="Centrar"
							>
								<i class="fas fa-align-center"></i>
							</button>
							<button
								aria-label="Alinear imagen a la derecha"
								class="rounded p-2 hover:bg-gray-200 {tempContent.align === 'right'
									? 'bg-gray-200'
									: ''}"
								on:click={() => (tempContent.align = 'right')}
								title="Alinear a la derecha"
							>
								<i class="fas fa-align-right"></i>
							</button>
						</div>

						<!-- Selector de tamaño de imagen -->
						<div class="flex items-center gap-2">
							<span class="text-sm text-gray-600">Tamaño:</span>
							<select class="rounded-lg border p-2" bind:value={tempContent.size}>
								<option value="25%">25%</option>
								<option value="50%">50%</option>
								<option value="75%">75%</option>
								<option value="100%">100%</option>
							</select>
						</div>
					</div>
				{/if}

				<!-- Campos según tipo de elemento -->
				{#if ['title**', 'paragraph**', 'code'].includes(selectedElementType)}
					<textarea
						class="w-full rounded-lg border p-2"
						rows="4"
						bind:value={tempContent.text}
						placeholder="Ingrese el texto..."
					></textarea>
				{:else if ['list', 'numbered-list'].includes(selectedElementType)}
					<textarea
						class="w-full rounded-lg border p-2"
						rows="4"
						bind:value={tempContent.text}
						placeholder="Ingrese los elementos (uno por línea)..."
					></textarea>
				{:else if selectedElementType === 'image'}
					<div class="space-y-4">
						<input type="file" accept="image/*" on:change={handleFileUpload} class="w-full" />
						<div class="text-center">o</div>
						<input
							type="text"
							bind:value={tempContent.url}
							placeholder="URL de la imagen..."
							class="w-full rounded-lg border p-2"
						/>
					</div>
				{:else if selectedElementType === 'video'}
					<input
						type="text"
						bind:value={tempContent.url}
						placeholder="URL del video..."
						class="w-full rounded-lg border p-2"
					/>
				{:else if selectedElementType === 'table'}
					<div class="mb-4 grid grid-cols-2 gap-4">
						<input
							type="number"
							bind:value={tempContent.rows}
							min="1"
							class="rounded-lg border p-2"
							placeholder="Filas"
						/>
						<input
							type="number"
							bind:value={tempContent.cols}
							min="1"
							class="rounded-lg border p-2"
							placeholder="Columnas"
						/>
					</div>
				{/if}

				<div class="mt-4 flex justify-end gap-2">
					<button
						class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
						on:click={() => {
							isEditing = false;
							selectedElementType = null;
						}}
					>
						Cancelar
					</button>
					<button
						class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						on:click={addElement}
					>
						Guardar
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!--******************** sección de editor de contenido y vista previa ********************-->
	<div class="grid flex-1 gap-4" class:grid-cols-3={!isFullScreen}>
		<!--******************** Editor de Contenido (oculto en vista completa) ********************-->
		{#if !isFullScreen}
			<div class="space-y-4 overflow-y-auto rounded-md bg-white p-4 shadow">
				<h1
					class="sticky top-0 z-10 m-auto mb-4 h-14 border-b border-gray-200 bg-white py-2 text-center font-bold"
				>
					Elementos de la publicación
				</h1>
				{#each content as element, index (element.id || index)}
					<div
						class="group transition-allx duration-200x xhover:shadow-[-7px_0px_26px_-3px_rgba(0,_0,_0,_0.1)] cursor-pointerx element-containerx relative max-h-36 rounded-lg border-gray-200 bg-white shadow hover:border hover:shadow-[-12px_11px_6px_0px_rgba(0,_0,_0,_0.1)]"
						draggable="true"
						on:dragstart={(e) => handleDragStart(e, index)}
						on:dragover={(e) => handleDragOver(e, index)}
						on:dragend={handleDragEnd}
					>
						<!-- cabecera de elementos -->
						<div
							class="border-bx flex h-1/3 items-center justify-between rounded-t-lg bg-gray-50 p-2"
						>
							<div class="flex items-center gap-2">
								<i class="fas fa-grip-vertical cursor-move text-gray-400"></i>
								<span class="text-gray-600">{setElement(element.type)}</span>
							</div>

							<div class="flex gap-2">
								<button
									aria-label="Editar elemento"
									class="rounded p-1 transition-colors hover:bg-gray-200"
									on:click={() => editElement(index)}
								>
									<i class="fas fa-edit"></i>
								</button>
								<button
									aria-label="Eliminar elemento"
									class="rounded p-1 text-red-500 transition-colors hover:bg-gray-200"
									on:click={() => deleteElement(index)}
								>
									<i class="fas fa-trash"></i>
								</button>
							</div>
						</div>

						<!-- Contenido del elemento -->
						<div class="p-4">
							{#if element.type === 'title'}
								<h1
									class="line-clamp-2 text-3xl font-bold"
									style="text-align: {element.content.align || 'left'}"
								>
									{element.content.text}
								</h1>
							{:else if element.type === 'paragraph'}
								<p
									class="line-clamp-2 text-sm text-gray-600"
									style="text-align: {element.content.align || 'left'}"
								>
									{element.content.text?.replace(/<[^>]*>/g, '') || 'Sin contenido'}
								</p>
							{:else if element.type === 'list'}
								<ul class="my-4 list-disc space-y-2 pl-5">
									{#each element.content.items as item, itemIndex (itemIndex)}
										<li>{item}</li>
									{/each}
								</ul>
							{:else if element.type === 'numbered-list'}
								<ol class="my-4 list-decimal space-y-2 pl-5">
									{#each element.content.items as item, itemIndex (itemIndex)}
										<li>{item}</li>
									{/each}
								</ol>
							{:else if element.type === 'image'}
								<div class="text-center">
									<img
										src={element.content.url || element.content.file}
										alt=""
										class="h-16 w-16 rounded-lg object-cover"
										style="display: inline-block;"
									/>
								</div>
							{:else if element.type === 'video'}
								<div class="relative my-4 h-0 overflow-hidden rounded-lg pb-[56.25%]">
									<iframe
												title="Vista previa del video"
										class="absolute top-0 left-0 h-full w-full"
										src={element.content.url}
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									></iframe>
								</div>
							{:else if element.type === 'code'}
								<pre
									class="my-4 overflow-x-auto rounded-lg bg-gray-800 p-4 font-mono whitespace-pre-wrap text-white">
                  <code>{element.content.text}</code>
                </pre>
							{:else if element.type === 'table'}
								<div class="my-4 w-full overflow-x-auto">
									<table class="w-full border-collapse border border-gray-300">
										<tbody>
										{#each element.content.data as row, rowIndex (rowIndex)}
											<tr>
												{#each row as cell, cellIndex (cellIndex)}
													<td class="border border-gray-300 p-2">{cell}</td>
												{/each}
											</tr>
										{/each}
										</tbody>
									</table>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!--******************** Vista previa de publicación (adaptable) ********************-->
		<div
			class="{!isFullScreen
				? 'col-span-2'
				: 'col-span-3'} overflow-y-auto rounded-lg bg-white px-8 py-4 shadow"
		>
			<div
				class="sticky top-0 z-10 mb-4 flex items-center justify-between border-b border-gray-200 bg-white py-2"
			>
				<h2 class="mb-6x m-auto text-center font-bold">Vista Previa de Publicación</h2>
				<!-- <button
					class="rounded-full p-2 transition-colors hover:bg-gray-100"
					on:click={toggleFullScreen}
					title={isFullScreen ? 'Mostrar editor' : 'Vista previa completa'}
				>
					{#if isFullScreen}
						<i class="fas fa-compress text-gray-600"></i>
					{:else}
						<i class="fas fa-expand text-gray-600"></i>
					{/if}
				</button> -->
			</div>

			<div class="prose prose-lg max-w-none">
				{#each content as element, elementIndex (element.id || elementIndex)}
					{#if element.type === 'title'}
						<h1
							class="mb-4 text-3xl font-bold"
							style="text-align: {element.content.align || 'left'}"
						>
							{element.content.text}
						</h1>
					{:else if element.type === 'paragraph'}
						<p class="mb-4" style="text-align: {element.content.align || 'left'}">
							<!-- El contenido se limita a formato editorial y se sanea antes de renderizarse. -->
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html sanitizeRichText(element.content.text)?.replace(
								/<a /g,
								'<a class="text-primary underline hover:text-primary-dark" '
							) || ''}
						</p>
					{:else if element.type === 'list'}
						<ul class="mb-4 list-disc pl-5">
							{#each element.content.items as item, itemIndex (itemIndex)}
								<li class="mb-2">{item}</li>
							{/each}
						</ul>
					{:else if element.type === 'numbered-list'}
						<ol class="mb-4 list-decimal pl-5">
							{#each element.content.items as item, itemIndex (itemIndex)}
								<li class="mb-2">{item}</li>
							{/each}
						</ol>
					{:else if element.type === 'image'}
						<div
							class="my-4 h-auto max-w-full rounded-lg"
							style="text-align: {element.content.align || 'center'}"
						>
							<img
								src={element.content.url || element.content.file}
								alt=""
								class="inline-block w-full rounded-lg"
								style="width: {element.content.size || '100%'};"
							/>
						</div>
					{:else if element.type === 'video'}
						<div class="relative my-4 h-0 overflow-hidden rounded-lg pb-[56.25%]">
							<iframe
											title="Vista previa del video"
								class="absolute top-0 left-0 h-full w-full"
								src={element.content.url}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						</div>
					{:else if element.type === 'code'}
						<pre
							class="my-4 mb-4 overflow-x-auto rounded-lg bg-gray-800 p-4 font-mono whitespace-pre-wrap text-white">
              <code>{element.content.text}</code>
            </pre>
					{:else if element.type === 'table'}
						<div class="my-4 w-full overflow-x-auto">
							<table class="w-full border-collapse border border-gray-300">
								<tbody>
								{#each element.content.data as row, rowIndex (rowIndex)}
									<tr>
										{#each row as cell, cellIndex (cellIndex)}
											<td class="border border-gray-300 p-2">{cell}</td>
										{/each}
									</tr>
								{/each}
								</tbody>
							</table>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<!-- Seccion innerfooter -->
	<!-- Botones de acción -->
	<div
		class="flex items-center justify-between rounded-b-2xl border-t border-slate-200/50 bg-slate-50 p-6"
	>
		<button
			class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 shadow-sm hover:bg-slate-100"
		>
			<i class="fas fa-save mr-2"></i>
			Guardar borrador
		</button>

		<div class="flex gap-3">
			<button
				on:click={toggleFullScreen}
				class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 shadow-sm hover:bg-slate-100"
			>
				<i class="fas fa-eye mr-2"></i>
				{isFullScreen ? 'Volver a vista de editor' : 'Vista previa completa'}
			</button>
			<button
				class="bg-primary rounded-xl px-5 py-2.5 font-medium text-white shadow-md hover:bg-blue-700"
			>
				<i class="fas fa-paper-plane mr-2"></i>
				Publicar
			</button>
		</div>
	</div>
</div>
