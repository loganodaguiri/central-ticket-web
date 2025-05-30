<template>
	<div class="wrapper">
		<div>
			<AppBar/>
		</div>
		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" v-bind:class="{'mx-auto':$vuetify.breakpoint.mdAndDown}">
				<p class="banner-texto-grande" style="align-items: center;">
					<b>Contato</b>
				</p>
			</div>
		</div>
		<div id="secao-baloes-depoimentos" style="background-color: white;">
			<div id="secao-formulario-contato" style="background-color: #f9f9f9; padding: 40px 0;">
				<v-container>
					<v-row justify="center">
						<v-col cols="12" md="8" lg="6">
							<v-card class="pa-6" elevation="5" rounded="xl">
								<p class="text-h5 font-weight-bold text-center mb-6">Deixe sua mensagem aqui</p>
								<v-form ref="form" v-model="valid" @submit.prevent="enviarEmail">
									<v-row>
										<v-col cols="12" md="6">
											<v-text-field
												v-model="nome"
												label="Nome"
												:rules="[v => !!v || 'Nome é obrigatório']"
												required
												/>
										</v-col>

										<v-col cols="12" md="6">
											<v-text-field
												v-model="email"
												label="E-mail"
												:rules="[
													v => !!v || 'E-mail é obrigatório',
													v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
												]"
												required
												/>
										</v-col>

										<v-col cols="12">
											<v-textarea
												v-model="mensagem"
												label="Mensagem"
												:rules="[v => !!v || 'Mensagem é obrigatória']"
												auto-grow
												required
												/>
										</v-col>

										<v-col cols="12" class="text-center">
											<v-btn color="primary" :disabled="!valid" type="submit" @click="enviarEmail()">
												Enviar
											</v-btn>
										</v-col>
									</v-row>
								</v-form>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</div>
			<div>
				<Rodape/>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import LogoHorizontal from "@/assets/logo-horizontal.png";
	import { exibirMensagemErro, exibirMensagemSucesso } from "@/util/MessageUtils.js";
	import { enviarEmail } from "@/services/ContatoService.js";
	import Rodape from "@/components/Rodape.vue";
	import AppBar from "@/components/AppBar.vue";

	export default {
		name: "Contato",

		components: {
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
			};
		},

		methods: {
			enviarEmail(){
				this.$carregando();

				const dadosFormulario = {
					nome: this.nome,
					email: this.email,
					mensagem: this.mensagem,
				};

				enviarEmail(dadosFormulario)
					.then(() => {
						exibirMensagemSucesso("Mensagem enviada com sucesso!");
						this.nome = "";
						this.email = "";
						this.mensagem = "";
					})
					.catch((error) => {
						console.error(error);
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
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
