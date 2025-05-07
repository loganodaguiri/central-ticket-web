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
					<h2 class="text-2xl font-semibold">12</h2>
					<p class="text-green-600 text-sm card-status">↑ 2 desde ontem</p>
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
					<h2 class="text-2xl font-semibold">856</h2>
					<p class="text-red-600 text-sm card-status">↓ 2% este mês</p>
				</div>

				<!-- Card 4 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="20" style="color: green;">mdi-currency-usd</v-icon>
					</div>
					<p class="text-gray-500 text-sm">Receita Total</p>
					<h2 class="text-2xl font-semibold">R$ 42.560</h2>
					<p class="text-green-600 text-sm card-status">↑ 12% este mês</p>
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
			};
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
