<template>
	<section class="section-margin">
		<div class="container">
			<div class="section-intro text-center pb-98px">
				<h2 class="primary-text">DESTAQUES</h2>
				<img src="" alt="" />
			</div>

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
							v-for="(blog, subIndex) in group"
							:key="subIndex"
							cols="12"
							sm="6"
							class="d-flex justify-center"
							>
							<v-card class="ma-2" max-width="500">
								<v-card-text>
									<a :href="blog.link">
										<h3 class="primary--text mb-2">{{ blog.title }}</h3>
									</a>
									<ul class="blog-info pa-0" style="list-style: none;">
										<li class="mb-1">
											<a :href="blog.commentsLink">
												<v-icon small class="mr-1">mdi-comment</v-icon> {{ blog.date }}
											</a>
										</li>
										<li>
											<a :href="blog.timeLink">
												<v-icon small class="mr-1">mdi-clock-outline</v-icon> {{ blog.time }}
											</a>
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
	export default {
		name: "BlogCarousel",
		data(){
			return {
				blogs: [
					{
						img: "img/blog/blog1.jpg",
						title: "Bloco eletrônico SÓ TRACK BOA",
						date: "16 Fev, 2020/SP",
						time: "14h ás 19h",
						commentsLink: "#",
						timeLink: "#",
						link: "#",
					},
					{
						img: "img/blog/blog2.png",
						title: "Planeta Brasil 2020",
						date: "25 Jan, 2020/ Belo Horizonte",
						time: "12h ás 03h",
						commentsLink: "#",
						timeLink: "#",
						link: "#",
					},
					{
						img: "img/blog/blog3.png",
						title: "Carnaval do Bem",
						date: "23 Fev, 2020/Belo Horizonte",
						time: "21h ás 04h",
						commentsLink: "#",
						timeLink: "#",
						link: "#",
					},
					{
						img: "img/blog/blog4.png",
						title: "Rock in Rio",
						date: "27 de set. de 2020 – 6 de out. de 2020",
						time: "Vários dias",
						commentsLink: "#",
						timeLink: "#",
						link: "#",
					},
				],
			};
		},
		computed: {
			groupedBlogs(){
				const groups = [];
				for(let i = 0; i < this.blogs.length; i += 2){
					groups.push(this.blogs.slice(i, i + 2));
				}
				return groups;
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
</style>
