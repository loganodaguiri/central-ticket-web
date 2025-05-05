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

		<div class="ingressos-container">
			<v-row>
				<v-col
					v-for="ingresso in ingressos"
					:key="ingresso.compra_id"
					cols="12"
					sm="6"
					md="4"
					>
					<v-card class="pa-4" elevation="2">
						<div class="d-flex justify-space-between">
							<!-- Verificando a foto antes de exibir -->
							<v-chip
								:color="ingresso.status === 'Aprovada' ? 'green' : 'grey'"
								text-color="white"
								small
								class="ml-auto"
								>
								{{ ingresso.status }}
							</v-chip>
						</div>

						<div class="mt-4">
							<h3 class="text-h6 font-weight-bold">{{ ingresso.titulo }}</h3>
							<div class="text-subtitle-2 mb-2">{{ ingresso.subtitulo }}</div>

							<v-chip
								v-if="ingresso.tipo"
								class="mb-2"
								small
								color="indigo lighten-4"
								text-color="indigo"
								>
								{{ ingresso.tipo }}
							</v-chip>

							<div><strong>Data:</strong> {{ ingresso.data }}</div>
							<div><strong>Horário:</strong> {{ ingresso.horario }}</div>
							<div><strong>Local:</strong> {{ ingresso.local }}</div>
							<div><strong>Ingresso:</strong> #{{ ingresso.codigo }}</div>
						</div>

						<v-divider class="my-3" />

						<div class="d-flex justify-space-between">
							<v-btn icon small>
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
							<v-btn icon small>
								<v-icon>mdi-map-marker</v-icon>
							</v-btn>
							<v-btn icon small>
								<v-icon>mdi-qrcode</v-icon>
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</div>

		<!-- Rodapé -->
		<div style="margin-top: 2%;">
			<Rodape />
		</div>
	</div>
</template>

<script>
	import AppBar from "@/components/AppBar.vue";
	import Rodape from "@/components/Rodape.vue";
	import { buscarIngressosByUser } from "@/services/ComprarService.js";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";

	export default {
		name: "MeusIngressos",

		components: {
			AppBar,
			Rodape,
		},

		data(){
			return {
				ingressos: [],
			};
		},

		created(){
			this.bucaIngressos();
		},

		methods: {
			async bucaIngressos(){
				this.$carregando();
				buscarIngressosByUser(localStorage.getItem("authuserId"))
					.then((res) => {
						this.ingressos = res.data;
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao buscar ingressos.");
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

	.ingressos-container {
		padding: 24px;
	}
</style>
