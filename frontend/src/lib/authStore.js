import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initialState = {
	user: null,
	token: null,
	role: null,
	permissions: [],
	status: 'unknown'
};

export const authStore = writable(initialState);
export const user = writable(null);
export const userToken = writable(null);
export const isLoggedIn = writable(false);
export const isReady = writable(false);
export const role = writable(null);
export const isValid = writable(false);

function syncState(state) {
	authStore.set(state);
	user.set(state.user);
	userToken.set(state.token);
	role.set(state.role);
	isLoggedIn.set(state.status === 'authenticated');
	isValid.set(state.status === 'authenticated');
}

export function getStoredToken() {
	return null;
}

export async function initializeAuth() {
	if (!browser) return null;

	try {
		const endpoint = import.meta.env.VITE_MAIN_ENDPOINT || '';
		const response = await fetch(`${endpoint}/api/auth/me`, { credentials: 'include' });
		if (!response.ok) throw new Error('No hay una sesión activa.');
		const data = await response.json();
		setAuthenticatedUser(data.user);
		return data.user;
	} catch {
		clearToken();
		return null;
	} finally {
		isReady.set(true);
	}
}

export function setAuthenticatedUser(data) {
	syncState({
		user: data,
		token: null,
		role: data?.role || data?.Rol || null,
		permissions: data.permissions || [],
		status: 'authenticated'
	});
}

export function clearToken() {
	if (browser) sessionStorage.removeItem('authToken');
	syncState({ ...initialState, status: 'anonymous' });
}

initializeAuth();
