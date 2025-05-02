<template>
	<text-field-simple-mask
		v-model="tudo"
		:options="optionsMes"
		mask="##/##"
		masked
		v-bind="$attrs"
		v-on="$listeners"
		/>
</template>

<script>

	export default {
		name: "DataMesInput",
		props: {
			ano: {
				type: [String, Number],
			},
			mes: {
				type: [String, Number],
			},
			formato: {
				type: String,
				default: "DD/MM/YYYY",
			},
			fluid: {
				type: Boolean,
				default: false,
			},
			anoMax: {
				type: [Number, String],
				default: 9999,
			},
			anoMin: {
				type: Number,
				default: 0,
			},
		},
		data(){
			return {
				tudo: "",
				optionsMes: {
					decimalPlaces: 0,
					decimalCharacter: ".",
					digitGroupSeparator: "",
					roundingMethod: "U",
					emptyInputBehavior: "null",
					maximumValue: 12,
					minimumValue: 0,
					modifyValueOnWheel: true,
					wheelOn: "focus",
					wheelStep: 1,
					leadingZero: "keep",
				},
				optionsAno: {
					decimalPlaces: 0,
					decimalCharacter: ".",
					digitGroupSeparator: "",
					roundingMethod: "U",
					emptyInputBehavior: "null",
					maximumValue: this.anoMax,
					minimumValue: 0,
					modifyValueOnWheel: true,
					wheelOn: "focus",
					wheelStep: 1,
					leadingZero: "keep",
				},
				mesInterno: false,
				anoInterno: false,
				anoFocus: false,
				mesFocus: false,
			};
		},
		created(){
			this.tudo = `${this.mes}/${this.ano}`;
		},
		watch: {
			tudo(valor){
				this.atualizar(valor);
			},
		},
		computed: {
			classeFocoSeparador(){
				if(this.anoFocus){
					return "separadorFocusAno";
				}
				if(this.mesFocus){
					return "separadorFocusMes";
				}
				return "";
			},
		},
		methods: {
			atualizar(valor){
				this.mesInterno = valor?.split("/")[0];
				this.anoInterno = valor?.split("/")[1];
				this.$emit("update:mes", valor?.split("/")[0]);
				this.$emit("update:ano", valor?.split("/")[1]);
				this.validar();
			},
			validar(){
				if(this.anoInterno == null || this.mesInterno == null){
					this.$emit("update:valido", false);
					return;
				}
				if(this.anoInterno > this.anoMax && this.anoInterno < this.anoMin){
					this.$emit("update:valido", false);
				}
				const anoAtual = new Date().getFullYear();
				const mesAtual = new Date().getMonth();
				if(this.anoInterno > anoAtual){
					this.$emit("update:valido", true);
					return;
				}
				if(this.anoInterno == anoAtual && this.mesInterno > mesAtual){
					this.$emit("update:valido", true);
					return;
				}
				this.$emit("update:valido", false);
			},
			resetar(){
				this.mesInterno = null;
				this.anoInterno = null;
			},
		},
	};
</script>

<style scoped>

.tudo{
  width: 100%;
  overflow: auto;
}

.select-mes{
  margin: 0 !important;
  min-width: 3em !important;
	max-width: 3em !important;
  border-bottom-right-radius : 0;
  border-top-right-radius : 0;
  border-right: 0;
	text-align: end;
}

.select-ano{
  margin: 0 !important;
  min-width: 4em !important;
	max-width: 4em !important;
  border-bottom-left-radius : 0;
  border-top-left-radius : 0;
	border-left: 0;
	text-align: start;
}

.select-mes-fluid{
  margin: 0 !important;
	width: 100%;
	min-width: 3em !important;
	max-width: 100% !important;
  border-bottom-right-radius : 0;
  border-top-right-radius : 0;
  border-right: 0;
	text-align: end;
}

.select-ano-fluid{
  margin: 0 !important;
	width: 100%;
	min-width: 4em !important;
	max-width: 100% !important;
	border-bottom-left-radius : 0;
  border-top-left-radius : 0;
	border-left: 0;
	text-align: start;
}

.separador{
	border-top: 1px solid #d9d9d9;
	border-bottom: 1px solid #d9d9d9;
	border-radius: 0;
	height: 38px;
	width: 20px;
	min-width: 20px !important;
	overflow: hidden;
	background: "var(--cor-branca)";
}

.separadorFocusAno{
	border-bottom: 1px solid var(--cor-destaque-primaria-clara);
}

.separadorFocusMes{
	border-top: 1px solid var(--cor-destaque-primaria-clara);
}

.invalido{
	border-color: red;
}

</style>
