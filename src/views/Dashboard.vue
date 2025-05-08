<template>
	<div class="wrapper">
		<!-- AppBar -->
		<div>
			<AppBar />
		</div>

		<!-- Banner -->
		<div
			class="banner"
			:style="{ backgroundImage: 'url(' + require('@/assets/speaker-bg.png') + ')' }"
			>
			<div class="banner-content" :class="{ 'mx-auto': $vuetify.breakpoint.mdAndDown }">
				<p class="banner-texto-grande" style="align-items: center;">Dashboard</p>
			</div>
		</div>

		<!-- Container geral da dashboard -->
		<div class="dashboard-container" style="margin-top: 20px; display: flex; flex-wrap: wrap; gap: 20px;">

			<!-- Cards -->
			<div class="dashboard-cards" style="flex: 1 1 100%; display: flex; justify-content: space-between; gap: 20px;">
				<!-- Card 1 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="20" style="color: blue;">mdi-calendar</v-icon>
					</div>
					<p class="text-gray-500 text-sm">Eventos Ativos</p>
					<h2 class="text-2xl font-semibold">{{ totalEventosAtivos }}</h2>
				</div>

				<!-- Card 2 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="20" style="color: #16A34A;">mdi-account-group</v-icon>
					</div>
					<p class="text-gray-500 text-sm">Participantes</p>
					<h2 class="text-2xl font-semibold">1.248</h2>
					<p class="text-green-600 text-sm card-status">↑ 5% este mês</p>
				</div>

				<!-- Card 3 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="20" style="color: purple;">mdi-ticket-confirmation</v-icon>
					</div>
					<p class="text-gray-500 text-sm">Ingressos Vendidos</p>
					<h2 class="text-2xl font-semibold">{{ ingressosVendidos }}</h2>
				</div>

				<!-- Card 4 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="20" style="color: green;">mdi-currency-usd</v-icon>
					</div>
					<p class="text-gray-500 text-sm">Receita Total</p>
					<h2 class="text-2xl font-semibold">R$ {{ receitaGerada }}</h2>
				</div>
			</div>

			<!-- Gráfico + Eventos -->
			<div class="dashboard-bottom" style="flex: 1 1 100%; display: flex; gap: 20px;">
				<!-- Coluna esquerda: gráficos empilhados -->
				<div class="graficos-coluna" style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
					<!-- Gráfico de Barras -->
					<div class="grafico-barras" style="flex: 1;">
						<apexchart
							type="bar"
							height="300"
							:options="chartOptions"
							:series="chartData"
							/>
					</div>

					<!-- Gráfico de Pizza -->
					<div class="grafico-pizza" style="flex: 1;">
						<apexchart
							type="pie"
							height="300"
							:options="pieOptions"
							:series="pieSeries"
							/>
					</div>
				</div>

				<div class="graficos-coluna" style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
					<!-- Coluna direita: eventos -->
					<div class="eventos-box">
						<h3 class="eventos-titulo">Próximos Eventos</h3>
						<ul class="eventos-lista">
							<li v-for="evento in eventos" :key="evento.nome">
								<p class="evento-nome">{{ evento.nome }}</p>
								<p class="evento-data">{{ evento.data }}</p>
							</li>
							<a>
								<button>CADSTRE SEU EVENTO</button>
							</a>
						</ul>
					</div>

					<!-- Gráfico de Linha -->
					<div class="grafico-linha" style="flex: 1;">
						<apexchart
							type="line"
							height="300"
							:options="lineOptions"
							:series="lineSeries"
							/>
					</div>
				</div>
			</div>
		</div>

		<!-- Rodapé -->
		<div style="margin-top: 20px;">
			<Rodape />
		</div>
	</div>
</template>

