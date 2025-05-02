export default class RespostaModel{
	constructor(params){
		Object.assign(this, params);
	}

	id = null;

	resposta = "";

	reacaoEmoji = [];

	comentario = null;

	inicio = null;

	exibirResposta = null;

	paginaAtual = 1;
}
