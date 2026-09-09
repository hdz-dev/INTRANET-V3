const { VITE_MAIN_ENDPOINT } = import.meta.env;
import { goto } from '$app/navigation';
import axios from 'axios';
import swal from 'sweetalert';
const endpoint = VITE_MAIN_ENDPOINT + '/incidencias';
const endpoint2 = VITE_MAIN_ENDPOINT + '/incidencia';
const endpoint3 = VITE_MAIN_ENDPOINT + '/incidencias-estado';
const endpoint4 = VITE_MAIN_ENDPOINT + '/incidencias-query';
const endpoint5 = VITE_MAIN_ENDPOINT + '/encuesta';

//const endpoint = 'localhost:4000/Incidencias';

// postear Incidencia
export const postIncidencia = async (bodyContent) => {
	let auth = JSON.parse(localStorage.getItem('authToken')).TokenSesion;

	try {
		let headersList = {
			Accept: '*/*',
			Authorization: 'Bearer ' + auth,
			'Content-Type': 'application/json'
		};

		let response = await fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(bodyContent), // data no debe ser `string` o {object}!bodyContent,
			headers: headersList
		});

		if (response.status === 201) {
			console.log('status: ', response.status);
			console.log('status: ', response);
		} else {
			console.log('status: ', response.status);

			console.log(
				'La operación no se pudo completar correctamente. Código de estado:',
				response.status
			);
		}
	} catch (error) {
		console.log(error);
	}
};

export const updateIncidencia = async (bodyContent) => {
	let auth = JSON.parse(localStorage.getItem('authToken')).TokenSesion;
	//console.log("Bodycontent: ", bodyContent);
	try {
		let headersList = {
			Accept: '*/*',
			Authorization: 'Bearer ' + auth,
			'Content-Type': 'application/json'
		};

		let response = await fetch(endpoint2 + '/' + bodyContent.id, {
			method: 'PUT',
			body: JSON.stringify(bodyContent), // data can be `string` or {object}!bodyContent,
			headers: headersList
		});

		if (response.status === 201) {
			console.log('status: ', response.status);
			console.log('status: ', response);
		} else {
			console.log('status: ', response.status);

			let data = await response.json();

			console.log(data);

			console.log('La operación se completo correctamente. Código de estado:', response.status);
			return response.status;
		}
	} catch (error) {
		console.log(error);
	}
};

// traer los Incidencias por filtro

// export const getFilteredIncidencias = async () => {
//   auth = JSON.parse(localStorage.getItem("authToken")).TokenSesion;
//   let headersList = {
//     Accept: "*/*",
//     Authorization: "Bearer " + auth,
//     "Content-Type": "application/json",
//   };

//   try {
//     let bodyContent = JSON.stringify({
//       "name": "clima",
//       "data": "Niebla",
//     });

//     let reqOptions = {
//       url: endpoint2,
//       method: "GET",
//       headers: headersList,
//       //data: bodyContent
//     };

//     let response = await axios.request(reqOptions);

//     console.log("status: ", response);
//     console.log("Incidencias: ", response);

//     if (response.status === 200) {
//       console.log(response);
//       return response;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getFilteredIncidencias = async (nameParam, dataParam) => {
	let auth = JSON.parse(localStorage.getItem('authToken')).TokenSesion;

	const params = {
		name: nameParam,
		data: dataParam
	};

	const headersList = {
		Accept: '*/*',
		Authorization: 'Bearer ' + auth,
		'Content-Type': 'application/json'
	};
	try {
		const resp = await axios.get(endpoint2, {
			params,
			headers: headersList
		});
		console.log(resp.data);
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};

// traer los Incidencias por filtro***************************************

// export const getAllIncidencias = async (pageData) => {
//   console.log(
//     "** pageData: ",
//     pageData.skip,
//     pageData.take,
//     pageData.id_,
//     pageData.asignado,
//     pageData.esta,
//     pageData.dependencia
//   );

//   try {
//     let auth = JSON.parse(localStorage.getItem("authToken")).TokenSesion;

//     let headersList = {
//       Accept: "*/*",
//       Authorization: "Bearer " + auth,
//       "Content-Type": "application/json",
//     };

//     console.log("pageData: ", pageData);

//     //const queryString = new URLSearchParams(pageData).toString();

