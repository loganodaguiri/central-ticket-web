import api, { URLS } from "./api.js";

const BASE_URL = "https://vendasingresso.onrender.com";
const token = localStorage.getItem("authToken");

export const cadastroProdutor = (produtorForm) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/produtor/register",
	data: produtorForm,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const edicaoProdutor = (produtorForm) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/produtor/edit",
	data: produtorForm,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
