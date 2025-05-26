import api, { URLS } from "./api.js";

const BASE_URL = "https://vendasingresso.onrender.com";
const token = localStorage.getItem("authToken");

export const cadastroIngrsso = (ingressoForm) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/ingresso/register",
	data: ingressoForm,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const buscaIngresoByIdEvento = (evento_id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: "/ingresso/ingressos",
	params: { evento_id },
	headers: {
		"Content-Type": "application/json",
	},
});

export const editarIngresso = (ingressoData) => api.request({
	method: "put",
	baseURL: BASE_URL,
	url: "/ingresso/edit",
	data: ingressoData,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