<script>
	import Rodape from "@/components/Rodape.vue";
	import AppBar from "@/components/AppBar.vue";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";
	import {
		busacarQuantidadeIngresso, busacarQuantidadeEventosAtivos, busacarReceitaGerada, busacarTotalArrecadadoPorEvento, busacarArrecadacoMensal, busacarPercentualVendaIngressos,
	} from "@/services/DashboardService.js";

	export default {
		name: "Dashboard",
		components: {
			AppBar,
			Rodape,
		},

		data(){
			return {
				// Gráfico de barra
				chartData: [
					{
						name: "Receita Mensal",
						data: [5000, 4000, 6000, 7000, 5000, 8000], // Dados para as barras
					},
				],
				chartOptions: {
					chart: {
						type: "bar",
						height: "350",
					},
					colors: ["#2410C2"], // <- Cor personalizada para as barras
					xaxis: {
						categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
					},
					title: {
						text: "Receita Mensal",
						align: "left",
						style: {
							fontSize: "16px",
						},
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: "55%",
							endingShape: "rounded",
						},
					},
					dataLabels: {
						enabled: false,
					},
				},

				// Gráfico de pizza
				pieSeries: [44, 33, 23], // porcentagem de ingressos vendidos por tipo
				pieOptions: {
					labels: ["Pista", "VIP", "Camarote"],
					legend: { position: "bottom" },
					colors: ["#2410C2", "#6A5ACD", "#8A2BE2"],
					title: {
						text: "Ingressos Vendidos por Tipo",
						align: "left",
						style: {
							fontSize: "16px",
							fontWeight: "bold",
							color: "#333",
						},
					},
				},

				// Gráfico de Linhas
				lineSeries: [
					{
						name: "Arrecadação",
						data: [3500, 4200, 5000, 4800, 5300, 6100],
					},
				],
				lineOptions: {
					chart: {
						id: "line-chart",
						toolbar: { show: false },
					},
					stroke: {
						curve: "smooth",
						width: 3,
						colors: ["#2410C2"],
					},
					xaxis: {
						categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
					},
					title: {
						text: "Arrecadação Mensal",
						align: "left",
						style: {
							fontSize: "16px",
						},
					},
				},

				// Eventos
				eventos: [
					{ nome: "Workshop de Design", data: "10 de Maio, 14h" },
					{ nome: "Congresso de Tecnologia", data: "15 de Maio, 09h" },
					{ nome: "Meetup Vue.js", data: "20 de Maio, 19h" },
				],

				// Outras variaveis
				ingressosVendidos: null,
				totalEventosAtivos: null,
				receitaGerada: null,
				receitaGerada2: null,
			};
		},

		created(){
			this.busacarQuantidadeIngresso();
			this.busacarQuantidadeEventosAtivos();
			this.busacarReceitaGerada();
			this.busacarTotalArrecadadoPorEvento();
			this.busacarArrecadacoMensal();
			this.busacarPercentualVendaIngressos();
		},

		methods: {
			busacarQuantidadeIngresso(){
				this.$carregando();
				busacarQuantidadeIngresso(localStorage.getItem("authuserId"))
					.then((res) => {
						this.ingressosVendidos = res.data.total_ingressos_vendidos;
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar quantidade de ingressos vendidas.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			busacarQuantidadeEventosAtivos(){
				this.$carregando();
				busacarQuantidadeEventosAtivos(localStorage.getItem("authuserId"))
					.then((res) => {
						this.totalEventosAtivos = res.data.totalEventosAtivos;
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar quantidade de eventos ativos vendidas.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			busacarReceitaGerada(){
				this.$carregando();
				busacarReceitaGerada(localStorage.getItem("authuserId"))
					.then((res) => {
						this.receitaGerada = res.data.totalArrecadado;
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar a receita gerada.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			busacarTotalArrecadadoPorEvento(){
				this.$carregando();

				busacarTotalArrecadadoPorEvento(localStorage.getItem("authuserId"))
					.then((res) => {
						const eventos = res.data;

						// Ordena do maior para o menor total arrecadado
						eventos.sort((a, b) => b.total_arrecadado - a.total_arrecadado);

						// Mantém apenas os 10 eventos com maior arrecadação
						const eventosTop10 = eventos.slice(0, 10);

						// Prepara nomes abreviados se forem muito longos
						const nomesEventos = eventosTop10.map((e) => (e.nome_evento.length > 50 ? `${e.nome_evento.slice(0, 12)}...` : e.nome_evento));

						// Atualiza o gráfico com os dados tratados
						this.chartData = [
							{
								name: "Receita por Evento",
								data: eventosTop10.map((e) => e.total_arrecadado),
							},
						];

						this.chartOptions = {
							...this.chartOptions, // mantém opções anteriores
							xaxis: {
								...this.chartOptions.xaxis,
								categories: nomesEventos,
								labels: {
									rotate: -45,
									style: {
										fontSize: "12px",
									},
								},
							},
							title: {
								text: "Top 10 Eventos por Receita",
								align: "left",
								style: {
									fontSize: "16px",
								},
							},
						};

						// Receita total (de todos os eventos, não só os 10)
						this.receitaGerada2 = eventos.reduce((total, e) => total + e.total_arrecadado, 0);
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar a receita gerada.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			busacarArrecadacoMensal(){
				this.$carregando();

				busacarArrecadacoMensal(localStorage.getItem("authuserId"))
					.then((res) => {
						const dados = res.data;

						// Converte as datas para nomes de mês abreviados, ex: "Jan", "Feb", etc.
						const meses = dados.map((item) => {
							const [ano, mes] = item.mes.split("-").map(Number); // Agora só pegamos ano e mês
							const data = new Date(ano, mes - 1); // mês - 1 pois janeiro = 0
							return data.toLocaleString("pt-BR", { month: "short" }); // ou 'default' para inglês
						});

						// Extrai os valores
						const valores = dados.map((item) => item.total_arrecadado);

						// Atualiza o gráfico de linha
						this.lineSeries = [
							{
								name: "Arrecadação",
								data: valores,
							},
						];

						this.lineOptions = {
							...this.lineOptions,
							xaxis: {
								...this.lineOptions.xaxis,
								categories: meses,
							},
						};

						// Soma total de arrecadação do período
						this.receitaGerada2 = valores.reduce((acc, v) => acc + v, 0);
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar a receita gerada.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			busacarPercentualVendaIngressos(){
				this.$carregando();

				busacarPercentualVendaIngressos(localStorage.getItem("authuserId"))
					.then((res) => {
						const dados = res.data;

						// Extrai os nomes dos ingressos e as quantidades vendidas
						const labels = dados.map((item) => item.nome_ingresso);
						const series = dados.map((item) => item.quantidade_vendida);

						// Atualiza os dados do gráfico de pizza
						this.pieSeries = series;
						this.pieOptions = {
							...this.pieOptions,
							labels,
							title: {
								text: "Ingressos Vendidos por Tipo",
								align: "left",
								style: {
									fontSize: "16px",
									fontWeight: "bold",
									color: "#333",
								},
							},
						};
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar a receita gerada.");
						console.error(error);
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
		background:#f4f4f4;
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

	.dashboard-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
		padding: 20px;
	}

	.dashboard-cards {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: space-between;
	}

	.card {
		flex: 1 1 calc(25% - 20px);
		background: white;
		padding: 16px;
		border-radius: 12px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		min-width: 200px;
	}

	.card-icon {
		margin-bottom: 8px;
	}

	.dashboard-bottom {
		display: flex;
		gap: 20px;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.graficos-coluna {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex: 1;
	}

	.grafico-barras,
	.grafico-pizza,
	.grafico-linha {
		background: white;
		padding: 20px;
		border-radius: 12px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		height: 280px;
	}

	.grafico-barras {
		flex: 2;
	}

	.grafico-pizza {
		flex: 1;
	}

	.eventos-box {
		flex: 1;
		background: white;
		padding: 20px;
		border-radius: 12px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		min-width: 300px;
	}

	.eventos-titulo {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 12px;
	}

	.eventos-lista {
		list-style: none;
		padding: 0;
		margin: 0;
		height: 280px;
	}

	.eventos-lista li {
		margin-bottom: 12px;
	}

	.evento-nome {
		font-weight: 600;
	}

	.evento-data {
		color: gray;
		font-size: 14px;
	}

	.grafico-pizza {
		margin-top: 20px;
		height: 280px;
	}

	@media (min-width: 640px) {
		.dashboard-cards .card {
			width: 48%; /* Cards ocupando 48% da largura em telas pequenas */
		}
	}

	@media (min-width: 768px) {
		.dashboard-cards .card {
			width: 23%; /* Cards ocupando 23% da largura em telas maiores */
		}

		.grafico-barras,
		.grafico-pizza,
		.grafico-linha {
			height: 300px; /* Altura uniforme para os gráficos */
		}

		.eventos-box {
			flex: 2; /* Coloca a lista de eventos em uma área maior em telas grandes */
		}
	}
</style>
