<template>
	<div class="wrapper">
		<AppBar />

		<!-- Banner -->
		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" :class="{ 'mx-auto': $vuetify.breakpoint.mdAndDown }">
				<p class="banner-texto-grande">Compra</p>
			</div>
		</div>

		<!-- Cartão -->
		<v-container class="py-6">
			<v-card elevation="4" class="pa-6 rounded-xl">
				<h2 class="form-section-title mb-6">Insira os dados do cartão de crédito</h2>
				<v-row dense>
					<v-col cols="12" sm="6">
						<v-text-field v-model="dadosCartao.nome" label="Nome no cartão" class="custom-file-input" />
					</v-col>
					<v-col cols="12" sm="6">
						<v-text-field v-model="dadosCartao.cpf" label="CPF do titular" class="custom-file-input" />
					</v-col>
					<v-col cols="12" sm="8">
						<v-text-field v-model="numeroCartao" @input="buscarBandeira(numeroCartao)" label="Número do cartão" class="custom-file-input" />
					</v-col>
					<v-col cols="12" sm="4">
						<v-text-field v-model="dadosCartao.cvv" label="CVV" class="custom-file-input" />
					</v-col>
					<v-col cols="12" sm="4">
						<v-text-field
							v-model="dadosCartao.validade"
							label="Validade (MM/AAAA)"
							class="custom-file-input"
							placeholder="MM/AAAA"
							v-mask="'##/####'"
							maxlength="7"
							persistent-hint
							dense
							/>
					</v-col>
					<v-col cols="12" sm="4">
						<v-select v-model="dadosCartao.bandeira" :items="['Visa', 'MasterCard', 'American Express', 'Elo', 'Hipercard']" label="Bandeira" dense class="custom-file-input" />
					</v-col>
					<v-col cols="12" sm="4">
						<v-select v-model="numeroParcelas" :items="[...Array(12).keys()].map(i => i + 1)" label="Parcelamento" dense class="custom-file-input" />
					</v-col>
				</v-row>
			</v-card>
		</v-container>

		<!-- Endereço de cobrança -->
		<v-container class="py-6">
			<v-card elevation="4" class="pa-6 rounded-xl">
				<h2 class="form-section-title mb-6">Endereço de cobrança</h2>
				<v-row dense>
					<v-col cols="12" md="4">
						<v-text-field v-model="dadosCartao.endereco.cep" label="CEP" :rules="[v => !!v || 'Campo obrigatório']" required class="custom-file-input" />
					</v-col>
					<v-col cols="12" md="8">
						<v-text-field v-model="dadosCartao.endereco.logradouro" label="Av./Rua" disabled class="custom-file-input" />
					</v-col>
					<v-col cols="12" md="4">
						<v-text-field v-model="dadosCartao.endereco.numeroLogradouro" label="Número" class="custom-file-input" />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="dadosCartao.endereco.bairro" label="Bairro" disabled class="custom-file-input" />
					</v-col>
					<v-col cols="12" md="4">
						<v-text-field v-model="dadosCartao.endereco.municipio" label="Cidade" disabled class="custom-file-input" />
					</v-col>
					<v-col cols="12" md="2">
						<v-text-field v-model="dadosCartao.endereco.uf" label="UF" maxlength="2" disabled class="custom-file-input" />
					</v-col>
				</v-row>
			</v-card>
		</v-container>

		<!-- Botão finalizar -->
		<v-container class="pb-10 text-center">
			<v-btn color="#EA0763" large class="px-10 py-4" @click="criarCompra">
				<p style="color: white;">Finalizar Compra</p>
			</v-btn>
		</v-container>

		<Rodape />
	</div>
</template>

