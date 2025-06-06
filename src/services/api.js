import Vue from "vue";
import axios from "axios";
import { config } from "@/profiles/profile.js";

// Métodos gerais para tratamento de erros
function tratarStatusCode(err){
	let mensagem = `<div> ERRO ${err?.response?.status}</div>`;

	if(err?.response?.data && typeof (err.response.data) === "string"){
		mensagem += err.response.data;
	}
	else if(err?.response?.status != 500 && err?.response?.data?.length > 0){
		const listaMsgErro = err.response.data.filter((i) => i.mensagem);

		listaMsgErro.forEach((m) => {
			mensagem += `<li>${m.mensagem}</li>`;
		});
		// Caso do corpo da resposta ser vazio
	}
	else{
		mensagem += "Ocorreu algum erro no servidor.";
	}
}

const api = axios.create({
	// headers: {
	// 	Accept: "application/json",
	// 	"Content-Type": "application/json",
	// },
});

// eslint-disable-next-line consistent-return
api.interceptors.request.use(
	(configRequest) => {
		configRequest.headers["Content-Type"] = "application/json";
		configRequest.headers.Accept = "application/json";
		configRequest.headers["Access-Control-Allow-Origin"] = "*";
		configRequest.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
		return configRequest;
	},
	(error) => {
		console.error("Erro ao fazer requisição: ", error);
		return Promise.reject(error);
	},
);

api.defaults.baseURL = config.apis.urls.API_APROVEI;
// Resposta bem sucedida
api.interceptors.response.use((response) => response,
	(error) => {
		if(error.response){
			// Foi feita uma requisição com o servidor respondendo com um status code
			tratarStatusCode(error);
		}
		else if(error.request){
			// Foi feita uma requisição mas sem resposta do servidor
			// tratarSemRespostaServidor();
		}
		else{
			// Algum outro erro aconteceu
			// tratarOutrosErros();
		}

		return Promise.reject(error);
	});

export const URLS = config.apis.urls;
export default api;
