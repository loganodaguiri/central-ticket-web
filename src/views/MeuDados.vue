<template>
	<div class="wrapper">
		<div>
			<AppBar />
		</div>

		<!-- Banner -->
		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" v-bind:class="{ 'mx-auto': $vuetify.breakpoint.mdAndDown }">
				<p class="banner-texto-grande" style="align-items: center;">
					Meus Dados
				</p>
			</div>
		</div>

		<!-- Card de Perfil -->
		<v-container>
			<v-row justify="center" style="margin-top: 2%;">
				<v-col cols="12" md="10">
					<v-card class="pa-4" elevation="2">
						<v-row>
							<!-- Coluna Avatar -->
							<v-col cols="12" md="4" class="text-center">
								<v-avatar
									size="120"
									class="mx-auto d-flex align-center justify-center"
									:color="fotoPerfil ? '' : '#3016C2'"
									style="margin-top: 30%;"
									>
									<span class="text-white" style="font-size: 32px; font-weight: bold; color: white;">
										{{ iniciais }}
									</span>
								</v-avatar>

								<h3 class="mt-2 mb-0" style="font-size: 24px;">{{ nome }}</h3>
								<p style="font-size: 18px;">{{ email }}</p>
							</v-col>

							<!-- Coluna Dados -->
							<v-col cols="12" md="8">
								<h3 class="mb-4 font-weight-bold">Informações Pessoais</h3>

								<v-text-field
									v-model="nome"
									label="Nome Completo"
									append-icon="mdi-pencil"
									outlined
									/>

								<v-text-field
									v-model="email"
									label="E-mail"
									append-icon="mdi-pencil"
									outlined
									/>

								<v-text-field
									v-model="senha"
									:type="mostrarSenha ? 'text' : 'password'"
									label="Senha"
									:append-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'"
									@click:append="mostrarSenha = !mostrarSenha"
									outlined
									/>

								<v-text-field
									v-model="dataNascimento"
									label="Data de Nascimento"
									append-icon="mdi-pencil"
									outlined
									type="date"
									/>

								<v-text-field
									v-model="telefone"
									label="Telefone"
									append-icon="mdi-pencil"
									outlined
									v-mask="'(##) #####-####'"
									/>
							</v-col>
						</v-row>

						<!-- Alinhar o botão à direita -->
						<v-row justify="end">
							<v-btn color="primary" @click="editUser()">
								Salvar
							</v-btn>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<!-- Rodapé -->
		<div style="margin-top: 2%;">
			<Rodape />
		</div>
	</div>
</template>

<script>
	import AppBar from "@/components/AppBar.vue";
	import Rodape from "@/components/Rodape.vue";
	import { bucaUser, editUser } from "@/services/User.js";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";

	export default {
		name: "MeusDados",

		components: {
			AppBar,
			Rodape,
		},

		data(){
			return {
				nome: "",
				email: "",
				senha: "",
				dataNascimento: null,
				telefone: "",
				fotoPerfil: "",
				iniciais: "",
				mostrarSenha: false,
			};
		},

		created(){
			this.bucaUser();
		},

		methods: {
			async bucaUser(){
				this.$carregando();
				bucaUser(localStorage.getItem("authuserId"))
					.then((res) => {
						this.nome = res.data.name;
						this.email = res.data.email;
						this.telefone = this.formatarTelefone(res.data.phone);
						console.log(this.dataNascimento);
						this.iniciais = this.nome ? this.nome.substring(0, 2).toUpperCase() : "";
						this.dataNascimento = this.formatarDataParaInputDate(res.data.birth);
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao buscar usuario.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			formatarTelefone(telefone){
				if(!telefone) return "";
				// Remove qualquer caractere não numérico
				const numeroLimpo = telefone.replace(/\D/g, "");
				// Aplica a formatação
				return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
			},

			formatarDataParaInputDate(data){
				const dataObj = new Date(data); // Cria um objeto Date
				const ano = dataObj.getFullYear();
				const mes = String(dataObj.getMonth() + 1).padStart(2, "0"); // Adiciona o zero à esquerda, se necessário
				const dia = String(dataObj.getDate()).padStart(2, "0"); // Adiciona o zero à esquerda, se necessário
				return `${ano}-${mes}-${dia}`; // Retorna no formato YYYY-MM-DD
			},

			async editUser(){
				this.$carregando();

				if(!this.validarCampos()){
					this.$finalizarCarregando();
					return;
				}

				const userForm = {
					usuario_id: localStorage.getItem("authuserId"),
					name: this.nome,
					email: this.email,
					password: this.senha,
					phone: this.telefone,
					birth: this.dataNascimento,
				};

				editUser(userForm)
					.then((res) => {
						exibirMensagemSucesso("Usuario salvo com sucesso!!!");
						this.bucaUser();
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao editar usuario.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			validarCampos(){
				if(!this.nome){
					exibirMensagemAtencao("Nome não pode estar vazio!");
					return false;
				}

				if(!this.email){
					exibirMensagemAtencao("E-mail não pode estar vazio!");
					return false;
				}

				if(!this.telefone){
					exibirMensagemAtencao("Telefone não pode estar vazio!");
					return false;
				}

				if(!this.dataNascimento){
					exibirMensagemAtencao("Data de nascimento não pode estar vazia!");
					return false;
				}

				// Validação do formato de e-mail
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if(!emailPattern.test(this.email)){
					exibirMensagemAtencao("E-mail inválido!");
					return false;
				}

				// Validação do formato de telefone (exemplo para telefone com 11 dígitos)
				const telefoneLimpo = this.telefone.replace(/\D/g, ""); // Remove máscara
				const phonePattern = /^\d{11}$/;
				if(!phonePattern.test(telefoneLimpo)){
					exibirMensagemAtencao("Telefone inválido! Deve conter exatamente 11 dígitos.");
					return false;
				}

				// Validação da data de nascimento (verifica se é uma data válida)
				const dataNascimento = new Date(this.dataNascimento);
				if(Number.isNaN(dataNascimento.getTime())){ // Usando Number.isNaN ao invés de isNaN
					exibirMensagemAtencao("Data de nascimento inválida!");
					return false;
				}

				return true;
			},
		},
	};
</script>

<style scoped>

	div::v-deep.wrapper{
		background:#f9f9f9;
		overflow-x:hidden;
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
		background:white;
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

	.banner::v-deep .banner-texto-pequeno {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: clamp(10px, 4vw, 18px);
    line-height: clamp(24px, 5vw, 34px);
    margin-top: 24px;
    margin-bottom: 0;
    text-align: center;
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

	.v-card {
		border-radius: 12px;
	}
</style>
