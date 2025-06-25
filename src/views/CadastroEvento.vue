<template>
	<div class="wrapper">

		<div>
			<AppBar/>
		</div>

		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" v-bind:class="{'mx-auto':$vuetify.breakpoint.mdAndDown}">
				<p class="banner-texto-grande" style="align-items: center;">
					<b>Cadastro de ingressos</b>
				</p>
			</div>
		</div>
		<div id="secao-baloes-depoimentos" style="background-color: white;">
			<div id="secao-cadastro-evento" style="background-color: #f9f9f9; padding: 40px 0;">
				<v-container>
					<v-row justify="center">
						<v-col cols="12" md="8" lg="6">

							<!-- Seção 1: Informações Básicas -->
							<v-card class="pa-6 mb-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">1. Informações Básicas</p>
								<v-form ref="form" v-model="valid">
									<v-row>
										<!-- Nome do Evento -->
										<v-col cols="12">
											<v-text-field
												v-model="nomeEvento"
												label="Nome do Evento"
												:rules="[v => !!v || 'Nome é obrigatório']"
												required
												/>
										</v-col>

										<!-- Imagem de Divulgação -->
										<v-col cols="12">
											<v-file-input
												v-model="imagemDivulgacao"
												label="Imagem de Divulgação (opcional)"
												accept="image/*"
												prepend-icon="mdi-image"
												/>
										</v-col>

										<!-- Categoria -->
										<v-col cols="12">
											<v-text-field
												v-model="categoria"
												label="Categoria (opcional)"
												/>
										</v-col>
									</v-row>
								</v-form>
							</v-card>

							<!-- Seção 2: Data e horário -->
							<v-card class="pa-6 mb-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">2. Data e horário</p>
								<v-form ref="formDataHorario">
									<v-row>
										<!-- Data de Início -->
										<v-col cols="12" md="6">
											<v-text-field
												v-model="dataInicio"
												label="Data de Início"
												type="date"
												:rules="[v => !!v || 'Obrigatório']"
												required
												/>
										</v-col>

										<!-- Hora de Início -->
										<v-col cols="12" md="6">
											<v-text-field
												v-model="horaInicio"
												label="Hora de Início"
												type="time"
												:rules="[v => !!v || 'Obrigatório']"
												required
												/>
										</v-col>

										<!-- Data de Término -->
										<v-col cols="12" md="6">
											<v-text-field
												v-model="dataTermino"
												label="Data de Término"
												type="date"
												:rules="[v => !!v || 'Obrigatório']"
												required
												/>
										</v-col>

										<!-- Hora de Término -->
										<v-col cols="12" md="6">
											<v-text-field
												v-model="horaTermino"
												label="Hora de Término"
												type="time"
												:rules="[v => !!v || 'Obrigatório']"
												required
												/>
										</v-col>
									</v-row>
								</v-form>
							</v-card>

							<!-- Seção 3: Descrição do evento -->
							<v-card class="pa-6 mb-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">3. Descrição do evento</p>
								<v-form ref="formDescricao">
									<v-row>
										<v-col cols="12">
											<vue-editor v-model="descricao" />
										</v-col>
									</v-row>
								</v-form>
							</v-card>

							<!-- Seção 4: Local do Evento -->
							<v-card class="pa-6 mb-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">
									4. Onde o seu evento vai acontecer?
								</p>
								<v-form ref="formLocal">
									<v-row>
										<!-- Nome do Local -->
										<v-col cols="12">
											<v-text-field
												v-model="nomeLocal"
												label="Nome do Local"
												:rules="[v => !!v || 'Campo obrigatório']"
												required
												/>
										</v-col>

										<!-- CEP -->
										<v-col cols="12" md="4">
											<v-text-field
												v-model="cep"
												label="CEP"
												v-mask="'#####-###'"
												:rules="[v => !!v || 'Campo obrigatório']"
												required
												/>
										</v-col>

										<!-- Rua -->
										<v-col cols="12" md="8">
											<v-text-field
												v-model="rua"
												label="Av./Rua"
												:rules="[v => !!v || 'Campo obrigatório']"
												required
												disabled
												/>
										</v-col>

										<!-- Número -->
										<v-col cols="12" md="4">
											<v-text-field
												v-model="numero"
												label="Número"
												/>
										</v-col>

										<!-- Complemento -->
										<v-col cols="12" md="8">
											<v-text-field
												v-model="complemento"
												label="Complemento"
												/>
										</v-col>

										<!-- Bairro -->
										<v-col cols="12" md="6">
											<v-text-field
												v-model="bairro"
												label="Bairro"
												disabled
												/>
										</v-col>

										<!-- Cidade -->
										<v-col cols="12" md="4">
											<v-text-field
												v-model="cidade"
												label="Cidade"
												disabled
												/>
										</v-col>

										<!-- Estado -->
										<v-col cols="12" md="2">
											<v-text-field
												v-model="estado"
												label="UF"
												maxlength="2"
												disabled
												/>
										</v-col>
									</v-row>
								</v-form>
							</v-card>

							<!-- Seção 5: Sobre o produtor -->
							<v-card class="pa-6 mb-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">5. Sobre o produtor</p>
								<v-form ref="formProdutor">
									<v-row>
										<!-- Nome do Produtor -->
										<v-col cols="12">
											<v-text-field
												v-model="nomeProdutor"
												label="Nome do produtor"
												:rules="[v => !!v || 'Campo obrigatório']"
												required
												/>
										</v-col>

										<!-- Descrição do Produtor -->
										<v-col cols="12">
											<vue-editor v-model="descricaoProdutor" />
										</v-col>
									</v-row>
								</v-form>
							</v-card>

							<!-- Seção 6: Ingressos -->
							<v-card class="pa-6 mb-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">6. Ingressos</p>
								<v-row justify="center" align="center" class="text-center">
									<v-col cols="12" md="6">
										<v-btn
											color="primary"
											dark
											large
											class="ma-2"
											@click="abrirModalIngresso"
											>
											Criar ingresso
										</v-btn>
									</v-col>
								</v-row>

								<!-- Lista de ingressos -->
								<v-list two-line>
									<v-list-item
										v-for="(ingresso, index) in ingressos"
										:key="index"
										>
										<v-list-item-content>
											<v-list-item-title>{{ ingresso.titulo }}</v-list-item-title>
											<v-list-item-subtitle>
												Quantidade: {{ ingresso.quantidade }} - Valor: R$ {{ ingresso.valor }}
											</v-list-item-subtitle>
										</v-list-item-content>

										<!-- Botões de ação -->
										<v-list-item-action>
											<div class="d-flex">
												<v-btn icon @click="showEditarIngresso(index)">
													<v-icon>mdi-pencil</v-icon>
												</v-btn>
												<v-btn icon color="red" @click="excluirIngresso(index)">
													<v-icon>mdi-delete</v-icon>
												</v-btn>
											</div>
										</v-list-item-action>
									</v-list-item>
								</v-list>
							</v-card>

							<!-- Seção 7: Responsabilidades -->
							<v-card class="pa-6 mb-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">7. Responsabilidades</p>
								<v-form ref="formResponsabilidades">
									<v-row>
										<v-col cols="12">
											<v-checkbox
												v-model="responsabilidadeConcordada"
												label="Ao publicar este evento, estou de acordo com os Termos de uso, com as Diretrizes de Comunidade e com as Regras de meia-entrada, bem como declaro estar ciente da Política de Privacidade e das Obrigatoriedades Legais."
												:rules="[v => v || 'Você deve concordar com os termos e condições']"
												required
												/>
										</v-col>
									</v-row>
								</v-form>
							</v-card>

							<!-- Botão para continuar (ou salvar) -->
							<v-card class="pa-4 text-center" elevation="2" rounded="xl">
								<v-btn color="primary" @click="salvarEvento" :disabled="!responsabilidadeConcordada">
									Salvar Evento
								</v-btn>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</div>
			<div>
				<Rodape/>
			</div>
		</div>

		<v-dialog v-model="showModalIngresso" max-width="800px" persistent>
			<v-card>
				<v-card-title class="headline">
					Criar ingresso
				</v-card-title>

				<v-card-text>
					<v-form ref="form" v-model="valid">
						<v-container>
							<v-row>
								<v-col cols="12" md="6">
									<v-text-field
										label="Título do ingresso *"
										v-model="formIngressoPago.titulo"
										:rules="[v => !!v || 'Campo obrigatório']"
										counter="45"
										required
										/>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field
										label="Quantidade *"
										v-model="formIngressoPago.quantidade"
										type="number"
										:rules="[v => !!v || 'Campo obrigatório']"
										required
										/>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field
										label="Valor a receber *"
										v-model="formIngressoPago.valor"
										prefix="R$"
										:rules="[v => !!v || 'Campo obrigatório']"
										required
										/>
								</v-col>

								<!-- Checkbox só aparece se for novo ingresso -->
								<v-col cols="12" v-if="!formIngressoPago.ingresso_id">
									<v-checkbox
										label="Criar meia-entrada para este ingresso"
										v-model="formIngressoPago.meiaEntrada"
										/>
								</v-col>

								<!-- Campo extra só se meia-entrada estiver true e for novo ingresso -->
								<v-col cols="12" md="6" v-if="!formIngressoPago.ingresso_id && formIngressoPago.meiaEntrada">
									<v-text-field
										label="Quantidade de meia-entrada *"
										v-model="formIngressoPago.quantidadeMeiaEntrada"
										type="number"
										:rules="[v => !!v || 'Campo obrigatório']"
										required
										/>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field
										label="Data de Início das Vendas *"
										v-model="formIngressoPago.dataInicio"
										type="date"
										required
										/>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field
										label="Hora de Início *"
										v-model="formIngressoPago.horaInicio"
										type="time"
										required
										/>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field
										label="Data de Término das Vendas *"
										v-model="formIngressoPago.dataFim"
										type="date"
										required
										/>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field
										label="Hora de Término *"
										v-model="formIngressoPago.horaFim"
										type="time"
										required
										/>
								</v-col>

								<v-col cols="12" md="6">
									<v-text-field
										label="Quantidade mínima por compra *"
										v-model="formIngressoPago.minima"
										type="number"
										:min="0"
										required
										/>
								</v-col>

								<v-col cols="12" md="6">
									<v-text-field
										label="Quantidade máxima por compra *"
										v-model="formIngressoPago.maxima"
										:min="0"
										type="number"
										required
										/>
								</v-col>

								<v-col cols="12">
									<v-switch
										v-model="isVisible"
										label="Visibilidade do ingresso"
										color="primary"
										inset
										/>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card-text>

				<v-card-actions>
					<v-spacer />
					<v-btn text @click="fecharModalIngresso()">CANCELAR</v-btn>
					<v-btn color="#EA0763" dark @click="salvarIngressos()">SALVAR INGRESSO</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import Vue from "vue";
	import LogoHorizontal from "@/assets/logo-horizontal.png";
	import { exibirMensagemErro, exibirMensagemSucesso } from "@/util/MessageUtils.js";
	import { buscaCep } from "@/services/ViaCepService.js";
	import { cadastroLocal, editarLocal } from "@/services/LocalService.js";
	import { cadastroProdutor, edicaoProdutor } from "@/services/ProdutorService.js";
	import { cadastroEvento, buscarEventoById, editarEvento } from "@/services/EventoService.js";
	import { VueEditor } from "vue2-editor";
	import Rodape from "@/components/Rodape.vue";
	import {
		cadastroIngrsso, buscaIngresoByIdEvento, editarIngresso, excluirIngresso,
	} from "@/services/IngressoService.js";
	import AppBar from "@/components/AppBar.vue";
	import { faL } from "@fortawesome/free-solid-svg-icons";

	export default {
		name: "CdastroEvento",

		components: {
			VueEditor,
			AppBar,
			Rodape,
		},

		data(){
			return {
				LogoHorizontal,
				nome: "",
				email: "",
				mensagem: "",
				valid: false,
				form: null,
				cep: "",
				rua: "",
				numero: "",
				complemento: "",
				bairro: "",
				cidade: "",
				estado: "",
				showModalIngresso: false,
				tipoIngresso: "pago",
				ingressos: [],
				formIngressoPago: {
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
					quantidadeMeiaEntrada: null,
				},
				nomeEvento: "",
				classificacao: "",
				categoria: "",
				dataInicio: "",
				horaInicio: "",
				dataTermino: "",
				horaTermino: "",
				descricao: "",
				tokenLogando: null,
				userId: null,
				nomeProdutor: "",
				descricaoProdutor: "",
				produtorId: null,
				imagemDivulgacao: null,
				nomeLocal: "",
				localId: null,
				evento_id: null,
				indiceEdicaoIngresso: null,
				modalModoEdicao: false,
				responsabilidadeConcordada: false,
			};
		},

		computed: {
			isEditar(){
				return this.$route.params?.id;
			},
		},

		watch: {
			cep(novoCep){
				const apenasNumeros = novoCep.replace(/\D/g, "");

				if(apenasNumeros.length === 8){
					this.buscarEndereco(apenasNumeros);
				}
			},
		},

		created(){
			if(this.isEditar != null){
				this.evento_id = this.isEditar;
				this.buscarEventoById();
				this.buscarIngressosByIdEvento();
			}
		},

		methods: {
			buscarEventoById(){
				this.$carregando();
				buscarEventoById(this.isEditar)
					.then((res) => {
						this.nomeEvento = res.data.name;
						this.categoria = res.data.name;
						this.dataInicio = res.data.dateStart;
						this.dataTermino = res.data.dateEnd;
						this.horaInicio = res.data.startTime;
						this.horaTermino = res.data.endTime;
						this.descricao = res.data.description;
						this.nomeLocal = res.data.house.name;
						this.cep = res.data.house.zip_code;
						this.numero = res.data.house.number;
						this.complemento = res.data.house.complemento;
						this.nomeProdutor = res.data.producer.name;
						this.descricaoProdutor = res.data.producer.description;
						this.localId = res.data.house.house_id;
						this.produtorId = res.data.producer.produtor_id;
					}).catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			buscarIngressosByIdEvento(){
				this.$carregando();
				buscaIngresoByIdEvento(this.isEditar)
					.then((res) => {
						this.ingressos = res.data.map((ingresso) => ({
							ingresso_id: ingresso.ingresso_id,
							titulo: ingresso.titulo,
							quantidade: ingresso.quantidade_total,
							valor: ingresso.valor,
							meiaEntrada: ingresso.meia_entrada,
							dataInicio: ingresso.data_inicio_vendas,
							horaInicio: ingresso.hora_inicio_vendas,
							dataFim: ingresso.data_termino_vendas,
							horaFim: ingresso.hora_termino_vendas,
							minima: ingresso.quantidade_minima_por_compra,
							maxima: ingresso.quantidade_maxima_por_compra,
							descricao: ingresso.descricao,
						}));
					})
					.catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			showEditarIngresso(index){
				const ingresso = this.ingressos[index];

				this.formIngressoPago = {
					ingresso_id: ingresso.ingresso_id,
					titulo: ingresso.titulo,
					quantidade: ingresso.quantidade,
					valor: ingresso.valor,
					meiaEntrada: ingresso.meiaEntrada || false,
					quantidadeMeiaEntrada: ingresso.quantidadeMeiaEntrada || null,
					dataInicio: ingresso.dataInicio,
					horaInicio: ingresso.horaInicio,
					dataFim: ingresso.dataFim,
					horaFim: ingresso.horaFim,
					minima: ingresso.minima,
					maxima: ingresso.maxima,
					descricao: ingresso.descricao || "",
				};

				this.indiceEdicaoIngresso = index;
				this.modalModoEdicao = true; // ESSA LINHA É ESSENCIAL
				this.showModalIngresso = true;
			},

			excluirIngresso(index){
				this.$carregando();
				const ingresso = this.ingressos[index];
				excluirIngresso(ingresso.ingresso_id)
					.then((res) => {
						this.buscarIngressosByIdEvento();
					}).catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			async buscarEndereco(){
				this.$carregando();
				buscaCep(this.cep)
					.then((res) => {
						this.rua = res.data.logradouro;
						this.bairro = res.data.bairro;
						this.cidade = res.data.localidade;
						this.estado = res.data.uf;
					}).catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			abrirModalIngresso(){
				this.showModalIngresso = true;
			},

			fecharModalIngresso(){
				this.resetarFormulario();
				this.showModalIngresso = false;
			},

			salvarEvento(){
				this.$carregando();

				const localForm = {
					name: this.nomeLocal,
					address: this.rua,
					city: this.cidade,
					state: this.estado,
					zip_code: this.cep.replace(/\D/g, ""),
					website: "https://www.youtube.com/",
					number: this.numero,
					complemento: this.complemento,
				};

				const acao = this.localId == null
					? cadastroLocal(localForm)
					: editarLocal({ ...localForm, house_id: this.localId });

				acao
					.then((res) => {
						if(this.localId == null){
							this.localId = res.data.newLocal.house_id;
						}
						return this.salvarProdutor();
					})
					.catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			salvarProdutor(){
				this.$carregando();

				const produtorForm = {
					name: this.nomeProdutor,
					description: this.descricaoProdutor,
					usuario_id: localStorage.getItem("authuserId"),
				};

				const acao = this.produtorId == null
					? cadastroProdutor(produtorForm)
					: edicaoProdutor({ ...produtorForm, produtor_id: this.produtorId });

				acao
					.then((res) => {
						this.produtorId = res.data.produtor_id;
						this.salvarEvento2();
					})
					.catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			salvarEvento2(){
				this.$carregando();

				const eventoForm = new FormData();
				eventoForm.append("name", this.nomeEvento);
				eventoForm.append("description", this.descricao);
				eventoForm.append("startTime", this.horaInicio);
				eventoForm.append("endTime", this.horaTermino);
				eventoForm.append("dateStart", this.dataInicio);
				eventoForm.append("dateEnd", this.dataTermino);
				eventoForm.append("category", this.categoria);
				eventoForm.append("subject", "teste");
				eventoForm.append("house_id", this.localId);
				eventoForm.append("produtor_id", this.produtorId);

				// Adiciona imagem se houver
				if(this.imagemDivulgacao){
					eventoForm.append("photos", this.imagemDivulgacao);
				}

				// Adiciona o ID do evento no próprio FormData
				if(this.evento_id != null){
					eventoForm.append("evento_id", this.evento_id);
				}

				const acao = this.evento_id == null
					? cadastroEvento(eventoForm)
					: editarEvento(eventoForm); // ← passa direto o FormData aqui

				acao
					.then((res) => {
						this.evento_id = res.data.newEvent?.evento_id ?? this.evento_id;
						this.salvarIngresso();
					})
					.catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			salvarIngressos(){
				if(this.modalModoEdicao && this.indiceEdicaoIngresso !== null){
					// Edição: atualiza o ingresso no índice correspondente
					this.ingressos.splice(this.indiceEdicaoIngresso, 1, { ...this.formIngressoPago });
				}
				else{
					// Criação: adiciona novo ingresso
					this.ingressos.push({ ...this.formIngressoPago });
				}

				this.showModalIngresso = false;
				this.resetarFormulario();
				console.log(this.ingressos);
			},

			resetarFormulario(){
				this.formIngressoPago = {
					titulo: "",
					quantidade: 0,
					valor: 0,
					meiaEntrada: false,
					quantidadeMeiaEntrada: false,
					dataInicio: "",
					horaInicio: "",
					dataFim: "",
					horaFim: "",
					minima: 1,
					maxima: 5,
					descricao: "",
				};
				this.modalModoEdicao = false;
				this.indiceEdicaoIngresso = null;
			},

			salvarIngresso(){
				this.$carregando();

				// Arrays para armazenar ingressos de criação e edição
				const ingressosCriacao = [];
				const ingressosEdicao = [];

				// Preenche os arrays de criação e edição
				this.ingressos.forEach((ingresso) => {
					const ingressoDataRegister = {
						evento_id: this.evento_id,
						tickets: [{
							titulo: ingresso.titulo,
							quantidade_total: ingresso.quantidade,
							valor: ingresso.valor,
							periodo_vendas_tipo: "Por Data",
							data_inicio_vendas: ingresso.dataInicio,
							hora_inicio_vendas: ingresso.horaInicio,
							data_termino_vendas: ingresso.dataFim,
							hora_termino_vendas: ingresso.horaFim,
							quantidade_minima_por_compra: ingresso.minima,
							quantidade_maxima_por_compra: ingresso.maxima,
							meia_entrada: ingresso.meiaEntrada || false,
							quantidade_meia_entrada: ingresso.quantidadeMeiaEntrada || 0,
						}],
					};

					const ingressoDataEdit = {
						evento_id: this.evento_id,
						titulo: ingresso.titulo,
						quantidade_total: ingresso.quantidade,
						valor: ingresso.valor,
						periodo_vendas_tipo: "Por Data",
						data_inicio_vendas: ingresso.dataInicio,
						hora_inicio_vendas: ingresso.horaInicio,
						data_termino_vendas: ingresso.dataFim,
						hora_termino_vendas: ingresso.horaFim,
						quantidade_minima_por_compra: ingresso.minima,
						quantidade_maxima_por_compra: ingresso.maxima,
						meia_entrada: ingresso.meiaEntrada || false,
						quantidade_meia_entrada: ingresso.quantidadeMeiaEntrada || 0,
					};

					if(ingresso.ingresso_id){
						// Se ingresso_id existe, adiciona ao array de edição
						ingressoDataEdit.ingresso_id = ingresso.ingresso_id;
						ingressosEdicao.push(ingressoDataEdit);
					}
					else{
						// Caso contrário, adiciona ao array de criação
						ingressosCriacao.push(ingressoDataRegister);
					}
				});

				// Verificando os arrays de criação e edição
				console.log("Ingressos para criação:", ingressosCriacao);
				console.log("Ingressos para edição:", ingressosEdicao);

				// Enviar ingressos para criação
				if(ingressosCriacao.length > 0){
					Promise.all(ingressosCriacao.map((ingresso) => cadastroIngrsso(ingresso)))
						.then((res) => {
							exibirMensagemSucesso("Evento e ingressos cadastrados com sucesso!", res);
						})
						.catch((error) => {
							const msg =	error?.response?.data?.msg;
							exibirMensagemErro(msg);
						});
				}

				// Enviar ingressos para edição
				if(ingressosEdicao.length > 0){
					Promise.all(ingressosEdicao.map((ingresso) => editarIngresso(ingresso)))
						.then((res) => {
							exibirMensagemSucesso("Evento e ingressos atualizados com sucesso!", res);
						})
						.catch((error) => {
							const msg =	error?.response?.data?.msg;
							exibirMensagemErro(msg);
						});
				}

				// Finaliza o carregamento depois de todos os processos
				this.$finalizarCarregando();
			},
		},
	};
</script>

<style scoped>
	div::v-deep.wrapper{
		background:#FFEEFC;
		overflow-x:hidden;
	}

	.navbar::v-deep .v-tabs{
		flex:  unset!important;
		width: unset!important;
		margin-right: 60px!important;
	}

	.navbar::v-deep .v-tabs .v-tab{
    padding: 0 25px;
		color:var(--azul)!important;
	}

	.logo::v-deep{
		margin-left:95px;
	}

.banner::v-deep {
		position: relative;
		width: 100%;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		padding-top: 50px;
		padding-left: 5px;
		padding-right: 5px;
		padding-bottom: 48px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center; /* Centraliza horizontalmente */
		justify-content: center; /* Centraliza verticalmente */
		text-align: center; /* Centraliza os textos */
		min-height: 55vh; /* Ajuste conforme necessário */
	}

	.banner::v-deep .fundo-roxo{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:#592E51;
		opacity:36%;
	}

	.banner::v-deep .container{
		position:relative!important;
	}

	.banner::v-deep .banner-content{
		margin-top:144px;
		margin-left:120px;
		display: flex;
		flex-flow: column;
		width: fit-content;
	}

	.banner::v-deep .banner-texto-grande {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: clamp(24px, 5vw, 49px); /* Responsivo: mínimo 24px, máximo 49px */
    line-height: clamp(30px, 6vw, 55px); /* Responsivo para altura da linha */
    margin-bottom: 0;
    text-align: center; /* Centraliza o texto */
    color: white;

    /* Se precisar alinhar dentro de um flex container */
    display: flex;
    flex-direction: column;
    align-items: center; /* Alinha horizontalmente */
    justify-content: center; /* Alinha verticalmente */
}

.banner::v-deep .banner-texto-medio {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: clamp(18px, 4vw, 39px); /* Responsivo: mínimo 18px, máximo 39px */
    line-height: clamp(24px, 5vw, 34px); /* Responsivo para altura da linha */
    margin-top: 24px;
    margin-bottom: 0;
    text-align: center; /* Centraliza o texto */
    color: var(--cor-branca);
	}

	.banner-botao {
		display: block; /* Permite usar margin auto */
		margin: 74px auto 0 auto; /* Centraliza horizontalmente */
		padding: 8px 20px;
		background: #ea0763;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 28px;
		color: white;
		text-decoration: none;
		text-align: center;
	}

	#secao-baloes-depoimentos::before{
		content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	}

	.titulo-secao{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		margin-top:24px;
		margin-bottom:24px;
		color: "#592E51";
		text-transform: uppercase !important;
	}

	.titulo-secao-aprovados {
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400; /* Mantive o peso de 400 para igualar ao título original */
			font-size: clamp(24px, 5vw, 49px); /* Responsivo: mínimo 24px, máximo 49px */
			line-height: clamp(30px, 6vw, 55px); /* Ajuste para altura da linha */
			margin-top: 24px;
			margin-bottom: 24px;
			text-align: center; /* Centraliza o texto */
			color: #3b1d82; /* Aplicação da nova cor */
			display: flex;
			flex-direction: column;
			align-items: center; /* Alinha horizontalmente */
			justify-content: center; /* Alinha verticalmente */
			text-transform: uppercase !important;
	}

	#titulo-branco-grande{
		color: #FFF;
		text-align: center;
		font-family: Roboto;
		font-size: 32px;
		font-style: normal;
		font-weight: 600;
		line-height: 35px; /* 75% */
		z-index: 0;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
