import { clearToken, setAuthenticatedUser } from '$lib/authStore.js';
import { goto } from '$app/navigation';
import swal from 'sweetalert';
import { apiRequest } from '$lib/api/client.js';
// const agent = new https.Agent({
//   rejectUnauthorized: false,
//   requestCert: false,
//   agent: false,
// });

//https.globalAgent.options.rejectUnauthorized = false;
/******************   LOGIN  ************************/

// auth user

export async function authUser(email, password) {
	const response = await apiRequest('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password })
	});
	if (!response?.user) throw new Error('No se recibió una sesión válida.');
	setAuthenticatedUser(response.user);
	await goto('/');
	return response;
}

// create user data

export async function saveUser(data) {
	try {
		const response = await apiRequest('/register', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		if (response) {
			await swal({
				title: 'Registro exitoso!',
				text: 'El registro ha sido exitoso; probablemente necesites aprobación del Administrador.',
				icon: 'success',
				button: 'Continuar'
			});
			goto('/login');
		} else {
			swal({
				title: 'Error',
				text: 'Revisa que todos los campos obligatorios en el formulario esten diligenciados, la longitud del password debe ser de minimo 8 caracteres.',
				icon: 'error',
				button: 'Continuar'
			});
		}
	} catch {
		swal({
			title: 'Error',
			text: 'Revisa que todos los campos obligatorios en el formulario esten diligenciados, la longitud del password debe ser de minimo 8 caracteres.',
			icon: 'error',
			button: 'Continuar'
		});
	}
}

export async function logout() {
	try {
		await apiRequest('/api/auth/logout', { method: 'POST' });
	} catch {
		// La sesión local se revoca aunque el servidor no responda.
	}
	clearToken();
	await goto('/login');
}
////////////////////INCIDENCIAS///////////////////////

//// traer todos

//  export async function getIncidencias(){
//   try {
//     let headersList = {
//       "Content-Type": "application/json"
//     }

//     let bodyContent = JSON.stringify({
//       email, password
//     });

//     let reqOptions = {
//       url: VITE_MAIN_ENDPOINT + "/incidencias",
//       method: "GET",
//       headers: headersList,
//       data: bodyContent,
//     }

//     let response = await axios.request(reqOptions);
//     console.log("status: ", response);
//     console.log("incidencias: ",response.data);

//    if (response.status === 200) {

//      console.log(response)

//    }

//    } catch (error) {
//      console.log(error)

//    }
//  }
