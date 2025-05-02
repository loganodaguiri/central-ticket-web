import api, { URLS } from "./api.js";

const BASE_URL = "http://localhost:3000";
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
