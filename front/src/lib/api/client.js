const { VITE_MAIN_ENDPOINT = 'http://localhost:4000' } = import.meta.env;

export async function apiRequest(path, options = {}) {
	const headers = new Headers(options.headers);
	headers.set('Content-Type', 'application/json');

	const response = await fetch(`${VITE_MAIN_ENDPOINT}${path}`, {
		...options,
		credentials: 'include',
		headers
	});

	const contentType = response.headers.get('content-type') || '';
	const data = contentType.includes('application/json')
		? await response.json()
		: await response.text();

	if (!response.ok) {
		const error = new Error(data?.message || `Request failed with status ${response.status}`);
		error.status = response.status;
		error.data = data;
		throw error;
	}

	return data;
}

export { VITE_MAIN_ENDPOINT };
