const Alertas = {
	namespaced: true,
	state: {
		carregando: [],
	},
	mutations: {
		carregando(state, mensagem){
			state.carregando.push(mensagem);
		},
		finalizarCarregando(state, mensagem){
			const index = state.carregando.indexOf(mensagem);
			if(index >= 0){
				state.carregando.splice(index, 1);
			}
		},
	},
	actions: {
	},
	getters: {
	},
};

export default Alertas;
