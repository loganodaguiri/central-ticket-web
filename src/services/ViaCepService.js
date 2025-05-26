import api, { URLS } from "./api.js";

const BASE_URL = "https://vendasingresso.onrender.com";

export const buscaCep = (cep) => api.request({
	method: "get",
	baseURL: BASE_URL,
	url: `/api/cep/${cep}`,
});
