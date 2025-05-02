<template>
	<div class="wrapper">

		<div>
			<AppBar/>
		</div>

		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" v-bind:class="{'mx-auto':$vuetify.breakpoint.mdAndDown}">
				<v-icon color="white" class="mb-2" size="36">mdi mdi-microphone-variant</v-icon>
				<p class="banner-texto-grande" style="align-items: center;">
					<b>CENTRAL TICKET</b>
				</p>
				<p class="banner-texto-medio">
					Adequando soluções ao evento que você precisa
				</p>
				<a class="banner-botao primeiro-botao">
					<button @click="cadastroEvento">CADSTRE SEU EVENTO</button>
				</a>
			</div>
		</div>

		<div style="padding-top: 60px;">
			<p class="titulo-secao-aprovados">DESTAQUES</p>
			<DepoimentosNovosCarrossel/>
		</div>

		<div id="secao-baloes-depoimentos">
			<p id="titulo-branco-grande" class="d-flex justify-content-center text-center">INGRESSOS DISPONÍVEIS</p>
			<v-container>
				<v-row justify="center" align="stretch" dense>
					<v-col
						v-for="(ingresso, index) in ingressos"
						:key="index"
						cols="12"
						sm="6"
						md="4"
						class="d-flex justify-center"
						>
						<v-card
							class="ma-4"
							max-width="400"
							style="border: 5px solid white; color: white; height: 330px;"
							>
							<v-img
								:src="ingresso.photos"
								height="320"
								class="white--text d-flex align-end"
								gradient="to top, rgba(42,0,84,0.85), rgba(0,0,0,0)"
								@click="goToEvento(ingresso.evento_id)"
								style="cursor: pointer;"
								>
								<div class="pa-0" style="width: 100%;">
									<div style="background-color: rgba(0, 0, 0, 0.6); padding: 8px; width: 100%;">
										<div class="font-weight-bold text-center" style="font-size: 18px;">
											{{ ingresso.name }}
										</div>
									</div>
								</div>
							</v-img>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</div>

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
	import DepoimentosNovosCarrossel from "@/components/landing/LandingPageFev2024/DepoimentosNovosCarrossel.vue";
	import AppBar from "@/components/AppBar.vue";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";
	import { buscarEventos } from "@/services/EventoService.js";

	export default {
		name: "LandingPage",
		components: {
			DepoimentosNovosCarrossel,
			AppBar,
		},
		created(){
			this.tokenLogando = localStorage.getItem("authToken");
			this.buscarEventos();
		},
		data(){
			return {
				LogoHorizontal,
				ingressos: [],
				tokenLogando: null,
			};
		},
		methods: {

			cadastroEvento(){
				if(this.tokenLogando == null){
					exibirMensagemAtencao("Favor fazer login antes de cadastrar um evento");
				}
				else{
					this.$router.push("/cadastro-evento");
				}
			},

			buscarEventos(){
				this.$carregando();
				buscarEventos()
					.then((res) => {
						this.ingressos = res.data;
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao buscar eventos.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			goToEvento(id){
				this.$router.push(`/evento/${id}`);
			},
		},
	};

</script>

<style scoped>
	.imagem-container {
		width: 100%;
		height: 400px;
		overflow: hidden;
		position: relative;
	}

	.imagem-plano-gratis {
		width: 100%;
		height: 400px;
		object-fit: cover;
		object-position: top;
		cursor: pointer;
	}

	.titulo-tela-pequena{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		text-align: start;
		font-size: 36px;
		margin-top: 95px;
		margin-bottom: 20px;
		max-width:700px;
		line-height: 32px;
		text-transform:uppercase;
		color: #FFF;
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

	.speech-bubble {
		position: relative;
		padding: 20px 30px;
		height: 250px;
		width: 400px;
		background: white;
		border-radius: 20px;
	}

	.speech-bubble:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 0;
		border: 37px solid transparent;
		border-top-color: white;
		border-bottom: 0;
		border-left: 0;
		margin-left: -18.5px;
		margin-bottom: -37px;
		z-index: 2;
	}

	.checked {
		width: auto;
		color: orange;
	}

	.titulo-baloes-depoimentos{
		color: #592E51;
		text-align: center;
		font-family: Roboto;
		font-size: 25px;
		font-style: normal;
		font-weight: 600;
		line-height: 24px; /* 133.333% */
		margin-bottom: 10px;
	}

	.texto-baloes-depoimentos{
		color: #000;
		font-family: Roboto;
		font-size: 20px;
		font-style: italic;
		font-weight: 400;
		line-height: 30px; /* 138.889% */
	}

	.texto-baloes-depoimentos2{
		color: #000;
		font-family: Roboto;
		font-size: 12px;
		font-style: italic;
		font-weight: 400;
		line-height: 20px; /* 138.889% */
	}

	.texto-maior-baloes-depoimentos{
		color: #000;
    font-family: Roboto;
    font-size: 15px;
    font-style: italic;
    font-weight: 400;
    line-height: 25px;
	}

	div::v-deep.wrapper{
		background:#FFEEFC;
		overflow-x:hidden;
	}

	* >>> .mobile-nav .v-list-item{
		color:#231125;
	}

	* >>> .bg-video{
		position:absolute;
		left:0;
		top:0;
		height: 100%;
		width: 100%;
		min-width: 100%;
		min-height: 100%; /* 100 * 9 / 16 */
		left: 50%; /* % of surrounding element */
		top: 50%;
		transform: translate(-50%, -50%); /* % of current element */
		object-fit: cover;
	}

	.col-botao-plano-estagiario{
		display: flex;
		align-items: center;
	}

	.container-estatisticas{
		position: relative;
		z-index: 0;
		min-height: 653px;
		flex-shrink: 0;
		background-size: cover;
		background-position: center;
	}

	.container-estatisticas::v-deep::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(40, 19, 43, 0.85);
	}

	.container-dados-estatisticas{
		z-index: 1;
	}

	.estatistica{
		color: #FFF;
		text-align: center;
		font-family: Roboto;
		font-size: 80px;
		font-style: normal;
		font-weight: 900;
		line-height: 49px;
		margin-bottom:0;
	}

	.texto-estatistica{
		color: #FFF;
		text-align: center;
		font-family: Roboto;
		font-size: 35px;
		font-style: normal;
		font-weight: 500;
		line-height: 49px; /* 140% */
		font-variant: all-small-caps;
	}

	.texto-fino-estatistica{
		color: #FFF;
		text-align: center;
		font-family: Roboto;
		font-size: 32px;
		font-style: normal;
		font-weight: 300;
		line-height: 34px; /* 106.25% */
		letter-spacing: -0.64px;
	}

	#container-funcionalidades{
		position: relative;
		width: 100%;
		height:100%;
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: 125% 25%;
	}

	#container-sobre{
		position: relative;
		width: 100%;
		height:100%;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: 125% 25%;
	}

	#container-materias{
		position: relative;
		width: 100%;
		height:100%;
		background-color: #37133B;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: 100% 25%;
	}

	#container-funcionalidades::before{
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 238, 252, 0.75);
	}

	#container-funcionalidade::before {
		/*
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 238, 252, 0.75);
		*/
	}

	#secao-baloes-depoimentos{
		position: relative;
    padding-top: 40px;
    height: -moz-fit-content;
    height: fit-content;
    background-image: url("@/assets/speaker-bg.png");
    margin-top: auto;
    margin-bottom: auto;
    padding-bottom: 80px;
    background-size: cover;
		background-position: 60% 75%;
		height: 100%;
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

	.primeiro-botao {
		display: block; /* Permite usar margin auto */
		margin: 36px auto 0 auto !important; /* Centraliza horizontalmente */
		padding: 8px !important;
		width: max-content !important; /* Faz com que o botão tenha apenas o tamanho necessário */
		text-transform: uppercase !important;
		text-align: center;
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
		min-height: 80vh; /* Ajuste conforme necessário */
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

	#plano-gratis{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		background-color: #37133B;
		background-size: cover;
		background-position: center;
		min-height: 400px;
	}

	#plano-gratis p.titulo{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		text-align: start;
		font-size: 46px;
		margin-top: 95px;
		margin-bottom: 24px;
		max-width:700px;
		line-height: 42px;
		text-transform:uppercase;
		color: var(--cor-branca);
	}

	#plano-gratis p.subtitulo {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    text-align: start;
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
    max-width: 700px;
    line-height: 28px;
    text-transform: none;
    color: var(--cor-branca);
	}

	#plano-gratis p.botao-acesso-plano-estagiario{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		text-align: start;
		font-size: 36px;
		margin-top: 40px;
		margin-bottom: auto;
		max-width:700px;
		line-height: 32px;
		text-transform:uppercase;
		color: var(--cor-branca);
	}

	#plano-gratis p.descricao{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		text-align: center;
		font-size: 22px;
		margin-bottom: 61px;
		margin-left: auto;
		margin-right: auto;
		line-height: 87.69%;
		color:#592E51;
	}

	#sobre::v-deep {
		margin-bottom:110px;
	}

	#sobre::v-deep .titulo-secao{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		margin-top:74px;
		margin-bottom:62px;
		color: #7C5980;
	}

	#sobre::v-deep .titulo{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		text-align:center;
		font-size: 60px;
		margin-bottom:68px;
		margin-left:auto;
		margin-right:auto;
		max-width:500px;
		line-height: 87.69%;
		color: #592E51;
	}

	#sobre::v-deep .subtitulo{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 28px;
		line-height: 116.19%;
		text-align:center;
		text-transform:uppercase;
		margin-bottom:50px;
	}

	#sobre::v-deep .texto{
		font-family: Roboto;
		font-size: 28px;
		font-weight: 400;
		line-height: 33px;
		letter-spacing: -0.02em;
		text-align: justify;
	}

	>>>  .uppercase{
		text-transform:uppercase;
	}

	#rodape::v-deep{
		display:flex;
		align-items:center;
		background-color: #111429;
		height:110px;
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

	@media (max-width: 1500px){
		#secao-baloes-depoimentos{
			position: relative;
			padding-top: 40px;
			height: fit-content;
			background-image: none;
			margin-top: auto;
			margin-bottom: auto;
			padding-bottom: 80px;
			background-size: cover;
			background-position: 0;
		}
	}

	@media (max-width: 850px){
		#plano-gratis p.botao-acesso-plano-estagiario{
			display: flex;
			align-items: start;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			text-align: start;
			font-size: 36px;
			max-width:700px;
			line-height: 32px;
			text-transform:uppercase;
			color: var(--cor-branca);
			margin-top: 0px;
			padding-right: 22px;
			padding-left: 22px;
		}
		.titulo-tela-pequena{
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			text-align: start;
			font-size: 36px;
			margin-top: 95px;
			margin-bottom: 0px;
			max-width:700px;
			line-height: 32px;
			text-transform:uppercase;
			color: var(--cor-branca);
			padding-right: 26px;
			padding-left: 26px;
		}
		.subtitulo-tela-pequena {
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 300;
			text-align: start;
			font-size: 28px;
			margin-top: 20px;
			margin-bottom: 0px;
			max-width: 700px;
			line-height: 30px;
			color: #FFF;
			text-transform: none;
			padding-right: 26px;
			padding-left: 26px;
		}
	}

	/*@media (max-width: 430px){*/
	@media (max-width: 430px){
		.banner::v-deep .banner-content{
			margin-top:110px;
			margin-left:120px;
			padding: 0 20px;
			display: flex;
			flex-flow: column;
			width: fit-content;
		}

		.banner::v-deep .banner-texto-grande{
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-size: 42px;
			line-height: 55px;
			margin-bottom: 0;
			color: var(--cor-branca);
		}

		.banner::v-deep .banner-texto-medio{
			display: block;
			font-family: 'Roboto';
			font-style: normal;
			text-align: left;
			font-weight: 400;
			font-size: 20px;
			line-height: 34px;
			margin-top: 10px;
			margin-bottom:0;
			color:var(--cor-branca);
		}

		.banner-botao{
			margin:74px auto 0 auto;
			padding:8px 20px;
			background: var(--cor-amarela);
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			border-radius: 10px;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 600;
			font-size: clamp(5px, 4vw, 24px);
			line-height: 28px;
			color: #231125;
			text-decoration:none;
			max-width: 300px;
			text-align: center;
		}

		#plano-gratis p.botao-acesso-plano-estagiario{
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			text-align: start;
			font-size: 36px;
			max-width:700px;
			line-height: 32px;
			text-transform:uppercase;
			color: var(--cor-branca);
		}

		.col-botao-plano-estagiario{
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.container-dados-estatisticas {
			z-index: 1;
			margin-top: 30px;
			margin-bottom: 30px;
		}

		.texto-fino-estatistica{
			color: var(--cor-branca);
			text-align: center;
			font-family: Roboto;
			font-size: 28px;
			font-style: normal;
			font-weight: 300;
			line-height: 34px; /* 106.25% */
			letter-spacing: -0.64px;
		}

		.speech-bubble{
			position: relative;
			padding: 2px 5px;
			height: 206px;
			width: 158px;
			background: var(--cor-branca);
			border-radius: 20px;
	}

		.conteudo-interno-card-funcionalidades {
			display: flex;
			align-items: center;
			padding-top: 0px;
			padding-bottom: 6px;
			margin-top: 30px;
			margin-left: 15px;
			margin-right: 15px;
		}

		.titulo-baloes-depoimentos{
			display: block;
			justify-content: center;
			color: #592E51;
			text-align: center;
			font-family: Roboto;
			font-size: 12px;
			font-style: normal;
			font-weight: 600;
			line-height: 14px; /* 133.333% */
			margin-bottom: 0px;
		}

		.texto-baloes-depoimentos2{
			color: #000;
			font-family: Roboto;
			font-size: 10px;
			font-style: italic;
			font-weight: 400;
			line-height: 10px; /* 138.889% */
		}

		.texto-baloes-depoimentos{
			color: var(--cor-preta);
			font-family: Roboto;
			font-size: 12px;
			font-style: italic;
			font-weight: 500;
			line-height: 16px; /* 138.889% */
		}

		.texto-maior-baloes-depoimentos{
			color: var(--cor-preta);
			font-family: Roboto;
			font-size: 12px;
			font-style: italic;
			font-weight: 500;
			line-height: 13px;
			padding: 0px 5px;
	}

		#container-funcionalidades{
			background: none;
		}

		#container-sobre{
			background: none;
		}

		#container-sobre::before{
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #7C5980;
		}

		#container-funcionalidades::before{
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #FFEEFC;
		}

		.speech-bubble{
			position: relative;
			padding: 2px 5px;
			height: 206px;
			width: 100%;
			background: var(--cor-branca);
			border-radius: 20px;
		}
	}

	@media (min-width: 430px ) and (max-width: 500px){
		.speech-bubble {
			position: relative;
			padding: 2px 1%;
			height: 246px;
			width: 100%;
			background: var(--cor-branca);
			border-radius: 20px;
		}

		.titulo-baloes-depoimentos{
			color: #592E51;
			text-align: center;
			font-family: Roboto;
			font-size: 14px;
			font-style: normal;
			font-weight: 600;
			line-height: 24px;
			margin-bottom: 10px;
		}

		.texto-baloes-depoimentos{
			color: var(--cor-preta);
			font-family: Roboto;
			font-size: 13px;
			font-style: italic;
			font-weight: 400;
			line-height: 24px;
			padding: 0px 10px;
		}

		.texto-maior-baloes-depoimentos{
			color: var(--cor-preta);
			font-family: Roboto;
			font-size: 12px;
			font-style: italic;
			font-weight: 400;
			line-height: 16px;
			padding: 0px 5px;
		}
	}

	@media (min-width: 500px ) and (max-width: 700px){
		.speech-bubble {
			position: relative;
			padding: 20px 30px;
			height: 250px;
			width: 100%;
			background: var(--cor-branca);
			border-radius: 20px;
		}

		.titulo-baloes-depoimentos{
			color: #592E51;
			text-align: center;
			font-family: Roboto;
			font-size: 14px;
			font-style: normal;
			font-weight: 600;
			line-height: 24px;
			margin-bottom: 10px;
		}

		.texto-baloes-depoimentos{
			color: var(--cor-preta);
			font-family: Roboto;
			font-size: 13px;
			font-style: italic;
			font-weight: 400;
			line-height: 24px;
			padding: 0px 10px;
		}

		.texto-maior-baloes-depoimentos{
			color: var(--cor-preta);
			font-family: Roboto;
			font-size: 12px;
			font-style: italic;
			font-weight: 400;
			line-height: 16px;
			padding: 0px 5px;
		}
	}

</style>
