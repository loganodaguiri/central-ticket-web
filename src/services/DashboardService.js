import api, { URLS } from "./api.js";

const BASE_URL = "https://vendasingresso.onrender.com";
const token = localStorage.getItem("authToken");

export const busacarQuantidadeIngresso = (id, idEvento) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/listaTotalIngressosVendidos/${id}/${idEvento}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarQuantidadeEventosAtivos = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/listaEventosAtivos/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarQuantidadeEventos = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/listaEventos/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarReceitaGerada = (id, idEvento) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getTotalArrecadado/${id}/${idEvento}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarTotalArrecadadoPorEvento = (id, idEvento) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getTotalArrecadadoPorEvento/${id}/${idEvento}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarArrecadacoMensal = (id, idEvento) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getArrecadacaoMensal/${id}/${idEvento}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarPercentualVendaIngressos = (id, idEvento) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getPercentualVendaIngressos/${id}/${idEvento}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarProximosEventos = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getProximosEventos/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const participantesPorEvento = (id, idEvento) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/participantesPorEvento/${id}/${idEvento}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const participantesPorMes = (id, idEvento) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/participantesPorMes/${id}/${idEvento}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
