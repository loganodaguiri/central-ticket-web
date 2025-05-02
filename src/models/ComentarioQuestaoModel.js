export default class ComentarioModel{
	constructor(params){
		Object.assign(this, params);
	}

	comentario = "";

	reacaoEmoji = [];

	questaoVO = undefined;

	multiplaEscolhaQuestaoVO = undefined;
}