//     let reqOptions = {
//       url:
//         endpoint +
//         `?skip=${-1}&take=${-1}&asignado=${pageData.asignado}&estado=${pageData.estado}&id=${pageData.id}&dependencia=${pageData.dependencia}`,
//       // `?${queryString}`,
//       method: "GET",
//       headers: headersList,
//       //data: pageData,
//     };
//     console.log("url: ", reqOptions.url);

//     let response = await axios.request(reqOptions);

//     console.log("status: ", response);
//     console.log("Incidencias: ", response.data);

//     if (response.status === 200) {
//       console.log(response);
//       return response;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// traer todos los Incidencias

export const getAllIncidencias = async (pageData) => {
	console.log(
		'** pageData: ',
		pageData.skip,
		pageData.take,
		pageData.id_,
		pageData.asignado,
		pageData.esta,
		pageData.dependencia
	);

	try {
		let auth = JSON.parse(localStorage.getItem('authToken')).TokenSesion;

		let headersList = {
			Accept: '*/*',
			Authorization: 'Bearer ' + auth,
			'Content-Type': 'application/json'
		};

		console.log('pageData: ', pageData);

		//const queryString = new URLSearchParams(pageData).toString();

		let reqOptions = {
			url:
				endpoint +
				`?skip=${pageData.skip}&take=${pageData.take}&asignado=${pageData.asignado}&estado=${pageData.estado}&id=${pageData.id}&dependencia=${pageData.dependencia}`,
			// `?${queryString}`,
			method: 'GET',
			headers: headersList
			//data: pageData,
		};
		console.log('url: ', reqOptions.url);

		let response = await axios.request(reqOptions);

		console.log('status: ', response);
		console.log('Incidencias: ', response.data);

		if (response.status === 200) {
			console.log(response);
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

// traer conteo de incidencias por estado     ************

export const getAllIncEstado = async () => {
	try {
		let auth = JSON.parse(localStorage.getItem('authToken')).TokenSesion;
		let headersList = {
			Accept: '*/*',
			Authorization: 'Bearer ' + auth,
			'Content-Type': 'application/json'
		};

		let reqOptions = {
			url: endpoint3,
			method: 'GET',
			headers: headersList
			//data: pageData,
		};

		let response = await axios.request(reqOptions);
		console.log('status: ', response);
		console.log('Incidencias: ', response.data);

		if (response.status === 200) {
			console.log(response);
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

////// traer conteo de incidencias dinamico     ************

export const getAllIncDin = async (Data) => {
	try {
		let auth = JSON.parse(localStorage.getItem('authToken')).TokenSesion;
		let headersList = {
			Accept: '*/*',
			Authorization: 'Bearer ' + auth,
			'Content-Type': 'application/json'
		};

		let reqOptions = {
			url: endpoint4,
			method: 'POST',
			headers: headersList,
			data: Data
		};

		let response = await axios.request(reqOptions);
		//console.log("status: ", response);
		//console.log("Incidencias: ", response.data);

		if (response.status === 200) {
			//console.log(response);
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
};
////***************************** */

export const postEncuesta = async (bodyContent) => {
	//let auth = JSON.parse(localStorage.getItem("authToken")).TokenSesion;

	try {
		let headersList = {
			Accept: '*/*',
			//Authorization: "Bearer " + auth,
			'Content-Type': 'application/json'
		};

		let response = await fetch(endpoint5, {
			method: 'POST',
			body: JSON.stringify(bodyContent), // data no debe ser `string` o {object}!bodyContent,
			headers: headersList
		});

		console.log('status: ', response.status);
		if (response.status === 200) {
			console.log('status: ', response.status);
			console.log('status: ', response.json);
			await swal({
				title: 'Exito',
				text: '¡Gracias por participar en nuestra encuesta de satisfacción! \n \nTu opinión es invaluable para nosotros y nos ayuda a mejorar nuestros servicios tecnologicos continuamente.',
				icon: 'success',
				button: 'Continuar'
			});
			goto('https://www.google.com');
			return response.status;
		} else {
			//alert("La encuesta no esta disponible o ya fue respondida");
			await swal({
				title: 'Error',
				text: 'La encuesta no esta disponible o ya fue respondida.',
				icon: 'error',
				button: 'Continuar'
			});

			goto('https://www.google.com');
			return response.status;
		}
	} catch (error) {
		console.log(error);
	}
};

export default {
	postIncidencia,
	getAllIncidencias,
	getFilteredIncidencias,
	getAllIncEstado,
	getAllIncDin,
	postEncuesta
};
