/*	Componente responsável por criar um botão genérico	*/

<template>

	<v-btn
		class="local-btn-default"
		:aria-hidden="areaHidden"
		:hidden="hidden"
		:style="buttonStyle"
		:block="block"
		:loading="needLoading"
		v-bind="$attrs"
		:disabled="disabled"
		v-on="$listeners"
		>

		<v-icon
			v-if="buttonIcon"
			>

			{{buttonIcon}}

		</v-icon>
		<!--	Espaçamento	-->
		<slot/>

		<!--	Icone do botão	-->

		<!--	Nome do botão	-->
		{{buttonName}}
		<slot name="right"/>

	</v-btn>

</template>

<script>

	/*	Todos os importes necessarios para a construção deste componente	*/

	/*	Exportanto todos os dados	*/
	export default {
		name: "ButtonDefault",
		props: {

			defaultStyles: {
				type: Boolean,
				default: false,
			},
			hidden: {
				type: Boolean,
				default: false,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			block: {
				type: Boolean,
				default: false,
			},
			areaHidden: {
				type: Boolean,
				default: false,
			},
			buttonColor: {
				type: String,
				default: "",
			},

			buttonName: String,
			buttonIcon: String,
			needLoading: {
				required: false,
			},
		},
		computed: {

			/*	Função responsável por aplicar o estilo no botão setado	*/
			buttonStyle(){
				const coresPadrao = ["danger", "error", "warning", "info"];
				if(this.defaultStyles || this.disabled){
					return {};
				}
				const style = {};
				const theType = (this.buttonColor != "") ? this.buttonColor : "primaria";

				/*	Se o botão não for default aplica-se esta configuração 	*/
				if(!this.transparente){
					style.color = "var(--cor-branca)!important";
					if(coresPadrao.indexOf(theType) >= 0){
						style["background-color"] = `var(--${theType})!important`;
					}
					else{
						style["background-color"] = `var(--cor-${theType})!important`;
					}
				}
				if(this.buttonColor.indexOf("branca") >= 0){
					style.color = "var(--cor-primaria-100)!important";
				}

				/*	Se o botão setado for default aplica-se esta configuração	*/
				if(!this.buttonColor){
					style.color = "var(--cor-primaria-100)!important";
					style["background-color"] = "var(--cor-branca)!important";
					style.border = "1px solid var(--cor-primaria-100)";
				}

				return style;
			},
		},
		methods: {
		},
	};
</script>

<style scoped>
	/*	Classe de estilização do botão dinâmino	*/
    .local-btn-default::v-deep {
			margin: 0.2rem;
			border-radius: 12px!important;
			text-transform: none;
			opacity: 1!important;
    }

    .local-btn-default::v-deep:hover {
			margin: 0.2rem;
			border-radius: 12px!important;
			text-transform: none;
			opacity: .8!important;
    }

    .local-btn-default::v-deep span{
			text-decoration:none!important;
    }

	/*	---------------------------------------	*/

</style>
