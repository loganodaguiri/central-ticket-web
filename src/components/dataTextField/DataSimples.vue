<template>
	<v-menu
		v-model="fromDateMenu"
		:close-on-content-click="true"
		transition="scale-transition"
		offset-y
		max-width="290px"
		min-width="auto"
		:disabled="disabled"
		>
		<template v-slot:activator="{ on, attrs }">
			<text-field
				id="inputColors"
				dense
				outlined
				readonly
				clearable
				@click:clear="limpar()"
				v-model="dataFormatadaParaExibicao"
				v-on="on"
				:label="label"
				v-bind="attrs"
				:placeholder="placeholder"
				@input="limpar"
				:prepend-inner-icon="prepend_inner_magnify ? 'mdi-magnify' : ''"/>
		</template>
		<v-date-picker
			locale="pt-br"
			color="primary"
			:min="min"
			:max="max"
			:value="valor"
			@input="atualizar"
			no-title
			/>
	</v-menu>
</template>

<script>
	// eslint-disable-next-line import/no-extraneous-dependencies
	import parseISO from "date-fns/parseISO";

	export default {
		name: "DataSimples",
		props: {
			value: {
				default: "",
			},
			formato: {
				type: String,
				default: "DD/MM/YYYY",
			},
			min: {
				type: String,
				default: null, // subtrair um dia para permitir cadastrar o dia atual.
			},
			max: {
				type: String,
				default: null,
			},
			prepend_inner_magnify: {
				type: Boolean,
				default: false,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			label: {
				type: String,
				default: "DD/MM/YYYY",
			},
			placeholder: {
				type: String,
				default: "DD/MM/YYYY",
			},
		},
		data(){
			return {
				dataFormatadaParaExibicao: "",
				fromDateMenu: false,
				valor: undefined,
			};
		},
		watch: {
			value(newValue, oldValue){
				if(this.isNumber(newValue)){
					this.valor = this.$date(newValue, "yyyy-MM-dd");
					this.dataFormatadaParaExibicao = this.formatarDatas();
				}
				else if(this.isValidDate(newValue)){
					this.valor = this.$date(new Date(parseISO(newValue)), "yyyy-MM-dd");
					this.dataFormatadaParaExibicao = this.formatarDatas();
				}
			},
		},
		// PRECISA SETAR NO MOUNTED E NO UPDATED PRA FUNCIONAR COM O v-tab-item MESMO UTILIZANDO O EAGER, AINDA NAO DESCOBRI O PQ
		updated(){
			if(this?.value){
				if(this.isNumber(this.value)){
					this.valor = this.$date(this.value, "yyyy-MM-dd");
					this.dataFormatadaParaExibicao = this.formatarDatas();
				}
				else if(this.isValidDate(this.value)){
					this.valor = this.$date(new Date(parseISO(this.value)), "yyyy-MM-dd");
					this.dataFormatadaParaExibicao = this.formatarDatas();
				}
			}
		},
		mounted(){
			if(this?.value){
				if(this.isNumber(this.value)){
					this.valor = this.$date(this.value, "yyyy-MM-dd");
					this.dataFormatadaParaExibicao = this.formatarDatas();
				}
				else if(this.isValidDate(this.value)){
					this.valor = this.$date(new Date(parseISO(this.value)), "yyyy-MM-dd");
					this.dataFormatadaParaExibicao = this.formatarDatas();
				}
			}
		},
		methods: {
			isNumber(value){
				return typeof value === "number" && Number.isFinite(value);
			},
			isValidDate(dateString){
				if(!dateString) return false;
				const regexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
				const regexDDMMYYYY = /^\d{2}-\d{2}-\d{4}$/;
				return dateString.match(regexYYYYMMDD) != null || dateString.match(regexDDMMYYYY) != null;
			},
			// metodo para forçar a limpeza da data quando utilizar o form.reset();
			formatarDatas(){
				if(!this?.valor) return null;
				const [year, month, day] = this.valor.split("-");
				return `${day}/${month}/${year}`;
			},
			atualizar(valor){
				if(this.isValidDate(valor)){
					this.valor = this.$date(new Date(parseISO(valor)), "yyyy-MM-dd");
				}
				this.dataFormatadaParaExibicao = this.formatarDatas();
				this.$emit("input", this.dataFormatadaParaExibicao);
			},
			limpar(){
				this.valor = undefined;
				this.dataFormatadaParaExibicao = "";
				this.$emit("input", undefined);
			},
		},
	};
</script>
<style scoped>

#inputColors::v-deep .v-input__control {
	border: 1px solid white;
}
#inputColors::v-deep .theme--light.v-input input{
	color: white;
}
#inputColors::v-deep .v-input__control input::placeholder {
	color: white;
}
</style>
