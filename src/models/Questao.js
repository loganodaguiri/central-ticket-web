export default class QuestaoModel{
	constructor(params){
		Object.assign(this, params);
	}
	// persistir o nome do VO

	alternativas = [];

	ds_enunciado = "";

	multipla_escolha_resposta = undefined;
}
