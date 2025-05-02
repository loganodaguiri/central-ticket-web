<template>
	<modal
		:ref="refModal"
		:size="size"
		hide-footer
		centered
		@hidden="cancelar()">
		<template v-slot:modal-title>
			<span>{{titulo}}</span>
		</template>
		<div class="p-2 mb-3 d-flex flex-row justify-content-center">
			<div v-if="texto">
				<span v-html="texto"/>
			</div>
			<div v-else-if="$slots.default">
				<slot/>
			</div>
			<div v-else>
				{{textoPadrao}}
			</div>
		</div>
		<v-row>
			<br/>
			<v-col class="d-flex flex-row justify-content-center">
				<ButtonDefault
					buttonName="Cancelar"
					@click="cancelar()"
					/>
			</v-col>
			<v-col class="d-flex flex-row justify-content-center">
				<ButtonDefault
					buttonName="Confirmar"
					:disabled="desabilitarConfirmar"
					@click="confirmar()"
					/>
			</v-col>
		</v-row>
	</modal>
</template>

<script>

	import ButtonDefault from "@/components/buttons/ButtonDefault.vue";

	export default {
		name: "ModalConfirmacao",

		components: {
			ButtonDefault,
		},

		props: {
			configuracao: {
				type: String,
			},
			titulo: {
				type: String,
				default: "Confirmar Ação",
			},
			size: {
				type: String,
				default: "sm",
			},
			desabilitarConfirmar: {
				type: Boolean,
				default: false,
			},
		},
		data(){
			return {
				textoCancelar: null,
				textoConfirmar: null,
				resolvePromise: null,
				rejectPromise: null,
				texto: null,
				refModal: "modal-confirmacao",
				textoPadrao:
					"Erro! Tente novamente mais tarde. Se o erro persistir, contate o suporte.",
			};
		},
		methods: {
			async exibirModal(texto){
				this.textoPadrao = texto;
				this.$emit("exibindo");
				if(this.$refs[this.refModal]){
					this.$refs[this.refModal].show();
				}
				return new Promise((resolve, reject) => {
					this.resolvePromise = resolve;
					this.rejectPromise = reject;
				});
			},
			esconderModal(){
				this.textoCancelar = null;
				this.textoConfirmar = null;
				this.$emit("ocultando");
				if(this.$refs[this.refModal]){
					this.$refs[this.refModal].hide();
				}
			},
			confirmar(){
				this.$emit("confirmado");
				this.esconderModal();
				this.resolvePromise(true);
			},
			cancelar(){
				this.$emit("cancelado");
				this.esconderModal();
				this.resolvePromise(false);
			},
		},
	};
</script>
