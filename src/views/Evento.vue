<template>
	<div class="wrapper">
		<div>
			<AppBar/>
		</div>

		<!-- Event Banner -->
		<div class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }">
			<div class="banner-content" v-bind:class="{'mx-auto':$vuetify.breakpoint.mdAndDown}">
				<p class="banner-texto-grande" style="align-items: center;">
					<b>{{ eventTitle }}</b>
				</p>
				<p class="banner-texto-pequeno" style="align-items: center;">
					<span style="align-items: center; gap: 0.3rem;  margin-left: 3%;">
						<i class="mdi mdi-calendar"/>
						<b>{{ eventoData }}</b>
					</span>
					<span style="align-items: center; gap: 0.3rem;  margin-left: 3%;">
						<i class="mdi mdi-clock-time-four-outline"/>
						<b>{{ eventoPerido }}</b>
					</span>
					<span style="align-items: center; gap: 0.3rem; margin-left: 3%;">
						<i class="mdi mdi-map-marker"/>
						<b>{{ eventoLocal }}</b>
					</span>
				</p>
			</div>
		</div>

		<!-- Container principal com duas colunas lado a lado -->
		<div class="evento-container">
			<!-- Coluna da esquerda (com 2 cards empilhados) -->

			<div class="sobre-coluna">
				<!-- Sobre o Evento -->
				<div class="sobre-o-evento">
					<h2>Sobre o Evento</h2>
					<div v-html="evento.description"/>
				</div>

				<!-- Localização -->
				<div class="sobre-o-evento">
					<h2>Localização</h2>
					<p>
						{{ `${evento.house.address}, ${evento.house.number} - ${evento.house.city}, ${evento.house.state}` }}
					</p>
					<iframe
						v-if="latitude && longitude"
						width="100%"
						height="300"
						frameborder="0"
						scrolling="no"
						marginheight="0"
						marginwidth="0"
						:src="`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`"/>
				</div>

				<!-- Localização -->
				<div class="sobre-o-evento">
					<h2>Produtor</h2>
					{{ evento.producer.name }}
					<div v-html="evento.producer.description"/>
				</div>

			</div>

			<!-- Coluna da direita -->
			<div class="lateral-evento">
				<h2>Ingressos</h2>
				<p>Vendas até 24 de Novembro</p>

				<div
					class="ingresso-card"
					v-for="(ingresso, index) in ingressos"
					:key="index"
					>
					<h4>{{ ingresso.titulo }}</h4>
					<p>R$ {{ ingresso.valor.toFixed(2) }}</p>

					<div class="quantidade-selector">
						<button @click="decrementar(index)" :disabled="ingresso.quantidade <= ingresso.quantidade_minima_por_compra">−</button>
						<input
							type="number"
							v-model="ingresso.quantidade"
							:min="ingresso.quantidade_minima_por_compra"
							:max="ingresso.quantidade_maxima_por_compra"
							readonly
							/>
						<button @click="incrementar(index)" :disabled="ingresso.quantidade >= ingresso.quantidade_maxima_por_compra">+</button>
					</div>

					<p>Quantidade: {{ ingresso.quantidade }}</p>
				</div>
				<div class="total-container">
					<h3>Total: R$ {{ total.toFixed(2) }}</h3>
					<button class="btn-comprar" @click="buyTickets">
						Comprar
					</button>
				</div>
			</div>
		</div>

		<div style="margin-top: 20px;">
			<Rodape/>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import LogoHorizontal from "@/assets/logo-horizontal.png";
	import { exibirMensagemErro, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";
	import AppBar from "@/components/AppBar.vue";
	import { buscarEventoById } from "@/services/EventoService.js";
	import Rodape from "@/components/Rodape.vue";
	import { buscaIngresoByIdEvento } from "@/services/IngressoService.js";
	import { criarCompra } from "@/services/ComprarService.js";

	export default {
		name: "Evento",

		components: {
			AppBar,
			Rodape,
		},

		data(){
			return {
				LogoHorizontal,
				eventTitle: null,
				eventoData: "25 de novembro, 2023",
				eventoPerido: "19:00 - 06:00",
				eventoLocal: "Parque de Eventos, São Paulo - SP",
				quantidade: 1,
				min: 1,
				max: 5,
				ingressos: [],
				evento: {},
				tokenLogando: null,
				latitude: null,
				longitude: null,
			};
		},

		computed: {
			total(){
				return this.ingressos.reduce((sum, ingresso) => {
					const quantidade = ingresso.quantidade || 0;
					return sum + (ingresso.valor * quantidade);
				}, 0);
			},
		},

		created(){
			this.buscarDadosEvento();
			this.buscarIngressos();
			this.tokenLogando = localStorage.getItem("authToken");
		},

		methods: {
			buscarDadosEvento(){
				this.$carregando();
				buscarEventoById(this.$route.params.id)
					.then(async(res) => {
						this.eventTitle = res.data.name;
						const data = new Date(res.data.dateStart);
						this.eventoData = new Intl.DateTimeFormat("pt-BR", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						}).format(data);
						this.eventoPerido = `${res.data.startTime.slice(0, 5)} - ${res.data.endTime.slice(0, 5)}`;
						this.eventoLocal = `${res.data.house.name}, ${res.data.house.city} - ${res.data.house.state}`;
						this.evento = res.data;

						// Obter coordenadas usando Nominatim
						const endereco = `${res.data.house.address}, ${res.data.house.number} - ${res.data.house.city}, ${res.data.house.state}`;
						const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json`);
						const resultado = await response.json();

						if(resultado.length > 0){
							this.latitude = parseFloat(resultado[0].lat);
							this.longitude = parseFloat(resultado[0].lon);
						}
					})
					.catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			buscarIngressos(){
				this.$carregando();

				const evento_id = this.$route.params.id;

				buscaIngresoByIdEvento(evento_id)
					.then((res) => {
						this.ingressos = res.data.map((ingresso) => ({
							...ingresso,
							quantidade: 0,
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

			incrementar(index){
				if(this.ingressos[index].quantidade < this.ingressos[index].quantidade_maxima_por_compra){
					this.ingressos[index].quantidade += 1;
				}
			},

			decrementar(index){
				if(this.ingressos[index].quantidade > this.ingressos[index].quantidade_minima_por_compra){
					this.ingressos[index].quantidade -= 1;
				}
			},

			buyTickets(){
				if(this.tokenLogando == null){
					exibirMensagemAtencao("Favor fazer login antes de comprar um evento");
				}
				else{
					// Filtra apenas ingressos com quantidade > 0
					const ingressosSelecionados = this.ingressos
						.filter((i) => i.quantidade > 0)
						.map((i) => ({
							ingresso_id: i.ingresso_id,
							quantidade: i.quantidade,
							valor: i.valor,
						}));

					if(ingressosSelecionados.length === 0){
						exibirMensagemAtencao("Selecione ao menos um ingresso.");
						return;
					}

					// Verifica se todos os ingressos são gratuitos
					const todosSaoGratuitos = ingressosSelecionados.every((i) => i.valor === 0);

					if(todosSaoGratuitos){
						// Monta o formulário para compra gratuita
						const compraFormulario = {
							usuario_id: localStorage.getItem("authuserId"),
							itens: ingressosSelecionados,
						};

						this.$carregando();

						criarCompra(compraFormulario)
							.then((res) => {
								this.idCompra = res.data.compra.compra_id;
								localStorage.removeItem("ingressosSelecionados");
								this.$router.push("/meus-ingressos");
							})
							.catch((error) => {
								const msg = error?.response?.data?.msg || "Erro ao finalizar compra.";
								exibirMensagemErro(msg);
							})
							.finally(() => {
								this.$finalizarCarregando();
							});
					}
					else{
						// Caso tenha ingresso com valor, redireciona para fluxo de pagamento
						localStorage.setItem("ingressosSelecionados", JSON.stringify(ingressosSelecionados));
						this.$router.push("/compra");
					}
				}
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
    color: white;
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
    color: white;
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

	.sobre-o-evento {
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		padding: 24px;
		max-width: 600px;
		font-family: 'Segoe UI', sans-serif;
	}

	.sobre-o-evento h2 {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 12px;
	}

	.sobre-o-evento h3 {
		font-weight: bold;
		margin-top: 20px;
		margin-bottom: 8px;
		font-size: 16px;
	}

	.sobre-o-evento ul {
		padding-left: 20px;
		list-style-type: disc;
		margin-bottom: 12px;
	}

	.sobre-o-evento p {
		margin-bottom: 16px;
		line-height: 1.6;
	}

	.evento-container {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 2rem;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.sobre-coluna {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 600px;
		flex: 1 1 300px;
	}

	.sobre-o-evento,
	.lateral-evento {
		background-color: #f3f4f6;
		border: 1px solid #000;
		border-radius: 8px;
		padding: 24px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		font-family: 'Segoe UI', sans-serif;
	}

	.lateral-evento {
		max-width: 300px;
		flex: 1 1 300px;
	}

	.ingresso-card {
		background: white;
		border: 1px solid #ccc;
		padding: 16px;
		border-radius: 8px;
		margin-top: 1rem;
	}

	.quantidade-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.quantidade-selector button {
		padding: 0.4rem 0.8rem;
		font-size: 18px;
		border: none;
		background-color: #6c63ff;
		color: white;
		border-radius: 4px;
		cursor: pointer;
	}

	.quantidade-selector button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}

	.quantidade-selector input {
		width: 50px;
		text-align: center;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.2rem;
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

	.total-container {
		margin-top: 20px;
		text-align: center;
	}

	.btn-comprar {
		background-color: #28a745;
		color: white;
		padding: 10px 16px;
		font-size: 16px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}

	.btn-comprar:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
