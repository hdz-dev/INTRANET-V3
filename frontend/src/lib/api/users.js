const { VITE_MAIN_ENDPOINT } = import.meta.env;
import axios from 'axios';

export async function getUsers() {
	let auth = JSON.parse(localStorage.getItem('authToken')).TokenSesion;
	try {
		let headersList = {
			//Accept: "*/*",
			Authorization: 'Bearer ' + auth,
			'Content-Type': 'application/json'
		};

		//   let bodyContent = JSON.stringify({
		//     email, password
		//   });

		let reqOptions = {
			url: VITE_MAIN_ENDPOINT + '/users',
			method: 'GET',
			headers: headersList
			//data: bodyContent,
		};

		let response = await axios.request(reqOptions);
		//console.log("status: ", response);
		console.log('Usuarios: ', response.data);

		if (response.status === 200) {
			console.log(response);
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
}

export const addUser = async function (data) {
	// let auth = JSON.parse(localStorage.getItem("authToken")).TokenSesion;
	try {
		let headersList = {
			//Accept: "*/*",
			// Authorization: "Bearer " + auth,
			'Content-Type': 'application/json'
		};

		let bodyContent = {
			email: data.email,
			username: data.username,
			documentID: Number(data.documentID),
			role: data.role,
			avatar: data.avatar || '',
			password: data.password
		};

		let reqOptions = {
			url: VITE_MAIN_ENDPOINT + '/register',
			method: 'POST',
			headers: headersList,
			data: bodyContent
		};

		let response = await axios.request(reqOptions);

		if (response.status === 200) {
			return {
				data: response.data,
				error: null // No hay error
			};
		} else {
			throw new Error('Error en la solicitud: ' + response.status);
		}
	} catch (error) {
		return {
			data: null,
			error: error.message // Devuelve el mensaje de error
		};
	}
};
