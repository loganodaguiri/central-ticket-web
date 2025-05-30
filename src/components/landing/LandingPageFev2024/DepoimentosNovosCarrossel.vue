<template>
	<section class="section-margin">
		<div class="container">
			<v-carousel
				height="450"
				hide-delimiter-background
				:show-arrows="true"
				cycle
				class="mb-4"
				>
				<v-carousel-item
					v-for="(group, index) in groupedBlogs"
					:key="index"
					>
					<v-row justify="center" align="stretch" no-gutters>
						<v-col
							v-for="(event, subIndex) in group"
							:key="subIndex"
							cols="12"
							sm="6"
							class="d-flex justify-center"
							>
							<v-card
								class="ma-2 hover-shadow"
								max-width="500"
								@click="irParaDetalhes(event.evento_id)"
								style="cursor: pointer;"
								>
								<v-img
									:src="event.photos || '/img/padrao.jpg'"
									height="250px"
									cover
									/>
								<v-card-text>
									<h3 class="primary--text mb-2">{{ event.name }}</h3>
									<ul class="blog-info pa-0" style="list-style: none;">
										<li class="mb-1">
											<v-icon small class="mr-1">mdi-calendar</v-icon>
											{{ formatDate(event.dateStart) }}, {{ event.house?.city || '' }}/{{ event.house?.state || '' }}
										</li>
										<li>
											<v-icon small class="mr-1">mdi-clock-outline</v-icon>
											{{ event.startTime.slice(0, 5) }} às {{ event.endTime.slice(0, 5) }}
										</li>
									</ul>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-carousel-item>
			</v-carousel>
		</div>
	</section>
</template>

<script>
	import { exibirMensagemErro } from "@/util/MessageUtils.js";
	import { buscarEventosDestaque } from "@/services/EventoService.js";

	export default {
		name: "BlogCarousel",
		data(){
			return {
				eventos: [],
				groupedBlogs: [],
			};
		},
		mounted(){
			this.buscarEventosDestaque();
		},
		methods: {
			buscarEventosDestaque(){
				this.$carregando();
				buscarEventosDestaque()
					.then((res) => {
						this.eventos = res.data;
						this.groupEvents();
					})
					.catch((error) => {
						const msg =	error?.response?.data?.msg;
						exibirMensagemErro(msg);
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			groupEvents(){
				this.groupedBlogs = [];
				for(let i = 0; i < this.eventos.length; i += 2){
					this.groupedBlogs.push(this.eventos.slice(i, i + 2));
				}
			},

			formatDate(dateStr){
				const date = new Date(dateStr);
				const options = { day: "2-digit", month: "short", year: "numeric" };
				return date.toLocaleDateString("pt-BR", options);
			},

			irParaDetalhes(id){
				this.$router.push(`/evento/${id}`);
			},
		},
	};
</script>

<style scoped>
	.primary-text {
		color: var(--cor-primaria-100); /* ajuste conforme sua paleta */
	}

	.blog-info a {
		text-decoration: none;
		color: inherit;
	}

	.hover-shadow {
		transition: box-shadow 0.3s ease-in-out;
	}

	.hover-shadow:hover {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}
</style>
