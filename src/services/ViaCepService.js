import api, { URLS } from "./api.js";

const BASE_URL = "http://localhost:3000";

export const buscaCep = (cep) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/api/cep/${cep}`,
});
