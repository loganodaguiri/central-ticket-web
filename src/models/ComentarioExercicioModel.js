export default class ComentarioModel{
	constructor(params){
		Object.assign(this, params);
	}

	comentario = "";

	reacaoEmoji = [];

	multiplaEscolhaQuestaoVO = undefined;
}
