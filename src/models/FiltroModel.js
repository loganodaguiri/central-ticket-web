export default class FiltroModel{
	constructor(params){
		Object.assign(this, params);
	}

	listaInstituicao = []; // new InstituicaoModel();

	listaAno = []; // new AnoModel();

	listaMateriaQuestao = []; // new MateriaQuestaoModel();

	listaConteudoQuestao = []; // new ConteudoQuestaoModel();

	listaSubConteudoQuestao = [];

	listaBanca = [];

	numeroQuestao = "";

	questoesNaoRespondidas = undefined;

	questoesJaRespondidas = undefined;

	questoesIncorretas = undefined;

	todasQuestoes = undefined;

	listaPlanoEnare = [];

	idSimulado = null;

	orderBy = "";

	idPlataforma = undefined;
}
