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

			<div style="flex: 1 1 100%; display: flex; justify-content: flex-start;">
				<Eventos
					label="Eventos"
					v-model="planosSelecionados"
					ref="selecaoEventos"
					/>
			</div>

			<!-- Cards -->
			<div class="dashboard-cards" style="flex: 1 1 100%; display: flex; justify-content: space-between; gap: 20px;">
				<!-- Card 1 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="40" style="color: #16A34A;">mdi-calendar-multiselect</v-icon>
					</div>
					<p class="eventos-titulo">Totoal De Eventos</p>
					<h2 class="eventos-titulo">{{ totalEventos }}</h2>
				</div>

				<!-- Card 2 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="40" style="color: blue;">mdi-calendar-check</v-icon>
					</div>
					<p class="eventos-titulo">Eventos Ativos</p>
					<h2 class="eventos-titulo">{{ totalEventosAtivos }}</h2>
				</div>

				<!-- Card 3 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="40" style="color: purple;">mdi-ticket-confirmation</v-icon>
					</div>
					<p class="eventos-titulo">Ingressos Vendidos</p>
					<h2 class="eventos-titulo">{{ ingressosVendidos }}</h2>
				</div>

				<!-- Card 4 -->
				<div class="card">
					<div class="card-icon">
						<v-icon size="40" style="color: green;">mdi-currency-usd</v-icon>
					</div>
					<p class="eventos-titulo">Receita Total</p>
					<h2 class="eventos-titulo">R$ {{ receitaGerada }}</h2>
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

					<div class="grafico-barras" style="flex: 1;">
						<apexchart
							type="bar"
							height="350"
							:options="chartOptionsParticipantes"
							:series="chartDataParticipantes"
							/>
					</div>
				</div>

				<div class="graficos-coluna" style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
					<!-- Coluna direita: eventos -->
					<div class="eventos-box">
						<h3 class="eventos-titulo">Próximos Eventos</h3>
						<ul class="eventos-lista">
							<li v-for="evento in eventos.slice(0, 3)" :key="evento.nome_evento" class="evento-item">
								<div class="evento-info">
									<img
										:src="evento.photos"
										alt="Ícone do evento"
										class="evento-imagem"
										/>
									<div class="evento-texto">
										<p class="evento-nome">{{ evento.nome_evento }}</p>
										<p class="evento-data">{{ evento.data }}</p>
										<div class="barra-container" :title="evento.porcentagem_vendida + '% de ingressos vendidos'">
											<div
												class="barra-preenchida"
												:style="{
													width: evento.porcentagem_vendida
														? `${parseFloat(evento.porcentagem_vendida)}%`
														: '0%'
												}"
												/>
											<span class="porcentagem-texto">
												{{ parseFloat(evento.porcentagem_vendida) }}%
											</span>
										</div>
									</div>
								</div>
							</li>
						</ul>

						<!-- Botão embaixo da lista, ocupando toda a largura -->
						<div class="evento-cadastro-wrapper">
							<button class="evento-cadastro-btn">VER TODOS EVENTOS</button>
						</div>
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
					<!-- Gráfico de Participantes por Mês -->
					<div class="grafico-linha" style="flex: 1;">
						<apexchart
							:options="participantesOptions"
							:series="participantesSeries"
							type="line"
							height="350"
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
		busacarQuantidadeIngresso, busacarQuantidadeEventosAtivos, busacarReceitaGerada, busacarTotalArrecadadoPorEvento, busacarArrecadacoMensal, busacarPercentualVendaIngressos, busacarProximosEventos,
		busacarQuantidadeEventos, participantesPorEvento, participantesPorMes,
	} from "@/services/DashboardService.js";
	import Eventos from "@/components/Eventos.vue";

	export default {
		name: "Dashboard",
		components: {
			AppBar,
			Rodape,
			Eventos,
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

				// Grafico barra 2
				chartDataParticipantes: [],
				chartOptionsParticipantes: {
					chart: {
						type: "bar",
						height: 350,
					},
					colors: ["#2410C2"],
					xaxis: {
						categories: [],
					},
					title: {
						text: "Top 10 Eventos por Participantes",
						align: "left",
						style: {
							fontSize: "16px",
						},
					},
				},

				// Dados e configurações do gráfico de Participantes
				participantesSeries: [],
				participantesOptions: {
					chart: {
						type: "line",
						height: 350,
					},
					xaxis: {
						categories: [], // Meses
					},
					stroke: {
						curve: "smooth",
						width: 3,
						colors: ["#2410C2"],
					},
					title: {
						text: "Participantes por Mês",
						align: "left",
						style: {
							fontSize: "16px",
						},
					},
				},

				// Eventos
				eventos: [],

				// Outras variaveis
				ingressosVendidos: null,
				totalEventosAtivos: null,
				totalEventos: null,
				receitaGerada: null,
				receitaGerada2: null,
				valorSelecionado: null,
				planosSelecionados: null,
				idEvento: null,
			};
		},

		watch: {
			planosSelecionados(newValue){
				this.idEvento = newValue.id;
				this.busacarQuantidadeIngresso();
				this.busacarReceitaGerada();
				this.busacarTotalArrecadadoPorEvento();
				this.busacarArrecadacoMensal();
				this.busacarPercentualVendaIngressos();
				this.participantesPorEvento();
				this.participantesPorMes();
			},
		},

		created(){
			this.busacarQuantidadeIngresso();
			this.busacarQuantidadeEventosAtivos();
			this.busacarReceitaGerada();
			this.busacarTotalArrecadadoPorEvento();
			this.busacarArrecadacoMensal();
			this.busacarPercentualVendaIngressos();
			this.busacarProximosEventos();
			this.busacarQuantidadeEventos();
			this.participantesPorEvento();
			this.participantesPorMes();
		},

		methods: {
			busacarQuantidadeIngresso(){
				this.$carregando();
				busacarQuantidadeIngresso(localStorage.getItem("authuserId"), this.idEvento)
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

			busacarQuantidadeEventos(){
				this.$carregando();
				busacarQuantidadeEventos(localStorage.getItem("authuserId"))
					.then((res) => {
						this.totalEventos = res.data.totalEventos;
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar quantidade de eventos.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			busacarReceitaGerada(){
				this.$carregando();
				busacarReceitaGerada(localStorage.getItem("authuserId"), this.idEvento)
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

				busacarTotalArrecadadoPorEvento(localStorage.getItem("authuserId"), this.idEvento)
					.then((res) => {
						const eventos = res.data;

						// Ordena do maior para o menor total arrecadado
						eventos.sort((a, b) => b.receita_total - a.receita_total);

						// Mantém apenas os 10 eventos com maior arrecadação
						const eventosTop10 = eventos.slice(0, 10);

						// Prepara nomes abreviados se forem muito longos
						const nomesEventos = eventosTop10.map((e) => (e.nome_evento.length > 50 ? `${e.nome_evento.slice(0, 12)}...` : e.nome_evento));

						// Atualiza o gráfico com os dados tratados
						this.chartData = [
							{
								name: "Receita por Evento",
								data: eventosTop10.map((e) => e.receita_total), // Ajustando para receita_total
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
						this.receitaGerada2 = eventos.reduce((total, e) => total + e.receita_total, 0); // Ajustando para receita_total
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

				busacarArrecadacoMensal(localStorage.getItem("authuserId"), this.idEvento)
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

				busacarPercentualVendaIngressos(localStorage.getItem("authuserId"), this.idEvento)
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

			busacarProximosEventos(){
				this.$carregando();
				busacarProximosEventos(localStorage.getItem("authuserId"))
					.then((res) => {
						this.eventos = res.data.map((evento) => {
							const data = new Date(`${evento.dateStart}T${evento.startTime}`);

							const dia = String(data.getDate()).padStart(2, "0");
							const mesAbreviado = data.toLocaleString("pt-BR", { month: "short" });
							const horaMinuto = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

							// Removendo as aspas extras da URL em 'photos'
							const photoUrl = evento.photos.replace(/^"|"$/g, ""); // Remove as aspas no início e no final

							return {
								...evento,
								data: `${dia} ${mesAbreviado} • ${horaMinuto}`,
								photos: photoUrl, // Aqui substituímos o valor da foto
							};
						});
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar próximos eventos.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			getPercentualNumerico(percentual){
				return percentual ? parseFloat(percentual.replace("%", "")) : 0;
			},

			participantesPorEvento(){
				this.$carregando();

				participantesPorEvento(localStorage.getItem("authuserId"), this.idEvento)
					.then((res) => {
						// Remove eventos com 0 participantes
						const eventos = res.data.filter((e) => Number(e.total_participantes) > 0);

						// Ordena do maior para o menor total de participantes
						eventos.sort((a, b) => b.total_participantes - a.total_participantes);

						// Mantém apenas os 10 eventos com mais participantes
						const eventosTop10 = eventos.slice(0, 10);

						const nomesEventos = eventosTop10.map((e) => (e.nome_evento.length > 50 ? `${e.nome_evento.slice(0, 12)}...` : e.nome_evento));

						this.chartDataParticipantes = [
							{
								name: "Participantes por Evento",
								data: eventosTop10.map((e) => e.total_participantes),
							},
						];

						this.chartOptionsParticipantes = {
							...this.chartOptionsParticipantes,
							xaxis: {
								categories: nomesEventos,
								labels: {
									rotate: -45,
									style: {
										fontSize: "12px",
									},
								},
							},
						};
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar os participantes por evento.");
						console.error(error);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			participantesPorMes(){
				this.$carregando();

				participantesPorMes(localStorage.getItem("authuserId"), this.idEvento)
					.then((res) => {
						const dados = res.data;

						// Mapeamento dos meses em inglês para abreviações em português
						const mesTraducaoAbreviado = {
							January: "Jan",
							February: "Fev",
							March: "Mar",
							April: "Abr",
							May: "Mai",
							June: "Jun",
							July: "Jul",
							August: "Ago",
							September: "Set",
							October: "Out",
							November: "Nov",
							December: "Dez",
						};

						// Ordem correta dos meses para ordenação
						const ordemMeses = [
							"January", "February", "March", "April", "May", "June",
							"July", "August", "September", "October", "November", "December",
						];

						// Ordena os dados com base na ordem dos meses
						const dadosOrdenados = dados.sort(
							(a, b) => ordemMeses.indexOf(a.nome_mes) - ordemMeses.indexOf(b.nome_mes),
						);

						// Obtém o índice do mês atual (0 = Janeiro, 11 = Dezembro)
						const mesAtualIndex = new Date().getMonth();

						// Converte os nomes dos meses para abreviações em português
						const mesesAbreviados = dadosOrdenados.map((item) => mesTraducaoAbreviado[item.nome_mes] || item.nome_mes);

						// Extrai os valores de participantes (garantindo que sejam números)
						const participantes = dadosOrdenados.map((item) => Number(item.total_participantes));

						// Corta os arrays até o mês atual (inclusive)
						const mesesFiltrados = mesesAbreviados.slice(0, mesAtualIndex + 1);
						const participantesFiltrados = participantes.slice(0, mesAtualIndex + 1);

						// Atualiza o gráfico de linhas
						this.participantesSeries = [
							{
								name: "Participantes",
								data: participantesFiltrados,
							},
						];

						this.participantesOptions = {
							chart: {
								type: "line",
							},
							xaxis: {
								categories: mesesFiltrados,
							},
							title: {
								text: "Participantes por Mês",
								align: "left",
								style: {
									fontSize: "16px",
								},
							},
						};

						// Participantes totais do ano até o mês atual
						this.totalParticipantesAno = participantesFiltrados.reduce((acc, v) => acc + v, 0);
					})
					.catch((error) => {
						exibirMensagemErroApi("Erro ao buscar os participantes.");
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

	.evento-info {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		margin-top: 15px;
	}

	.evento-imagem {
		width: 80px;
		height: 70px;
	}

	.barra-container {
    position: relative;
    background-color: #e0e0e0;
    border-radius: 8px;
    height: 20px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 4px;
	}

	.barra-preenchida {
		background-color: #2410C2;
		height: 100%;
		transition: width 0.3s ease;
	}

	.porcentagem-texto {
		margin-left: 8px;
		font-size: 0.85rem;
		color: #333;
		white-space: nowrap;
	}

	.evento-texto {
		display: flex;
		flex-direction: column;
	}

	.evento-nome,
	.evento-data {
		margin: 0;
		line-height: 1.2;
		font-size: 16px;
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

	.evento-cadastro-wrapper {
		margin-top: 16px;
		width: 100%;
	}

	.evento-cadastro-btn {
		width: 100%;
		padding: 12px 16px;
		background-color: var(--cor-primaria-100); /* ou qualquer cor que desejar */
		color: white;
		background-color: #EA0763;
		font-weight: bold;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s;
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
