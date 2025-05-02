import Vue from "vue";
import Vuex from "vuex";
import Carregamento from "./Carregamento.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		carregamento: Carregamento,
	},
});
