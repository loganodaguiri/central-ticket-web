<template>
	<combo-box
		id="inputColors"
		label="Eventos"
		color="var(--cor-primaria-100)"
		outlined
		dense
		return-object
		item-text="name"
		item-value="id"
		:items="eventos"
		v-bind="$attrs"
		v-on="$listeners"
		@input="select"
		/>
</template>

<script>
	import { exibirMensagemErroApi } from "@/util/MessageUtils.js";
	import { buscarEventoByIdUser } from "@/services/EventoService.js";

	export default {
		name: "Materias",
		props: {

		},
		data(){
			return {
				eventos: [],
			};
		},

		methods: {
			listar(){
				buscarEventoByIdUser(localStorage.getItem("authuserId"))
					.then((res) => {
						console.log("Dados dos eventos recebidos:", res.data);

						// Ajuste a estrutura dos dados para o formato correto
						this.eventos = res.data.map((evento) => ({
							id: evento.evento_id, // ID do evento
							name: evento.name, // Nome do evento
						}));
					})
					.catch((error) => {
						exibirMensagemErroApi("Não foi possível carregar os eventos! Tente novamente mais tarde.");
						console.error(error);
					});
			},
			clean(){
				this.$emit("input", []);
			},
			select(newValue){
				this.$emit("input", newValue);
			},
		},

		watch: {
		},

		mounted(){
			this.listar();
		},
	};
</script>

<style scoped>

#inputColors::v-deep .v-input__control {
	border: 1px solid white;
}
#inputColors::v-deep .v-select.v-input--dense .v-select__selection--comma{
	color: black;
}
#inputColors::v-deep .v-icon.v-icon {
	color: white;
}
</style>