<script>
	import Vue from "vue";
	import LogoHorizontal from "@/assets/logo-horizontal.png";
	import AppBar from "@/components/AppBar.vue";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";
	import { buscaCep } from "@/services/ViaCepService.js";
	import { criarCompra, finalizarCompra } from "@/services/ComprarService.js";
	import Rodape from "@/components/Rodape.vue";
	import { bucaUser } from "@/services/User.js";

	export default {
		name: "Compra",

		components: {
			AppBar,
			Rodape,
		},

		data(){
			return {
				LogoHorizontal,
				formaPagamento: "CARTAO_CREDITO",
				numeroCartao: "",
				dadosCartao: {
					apelido: null,
					numero: null,
					nome: null,
					cpf: null,
					endereco: {
						cep: null,
						logradouro: null,
						bairro: null,
						uf: null,
						municipio: null,
						numeroLogradouro: null,
						tipoLogradouro: {
							id: null,
						},
					},
					cvv: null,
					mesValidade: null,
					anoValidade: null,
					bandeira: null,
				},
				idCompra: null,
				nome: null,
				email: null,
				telefone: null,
				aniversario: null,
			};
		},

		watch: {
			"dadosCartao.endereco.cep": function(novoCep){
				const apenasNumeros = novoCep.replace(/\D/g, "");

				if(apenasNumeros.length === 8){
					this.buscarEndereco(apenasNumeros);
				}
			},
		},

		computed: {
		},

		created(){
			const ingressosSalvos = localStorage.getItem("ingressosSelecionados");
			this.itensCarrinho = ingressosSalvos ? JSON.parse(ingressosSalvos) : [];
			this.bucaUser();
		},

		methods: {
			async buscarEndereco(){
				this.$carregando();
				buscaCep(this.dadosCartao.endereco.cep)
					.then((res) => {
						this.dadosCartao.endereco.logradouro = res.data.logradouro;
						this.dadosCartao.endereco.bairro = res.data.bairro;
						this.dadosCartao.endereco.municipio = res.data.localidade;
						this.dadosCartao.endereco.uf = res.data.uf;
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao buscar endereço.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			async bucaUser(){
				bucaUser(localStorage.getItem("authuserId"))
					.then((res) => {
						this.nome = res.data.name;
						this.email = res.data.email;
						this.telefone = res.data.phone;
						this.aniversario = res.data.birth;
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao buscar usuario.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			async criarCompra(){
				this.$carregando();

				const compraFormulario = {
					usuario_id: localStorage.getItem("authuserId"),
					itens: this.itensCarrinho,
				};

				criarCompra(compraFormulario)
					.then((res) => {
						this.idCompra = res.data.compra.compra_id;
						localStorage.removeItem("ingressosSelecionados");
						this.finalizarCompra();
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao criar compra.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			async finalizarCompra(){
				this.$carregando();
				const payload = {
					nameComplete: this.nome,
					email: this.email, // ajuste conforme onde você armazena o e-mail
					phone: this.telefone, // ajuste conforme onde você armazena o telefone
					birth: this.aniversario, // deve estar no formato YYYY-MM-DD
					cpf: this.dadosCartao.cpf,
					method: this.formaPagamento === "CARTAO_CREDITO" ? "credit_card" : "pix",
					card_number: this.numeroCartao,
					card_cvv: this.dadosCartao.cvv,
					card_expiration_date: this.dadosCartao.validade,
					card_holder_name: this.dadosCartao.nome,
					country: "BR",
					brand: this.dadosCartao.bandeira,
					state: this.dadosCartao.endereco.uf,
					city: this.dadosCartao.endereco.municipio,
					neighborhood: this.dadosCartao.endereco.bairro,
					street: `${this.dadosCartao.endereco.logradouro}`.trim(),
					street_number: this.dadosCartao.endereco.numeroLogradouro,
					zipcode: this.dadosCartao.endereco.cep,
				};
				finalizarCompra(payload, this.idCompra)
					.then((res) => {
						exibirMensagemSucesso("Compra realizada com sucesso");
						this.$router.push("/meus-ingressos");
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao finalizar compra.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},
		},
	};
</script>

<style scoped>

	.form-section-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
	}

	.custom-file-input input {
		background-color: #f9f9f9;
	}

	.banner {
		background-size: cover;
		background-position: center;
		padding: 60px 20px;
		color: white;
		text-align: center;
	}

	.banner-texto-grande {
		font-size: 2.5rem;
		font-weight: bold;
	}

	.wrapper {
		background-color: #f5f5f5;
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

	.form-container {
		max-width: 1000px;
		margin: auto;
		padding: 20px;
		border-radius: 10px;
		background-color: #fff;
	}

	.custom-file-input input,
	.custom-file-input label,
	.custom-file-input .v-input__control,
	.v-label,
	.v-input__control {
		color: black !important;
	}

	.form-section-title {
		font-size: 20px;
		font-family: 'Poppins';
		color: black;
		font-weight: bold;
		margin-left: 15px;
		margin-bottom: 10px;
		display: block;
		text-align: center;
	}

	.form-label {
		color: black;
		font-weight: 600;
		margin-bottom: 5px;
	}
	.radio-label {
		color: black !important;
		font-family: 'Poppins';
		font-weight: bold;
	}
</style>
