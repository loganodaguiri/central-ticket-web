import api, { URLS } from "./api.js";

const BASE_URL = "https://vendasingresso.onrender.com";
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

export const buscarEventoByIdUser = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `event/eventUser/${id}`,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const apagarEvento = (id) => api.request({
	method: "delete",
	baseURL: BASE_URL,
	url: `event/delete/${id}`,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const editarEvento = (eventoForm) => api.request({
	method: "put",
	baseURL: BASE_URL,
	url: "event/edit",
	data: eventoForm,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const buscarEventosDestaque = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: "event/eventDestaque",
});
