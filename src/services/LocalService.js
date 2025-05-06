import api, { URLS } from "./api.js";

const BASE_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");

export const cadastroLocal = (localForm) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/house/register",
	data: localForm,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export const editarLocal = (localForm) => api.request({
	method: "put",
	baseURL: BASE_URL,
	url: "/house/edit",
	data: localForm,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
