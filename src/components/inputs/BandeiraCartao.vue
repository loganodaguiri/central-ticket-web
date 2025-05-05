<template>
	<combo-box
		autocomplete="off"
		:items="bandeiras"
		item-text="nome"
		item-value="sigla"
		:value="value"
		@input="$emit('input', $event.sigla)"
		v-bind="$attrs"
		v-on="$listeners"
		:loading="carregando">
		<template v-slot:selection="{item}">
			<!-- <v-list-item-avatar>
					<img :src="item.imagem"/>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-html="item.nome"/>
				</v-list-item-content> -->
			<!-- <v-chip
				v-bind="data.attrs"
				:input-value="data.selected"
				close
				@click="data.select"
				@click:close="remove(data.item)"
			> -->
			<v-list-item-avatar class="my-0">
				<v-img  contain width="20px" height="20px" :src="item.imagem"/>
			</v-list-item-avatar>
			<v-list-item-content  class="my-0 py-0">
				<v-list-item-title v-html="item.nome"/>
			</v-list-item-content>
			<!-- </v-chip> -->
		</template>
		<template v-slot:item="{item}" >
			<template>
				<v-list-item-avatar>
					<v-img  contain width="20px" height="20px" :src="item.imagem"/>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-html="item.nome"/>
				</v-list-item-content>
			</template>
		</template>
	</combo-box>
</template>

<script>
	import { exibirMensagemErro } from "@/util/MessageUtils.js";
	import { emptyIfBlank, isBlank, isNotBlank } from "@/util/StringUtils.js";
	import { extrairMensagemExibicao } from "@/util/RequestResponseUtils.js";
	import { listarBandeiras } from "@/services/BandeiraCartaoService.js";

	export default {
		name: "BandeiraCartao",
		props: {
			value: {
				type: Object,
			},
			numero: {
				type: String,
				default: "",
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data(){
			return {
				carregando: false,
				bandeiras: [],
				numBandeirasHabilitadas: 0,
				carregou: false,
			};
		},
		computed: {
			desabilitar(){
				return this.disabled || !this.numeroValido || this.numBandeirasHabilitadas <= 1;
			},
			numeroValido(){
				const numeroTratado = emptyIfBlank(this.numero);
				return numeroTratado.length == 16;
			},
		},
		watch: {
			value(){
				this.atualizar();
			},
			numero(){
				this.atualizar();
			},
		},
		created(){
			this.buscarBandeirasAtualizar();
		},
		methods: {
			buscarBandeirasAtualizar(){
				this.carregando = true;
				listarBandeiras()
					.then((response) => {
						this.bandeiras = [];
						for(const band of response.data){
							const svg = atob(band.imagemBase64);
							const blob = new Blob([svg], { type: "image/svg+xml" });
							band.imagem = URL.createObjectURL(blob);
							band.habilitada = true;
							this.bandeiras.push(band);
							this.numBandeirasHabilitadas += 1;
						}
						this.carregou = true;
						this.atualizar();
					})
					.catch((error) => {
						console.error(error);
						const msg = extrairMensagemExibicao(error.response, "Erro ao buscar bandeiras de cartões. Se o erro persistir, contate o suporte.");
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.carregando = false;
					});
			},
			atualizar(){
				if(!this.carregou){
					return;
				}
				const numeroTratado = emptyIfBlank(this.numero);
				let ultimoHab = null;
				let numHab = 0;
				for(const band of this.bandeiras){
					band.habilitada = false;
					for(const pref of band.prefixos){
						if(isNotBlank(pref) && numeroTratado.startsWith(pref)){
							band.habilitada = true;
							numHab += 1;
							ultimoHab = band;
							break;
						}
					}
				}
				if(numHab <= 0){
					for(const band of this.bandeiras){
						band.habilitada = false;
						for(const pref of band.prefixos){
							if(pref.startsWith(numeroTratado) || isBlank(pref)){
								band.habilitada = true;
								numHab += 1;
								break;
							}
						}
					}
				}
				if(numHab == 1 && ultimoHab != null){
					this.$emit("input", ultimoHab);
					this.numBandeirasHabilitadas = numHab;
					return;
				}
				if(numHab <= 0){
					for(const band of this.bandeiras){
						band.habilitada = true;
					}
					numHab = this.bandeiras.length;
				}
				this.numBandeirasHabilitadas = numHab;
				for(const band of this.bandeiras){
					if(band.sigla == this.value && band.habilitada){
						this.$emit("input", band);
						return;
					}
				}
				this.$emit("input", null);
			},
		},
	};
</script>

<style scoped>
	.v-select::v-deep.v-text-field--outlined:not(.v-text-field--single-line).v-input--dense .v-select__selections{
		padding:0;
	}
</style>
