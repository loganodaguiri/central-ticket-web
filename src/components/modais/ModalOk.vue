<template>
	<modal
		:ref="refModal"
		:size="size"
		hide-footer
		centered
		:title="titulo">
		<template v-slot:modal-title>
			<span>{{}}</span>
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
		<v-row justify="center">
			<v-col cols="auto">
				<a-btn color="primaria-100" @click="esconderModal">
					Ok
				</a-btn>
			</v-col>
		</v-row>
	</modal>
</template>

<script>

	export default {
		name: "ModalOk",
		props: {
			configuracao: {
				type: String,
			},
			titulo: {
				type: String,
				default: "Confirmação",
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
				resolvePromise: null,
				rejectPromise: null,
				texto: null,
				refModal: "modal-confirmacao",
				textoPadrao: "Operação realizada com sucesos",
			};
		},
		methods: {
			async exibirModal(texto){
				this.$emit("exibindo");
				this.texto = texto;
				if(this.$refs[this.refModal]){
					this.$refs[this.refModal].show();
				}
				return new Promise((resolve, reject) => {
					this.resolvePromise = resolve;
					this.rejectPromise = reject;
				});
			},

			esconderModal(){
				this.$emit("ocultando");
				if(this.$refs[this.refModal]){
					this.$refs[this.refModal].hide();
				}
				this.resolvePromise(false);
			},
		},
	};
</script>
