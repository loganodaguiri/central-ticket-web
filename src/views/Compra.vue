<template>
	<div class="wrapper">
		<div>
			<AppBar/>
		</div>

		<!-- Event Banner -->
		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" v-bind:class="{'mx-auto':$vuetify.breakpoint.mdAndDown}">
				<p class="banner-texto-grande" style="align-items: center;">
					Compra
				</p>
			</div>
		</div>

		<div style="margin-top: 40px;">
			<span style="font-size: 20px; font-family: 'POPPINS'; margin-left: 15px; color: #0a4941; font-weight: bold;">Forma de pagamento</span>
		</div>

		<v-row class="px-4" :style="formaPagamento == 'CARTAO_CREDITO' ? 'margin-bottom: 20px;' : 'margin-bottom: 60px;'">
			<v-col cols="12">
				<v-radio-group v-model="formaPagamento" row mandatory hide-details="auto">
					<v-radio
						label="Cartão de Crédito"
						value="CARTAO_CREDITO"
						style="font-family: 'Poppins'; font-weight: bolder; color: #0a4941;"
						/>
				</v-radio-group>
			</v-col>
		</v-row>

		<!-- Cartão -->
		<div style="margin: 20px !important;">
			<v-row>
				<v-col cols="12" style="margin-bottom: -15px;">
					<span style="font-size: 20px; font-family: 'POPPINS'; color: #0a4941; font-weight: bold;">
						Insira abaixo os dados do cartão de crédito
					</span>
				</v-col>
				<v-col
					cols="12"
					sm="6"
					md="6"
					lg="12"
					xl="8"
					rounded-lg>
					<p style="color: #0a4941; font-weight: 600;margin-bottom: 5px;">Nome (Igual impresso no cartão)</p>
					<v-text-field class="custom-file-input" v-model="dadosCartao.nome"/>
				</v-col>
				<v-col cols="12" sm="6" md="6" lg="12" xl="4">
					<p style="color: #0a4941; font-weight: 600;margin-bottom: 5px;">CPF do titular</p>
					<v-text-field class="custom-file-input" v-model="dadosCartao.cpf"/>
				</v-col>
				<v-col cols="12" sm="6" md="6" lg="8">
					<p style="color: #0a4941; font-weight: 600;margin-bottom: 5px;">Número</p>
					<v-text-field
						class="custom-file-input"
						v-model="numeroCartao"
						@input="buscarBandeira(numeroCartao)"/>
				</v-col>
				<v-col cols="12" sm="6" md="6" lg="4">
					<p style="color: #0a4941; font-weight: 600;margin-bottom: 5px;">CVV</p>
					<v-text-field class="custom-file-input" v-model="dadosCartao.cvv"/>
				</v-col>

				<!-- Exibir a bandeira -->
				<v-col cols="12" sm="6" md="6" lg="12" xl="4">
					<p style="color: #0a4941; font-weight: 600;margin-bottom: 5px;">Bandeira</p>
					<v-select
						v-model="dadosCartao.bandeira"
						:items="['Visa', 'MasterCard', 'American Express', 'Elo', 'Hipercard']"
						label="Selecione a bandeira do cartão"
						dense
						class="custom-file-input"
						item-value="value"
						item-text="text"
						/>
				</v-col>

				<!-- Campo de validade -->
				<v-col cols="12" sm="6" md="6" lg="12" xl="4">
					<p style="color: #0a4941; font-weight: 600;margin-bottom: 5px;">Validade</p>
					<v-text-field
						v-model="dadosCartao.validade"
						class="custom-file-input"
						placeholder="MM/AA"
						mask="##/####"
						maxlength="7"
						type="text"
						hint="Formato: MM/AAAA"
						persistent-hint
						/>
				</v-col>

				<!-- Campo de parcelamento -->
				<v-col cols="12" sm="6" md="6" lg="12" xl="4">
					<p style="color: #0a4941; font-weight: 600;margin-bottom: 5px;">Parcelar em até</p>
					<v-select
						v-model="numeroParcelas"
						:items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
						label="Selecione o número de parcelas"
						dense
						class="custom-file-input"
						item-value="value"
						item-text="text"
						/>
				</v-col>
			</v-row>
		</div>

		<!-- Enderço cobrança -->
		<div style="margin: 20px !important;">
			<span style="font-size: 20px; font-family: 'POPPINS'; color: #0a4941; font-weight: bold;">
				Endereço de cobrança:
			</span>
			<v-row>
				<!-- CEP -->
				<v-col cols="12" md="4">
					<v-text-field
						v-model="dadosCartao.endereco.cep"
						label="CEP"
						:rules="[v => !!v || 'Campo obrigatório']"
						required
						/>
				</v-col>

				<!-- Rua -->
				<v-col cols="12" md="8">
					<v-text-field
						v-model="dadosCartao.endereco.logradouro"
						label="Av./Rua"
						:rules="[v => !!v || 'Campo obrigatório']"
						required
						disabled
						/>
				</v-col>

				<!-- Número -->
				<v-col cols="12" md="4">
					<v-text-field
						v-model="dadosCartao.endereco.numeroLogradouro"
						label="Número"
						/>
				</v-col>

				<!-- Bairro -->
				<v-col cols="12" md="6">
					<v-text-field
						v-model="dadosCartao.endereco.bairro"
						label="Bairro"
						disabled
						/>
				</v-col>

				<!-- Cidade -->
				<v-col cols="12" md="4">
					<v-text-field
						v-model="dadosCartao.endereco.municipio"
						label="Cidade"
						disabled
						/>
				</v-col>

				<!-- Estado -->
				<v-col cols="12" md="2">
					<v-text-field
						v-model="dadosCartao.endereco.uf"
						label="UF"
						maxlength="2"
						disabled
						/>
				</v-col>
			</v-row>
		</div>

		<!-- Botão salvar -->
		<div style="margin: 20px !important;">
			<v-btn color="primary" @click="criarCompra">
				Finalizar Compra
			</v-btn>
		</div>

		<!-- rodape -->
		<div
			fluid
			id="rodape">
			<v-container>
				<v-img
					class="logo-rodape"
					responsive
					contain
					height="100%"
					max-width="185"
					:src="LogoHorizontal" />
				<div class="socials">
					<v-icon @click="abrirLink('https://www.instagram.com/aprovei.bucomaxilo/?next=%2F')">mdi-instagram</v-icon>
					<v-icon @click="abrirLink('https://www.facebook.com/profile.php?id=100077018277396')">mdi-facebook</v-icon>
					<v-icon @click="abrirLink('https://wa.me/5511976684596')">mdi-whatsapp</v-icon>
				</div>
				<span>
					Desenvolvido por Logan e Rafael
				</span>
			</v-container>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import LogoHorizontal from "@/assets/logo-horizontal.png";
	import AppBar from "@/components/AppBar.vue";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";
	import { buscaCep } from "@/services/ViaCepService.js";
	import { criarCompra, finalizarCompra } from "@/services/ComprarService.js";
	import { bucaUser } from "@/services/User.js";

	export default {
		name: "Compra",

		components: {
			AppBar,
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
					itens: [
						{
							ingresso_id: 22,
							quantidade: 1,
							valor: 100,
						},
					],
				};

				criarCompra(compraFormulario)
					.then((res) => {
						this.idCompra = res.data.compra.compra_id;
						this.finalizarCompra();
					}).catch((error) => {
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
    color: var(--cor-branca);

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

	#rodape::v-deep{
		display:flex;
		align-items:center;
		background-color: #111429;
		height:110px;
		margin-top: 20px;
	}

	#rodape::v-deep .container{
		display:flex;
		justify-content:space-between;
		align-items:center;
	}

	#rodape::v-deep .v-icon{
		color:var(--cor-branca);
		margin:0 10px;
		font-size:33px;
	}

	#rodape::v-deep span{
		color:var(--cor-branca);
		font-family: Open Sans;
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		letter-spacing: 0em;
		text-align: left;
	}

</style>
