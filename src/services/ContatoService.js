import api, { URLS } from "./api.js";

const BASE_URL = "https://vendasingresso.onrender.com";

export const enviarEmail = (dadosFormulario) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/form/contato",
	data: dadosFormulario,
	headers: {
		"Content-Type": "application/json",
	},
});
