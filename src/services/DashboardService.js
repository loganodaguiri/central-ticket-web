import api, { URLS } from "./api.js";

const BASE_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");

export const busacarQuantidadeIngresso = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/listaTotalIngressosVendidos/${id}`,
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

export const busacarReceitaGerada = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getTotalArrecadado/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarTotalArrecadadoPorEvento = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getTotalArrecadadoPorEvento/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarArrecadacoMensal = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getArrecadacaoMensal/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const busacarPercentualVendaIngressos = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/graficos/getPercentualVendaIngressos/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
