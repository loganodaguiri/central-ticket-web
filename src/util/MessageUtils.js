import Vue from "vue";

import vuetify from "@/plugins/vuetify.js";

const theme = vuetify.preset.theme.themes.light;

export function exibirMensagem(titulo, mensagem, tipo = "error"){
	return Vue.swal({
		title: titulo,
		html: mensagem,
		icon: tipo,
		showCancelButton: false,
		showConfirmButton: true,
		confirmButtonColor: theme?.primary,
		confirmButtonText: "OK",
	});
}

export function exibirMensagemAtencao(mensagem, tipo = "info"){
	return Vue.swal({
		title: "Atenção",
		html: mensagem,
		icon: tipo,
		showCancelButton: false,
		showConfirmButton: true,
		confirmButtonColor: theme?.primary,
		confirmButtonText: "OK",
	});
}

export function exibirMensagemErro(mensagem){
	exibirMensagem("Erro", mensagem);
}

export function exibirMensagemSucesso(mensagem){
	exibirMensagem("Sucesso", mensagem, "success");
}

export function exibirMensagemInfo(mensagem){
	exibirMensagem("Atenção", mensagem, "info");
}

export function exibirModalConfirmacao(titulo, mensagem = null, showCancelButton = true, confirmButtonText = "SIM"){
	return Vue.swal({

		title: titulo,

		text: mensagem,

		showCancelButton,

		showConfirmButton: true,

		confirmButtonColor: theme?.primary,

		cancelButtonColor: theme?.error,

		confirmButtonText,

		cancelButtonText: "NÃO",

	});
}

export function exibirModalConfirmacaoExclusao(titulo, mensagem = null, showCancelButton = true, confirmButtonText = "SIM"){
	return Vue.swal({

		title: titulo,

		text: mensagem,

		showCancelButton,

		showConfirmButton: true,

		confirmButtonColor: theme?.error,

		cancelButtonColor: theme?.primary,

		confirmButtonText,

		cancelButtonText: "NÃO",

	});
}

function trataListaMensagem(listaErro){
	let msgFormatada = "";
	const possuiMaisDeUmaMensagem = listaErro.length > 1;
	listaErro.forEach((erro) => {
		if(possuiMaisDeUmaMensagem){
			msgFormatada += "- ";
		}
		if(erro.mensagem != undefined){
			msgFormatada += `${erro.mensagem}`;
			msgFormatada += " <br> ";
		}
		else if(erro?.errors?.length > 0){
			msgFormatada += `${erro.errors}`;
			msgFormatada += " <br> ";
		}
		else{
			msgFormatada += `${erro}`;
			msgFormatada += " <br> ";
		}
	});
	return msgFormatada;
}

export function exibirMensagemErroApi(response, msgDefault){
	if(response != null && response instanceof Array && response?.length > 0){
		const msg = trataListaMensagem(response);
		exibirMensagemErro(msg);
		return;
	}

	if(response?.errors != null && response?.errors instanceof Array && response?.errors.length > 0){
		const msg = trataListaMensagem(response.errors);
		exibirMensagemErro(msg);
		return;
	}

	if(response?.mensagem != undefined){
		exibirMensagemErro(response.mensagem);
		return;
	}

	exibirMensagemErro(msgDefault);
}

export function exibirMensagemAtencaoApi(response, msgDefault){
	if(response != null && response instanceof Array && response?.length > 0){
		const msg = trataListaMensagem(response);
		exibirMensagemInfo(msg);
		return;
	}

	if(response?.errors != null && response?.errors instanceof Array && response?.errors.length > 0){
		const msg = trataListaMensagem(response.errors);
		exibirMensagemInfo(msg);
		return;
	}

	if(response?.mensagem != undefined){
		exibirMensagemInfo(response.mensagem);
		return;
	}

	exibirMensagemInfo(msgDefault);
}
