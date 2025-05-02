export default class ChecklistModel{
	constructor(params){
		Object.assign(this, params);
	}

    id = undefined;

    checklistMateriaVO = {};

    listaConteudo = [];

    ordem = undefined;
}
