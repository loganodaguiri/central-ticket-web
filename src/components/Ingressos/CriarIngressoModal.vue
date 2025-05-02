<template>
	<v-dialog v-model="show" max-width="800px" persistent>
		<v-card>
			<v-card-title class="headline">
				Criar ingresso <span class="blue--text font-weight-bold ml-1">pago</span>
			</v-card-title>

			<v-card-text>
				<v-alert dense type="info" class="mb-4">
					<strong>A taxa de serviço é repassada ao comprador</strong>, sendo exibida junto com o valor do ingresso.
				</v-alert>

				<v-form ref="form" v-model="valid">
					<v-container>
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field
									label="Título do ingresso *"
									v-model="form.titulo"
									:rules="[v => !!v || 'Campo obrigatório']"
									counter="45"
									required
									/>
							</v-col>

							<v-col cols="12" md="3">
								<v-text-field
									label="Quantidade *"
									v-model="form.quantidade"
									type="number"
									:rules="[v => !!v || 'Campo obrigatório']"
									required
									/>
							</v-col>

							<v-col cols="12" md="3">
								<v-text-field
									label="Valor a receber *"
									v-model="form.valor"
									prefix="R$"
									:rules="[v => !!v || 'Campo obrigatório']"
									required
									/>
							</v-col>

							<v-col cols="12">
								<v-checkbox
									label="Criar meia-entrada para este ingresso"
									v-model="form.meiaEntrada"
									/>
							</v-col>

							<v-col cols="12">
								<h4 class="mb-2 font-weight-medium">Período das vendas deste ingresso:</h4>
								<v-radio-group v-model="form.tipoPeriodo" row>
									<v-radio label="Por data" value="data" />
									<v-radio label="Por lote" value="lote" disabled />
								</v-radio-group>
							</v-col>

							<v-col cols="12" md="3">
								<v-text-field
									label="Data de Início das Vendas *"
									v-model="form.dataInicio"
									type="date"
									required
									/>
							</v-col>
							<v-col cols="12" md="3">
								<v-text-field
									label="Hora de Início *"
									v-model="form.horaInicio"
									type="time"
									required
									/>
							</v-col>
							<v-col cols="12" md="3">
								<v-text-field
									label="Data de Término das Vendas *"
									v-model="form.dataFim"
									type="date"
									required
									/>
							</v-col>
							<v-col cols="12" md="3">
								<v-text-field
									label="Hora de Término *"
									v-model="form.horaFim"
									type="time"
									required
									/>
							</v-col>

							<v-col cols="12">
								<h4 class="mb-2 font-weight-medium">Disponibilidade do Ingresso *</h4>
								<v-radio-group v-model="form.disponibilidade" row>
									<v-radio label="Para todo o público" value="publico" />
									<v-radio label="Restrito a convidados" value="convidados" />
									<v-radio label="Para ser adicionado manualmente" value="manual" />
								</v-radio-group>
							</v-col>

							<v-col cols="12" md="6">
								<v-text-field
									label="Quantidade mínima por compra *"
									v-model="form.minima"
									type="number"
									required
									/>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field
									label="Quantidade máxima por compra *"
									v-model="form.maxima"
									type="number"
									required
									/>
							</v-col>

							<v-col cols="12">
								<v-textarea
									label="Descrição do Ingresso (opcional)"
									v-model="form.descricao"
									counter="100"
									auto-grow
									/>
							</v-col>

							<v-col cols="12">
								<v-chip color="primary" label>
									VISÍVEL
								</v-chip>
								<span class="ml-2">Visibilidade do ingresso</span>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn text @click="show = false">CANCELAR</v-btn>
				<v-btn color="orange" dark @click="criarIngresso">CRIAR INGRESSO</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: "CriarIngressoModal",
		data(){
			return {
				show: false,
				valid: false,
				form: {
					titulo: "",
					quantidade: "",
					valor: "",
					meiaEntrada: false,
					tipoPeriodo: "data",
					dataInicio: "",
					horaInicio: "",
					dataFim: "",
					horaFim: "",
					disponibilidade: "publico",
					minima: 1,
					maxima: 5,
					descricao: "",
				},
			};
		},
		methods: {
			criarIngresso(){
				if(this.$refs.form.validate()){
					console.log("Dados do ingresso:", this.form);
					this.show = false;
				}
			},
		},
	};
</script>

<style scoped>
.font-weight-medium {
  font-weight: 500;
}
</style>
