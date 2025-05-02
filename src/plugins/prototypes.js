import store from "../store/index.js";

const $carregando = (mensagem = "Carregando dados...") => {
	store.commit("carregamento/carregando", mensagem);
};
const $finalizarCarregando = (mensagem = "Carregando dados...") => {
	store.commit("carregamento/finalizarCarregando", mensagem);
};
const $salvando = (mensagem = "Salvando dados...") => {
	store.commit("carregamento/carregando", mensagem);
};
const $finalizarSalvando = (mensagem = "Salvando dados...") => {
	store.commit("carregamento/finalizarCarregando", mensagem);
};

export default {
	$carregando,
	$finalizarCarregando,
	$salvando,
	$finalizarSalvando,
};
