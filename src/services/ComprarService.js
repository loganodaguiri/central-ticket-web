import api, { URLS } from "./api.js";

const BASE_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");

export const criarCompra = (compraFormulario) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/ingresso/compra",
	data: compraFormulario,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const finalizarCompra = (compraFormulario, id) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: `/compra/processar/${id}`,
	data: compraFormulario,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
