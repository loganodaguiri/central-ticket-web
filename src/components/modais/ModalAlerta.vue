<template>
	<modal
		:ref="idModal"
		hide-footer
		centered
		@hidden="cancelar()"
		:title="tituloModal">
		<v-container>
			<v-row justify="center">
				<v-col cols="12">
					{{texto}}
				</v-col>
				<v-col cols="auto">
					<a-btn buttonColor="primaria-100" @click="confirmar()">
						Confirmar
					</a-btn>
				</v-col>
			</v-row>
		</v-container>
	</modal>
</template>

<script>

	export default {
		name: "ModalAlerta",
		data(){
			return {
				resolvePromise: null,
				rejectPromise: null,
				tituloModal: "Alerta",
				idModal: "modal-alerta",
				texto: null,
				textoPadrao:
					"Atenção! Tente novamente mais tarde. Se o alerta persistir, contate o suporte.",
			};
		},
		methods: {
			reiniciar(){
				this.texto = this.textoPadrao;
			},
			async exibirModal(texto){
				if(texto){
					this.texto = texto;
				}
				if(this.$refs[this.idModal]){
					this.$refs[this.idModal].show();
				}
				return new Promise((resolve, reject) => {
					this.resolvePromise = resolve;
					this.rejectPromise = reject;
				});
			},
			esconderModal(){
				if(this.$refs[this.idModal]){
					this.$refs[this.idModal].hide();
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
