<template>
	<div class="wrapper">
		<AppBar />

		<!-- Banner -->
		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" v-bind:class="{ 'mx-auto': $vuetify.breakpoint.mdAndDown }">
				<p class="banner-texto-grande" style="align-items: center;">Meus Eventos</p>
			</div>
		</div>

		<!-- Lista de Eventos -->
		<div class="event-list">
			<div v-for="evento in eventos" :key="evento.evento_id" class="event-card">
				<img :src="evento.photos" alt="Imagem do Evento" class="event-img" />
				<div class="event-content">
					<p class="event-data">{{ formatDate(evento.dateStart) }}</p>
					<h3 class="event-titulo">{{ evento.name }}</h3>
					<p class="event-local"><v-icon small>mdi-map-marker</v-icon> {{ evento.house.name }}</p>
					<div class="event-actions">
						<v-icon small color="blue" @click="editarEvento(evento.evento_id)">mdi-pencil</v-icon>
						<v-icon small color="red" @click="apagarEvento(evento.evento_id)">mdi-delete</v-icon>
					</div>
				</div>
			</div>
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
	import { buscarEventoByIdUser, apagarEvento } from "@/services/EventoService.js";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";

	export default {
		name: "MeusEventos",

		components: {
			AppBar,
			Rodape,
		},

		data(){
			return {
				eventos: [],
			};
		},

		created(){
			this.buscarEventos();
		},

		methods: {
			buscarEventos(){
				this.$carregando();
				buscarEventoByIdUser(localStorage.getItem("authuserId"))
					.then((res) => {
						this.eventos = res.data;
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao buscar eventos.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			formatDate(dateString){
				const options = {
					weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
				};
				const date = new Date(dateString);
				return date.toLocaleDateString("pt-BR", options).replace(",", "").replace(" às", " •");
			},

			editarEvento(eventoid){
				this.$router.push(`/cadastro-evento/${eventoid}`);
			},

			apagarEvento(eventoid){
				this.$carregando();
				apagarEvento(eventoid)
					.then((res) => {
						this.buscarEventos();
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao excluir o evento.");
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

	.event-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		justify-items: center;
		padding: 2rem;
	}

	.event-card {
		width: 100%;
		max-width: 320px;
		box-shadow: 0 4px 10px rgba(0,0,0,0.1);
		border-radius: 8px;
		overflow: hidden;
		background: #fff;
		display: flex;
		flex-direction: column;
	}

	.event-img {
		width: 100%;
		height: 160px;
		object-fit: cover;
	}

	.event-content {
		padding: 16px;
	}

	.event-data {
		font-size: 14px;
		color: #666;
	}

	.event-titulo {
		margin: 8px 0;
		font-size: 18px;
	}

	.event-local {
		font-size: 14px;
		color: #777;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.event-desc {
		margin-top: 8px;
		font-size: 14px;
	}

	.event-link {
		color: #3f51b5;
		font-weight: bold;
		display: inline-block;
		margin-top: 12px;
	}

	.event-actions {
		margin-top: 12px;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	@media (max-width: 1024px) {
		.event-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.event-list {
			grid-template-columns: 1fr;
		}
	}
</style>
