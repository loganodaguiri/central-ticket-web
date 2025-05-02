import api, { URLS } from "./api.js";

const BASE_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");

export const cadastroEvento = (eventoForm) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/event/register",
	data: eventoForm, // Passando o FormData
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const buscarEventos = () => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: "/event/",
});

export const buscarEventoById = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `event/event/${id}`,
});
