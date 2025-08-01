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
					sm="4"
					md="4"
					lg="4"
					>
					<!-- Adicionando uma classe condicional para bloquear o card -->
					<v-card
						class="pa-4"
						elevation="2"
						:style="ingresso.status !== 'Aprovada' ? { opacity: 0.5, pointerEvents: 'none' } : {}"
						style="max-width: 400px; margin: 0 auto;">

						<v-img
							:src="ingresso.photos"
							height="200px"
							class="mb-4"
							:alt="ingresso.titulo"
							/>

						<div class="d-flex justify-space-between">
							<v-chip
								:color="ingresso.status === 'Aprovada' ? 'green' : 'grey'"
								text-color="white"
								small
								class="ml-auto"
								>
								{{ ingresso.status }}
							</v-chip>

							<!-- Ícone de cadeado se o status for diferente de 'Aprovada' -->
							<v-icon
								v-if="ingresso.status !== 'Aprovada'"
								color="grey"
								class="ml-2"
								style="font-size: 30px;"
								>
								mdi-lock
							</v-icon>
						</div>

						<div class="mt-4">
							<h3 class="text-h6 font-weight-bold">{{ ingresso.nome_evento }}</h3>
							<div class="text-subtitle-2 mb-2">{{ ingresso.titulo_ingresso }}</div>

							<v-chip
								v-if="ingresso.tipo"
								class="mb-2"
								small
								color="indigo lighten-4"
								text-color="indigo"
								>
								{{ ingresso.tipo }}
							</v-chip>

							<!-- Data e Horário lado a lado -->
							<div class="d-flex justify-space-between mb-2">
								<div><strong>Data:</strong> {{ ingresso.dataFormatada }}</div>
								<div><strong>Horário:</strong> {{ ingresso.horaFormatada }}</div>
							</div>

							<!-- Local e Ingresso lado a lado -->
							<div class="d-flex justify-space-between mb-2">
								<div><strong>Local:</strong> {{ ingresso.nome_local }}</div>
								<div><strong>Ingresso:</strong> #{{ ingresso.compra_id }}</div>
							</div>
						</div>

						<v-divider class="my-3" />

						<!-- Botões desabilitados se o status for diferente de "Aprovada" -->
						<div class="d-flex justify-space-between">
							<v-btn icon small @click="compartilharLink(ingresso.evento_id)">
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
							<v-btn icon small :disabled="ingresso.status !== 'Aprovada'" @click="abrirQRCode(ingresso.qr_code)">
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

		<!-- Dialog para exibir QR Code -->
		<v-dialog v-model="dialogQRCode" max-width="400px">
			<v-card>
				<v-card-text>
					<v-img :src="qrCodeBase64" max-width="100%" />
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn color="#EA0763" style="color: white;" @click="dialogQRCode = false">Fechar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Snackbar de confirmação -->
		<v-snackbar v-model="snackbarVisible" :timeout="2000">
			Link copiado com sucesso!
		</v-snackbar>
	</div>
</template>

<script>
	import AppBar from "@/components/AppBar.vue";
	import Rodape from "@/components/Rodape.vue";
	import { buscarIngressosByUser } from "@/services/ComprarService.js";
	import { exibirMensagemErro, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";

	export default {
		name: "MeusIngressos",

		components: {
			AppBar,
			Rodape,
		},

		data(){
			return {
				ingressos: [],
				dialogQRCode: false,
				qrCodeBase64: "",
				snackbarVisible: false,
			};
		},

		created(){
			this.buscaIngressos();
		},

		methods: {
			async buscaIngressos(){
				this.$carregando();
				buscarIngressosByUser(localStorage.getItem("authuserId"))
					.then((res) => {
						this.ingressos = res.data.map((ingresso) => {
							// Formatando a data para o formato "15 de Jan 2025"
							const data = new Date(ingresso.dateStart);
							ingresso.dataFormatada = data.toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							}).replace(".", ""); // Remove o ponto que aparece no final do mês abreviado

							// Formatando o startTime para "hora:minuto"
							const horaMinuto = ingresso.startTime.slice(0, 5); // Pega os primeiros 5 caracteres ("HH:mm")
							ingresso.horaFormatada = horaMinuto;

							return ingresso;
						});
					}).catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			abrirQRCode(qrCodeBase64){
				this.qrCodeBase64 = qrCodeBase64;
				this.dialogQRCode = true;
			},

			// Método para compartilhar o link
			compartilharLink(eventoId){
				const link = `https://central-ticket-web.vercel.app/evento/${eventoId}`;

				// Copiar o link para a área de transferência
				navigator.clipboard.writeText(link).then(() => {
					// Mostrar a mensagem de sucesso após copiar
					this.snackbarVisible = true;
				}).catch((error) => {
					console.error("Erro ao copiar o link:", error);
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
