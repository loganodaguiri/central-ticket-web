import api, { URLS } from "./api.js";

const BASE_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");

export const cadastroUsuario = (cadastroForm) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/user/register",
	data: cadastroForm,
	headers: {
		"Content-Type": "application/json",
	},
});

export const loginUsuario = (loginForm) => api.request({
	method: "post",
	baseURL: BASE_URL,
	url: "/user/sign",
	data: loginForm,
	headers: {
		"Content-Type": "application/json",
	},
});

export const bucaUser = (id) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/user/user/${id}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
