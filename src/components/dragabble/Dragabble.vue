<template>
	<v-container fluid justify-center>
		<v-row
			v-for="(item, i) in items"
			:key="i" >
			<v-col cols="12">
				<v-card color="primary" class="card-materias" dark rounded>
					<v-card-title>Nome matéria</v-card-title>
					<v-spacer/>
					<v-btn icon @click="action('edit')" v-if="!editing">
						<v-icon>{{"mdi-pencil" }}</v-icon>
					</v-btn>
					<v-btn icon @click="action('done')" v-if="editing">
						<v-icon>{{"mdi-checkbox-marked-circle" }}</v-icon>
					</v-btn>
					<v-btn icon @click="action('undo')" v-if="!editing">
						<v-icon>{{"mdi-undo" }}</v-icon>
					</v-btn>
				</v-card>
				<v-list
					v-for="(item, i) in items"
					:key="i"
					>
					<v-list-item-group v-model="selectedItem" color="primary">
						<v-list-item @click="clickListItem(i)">
							<v-list-item-icon>
								<v-icon v-text="item?.icon"/>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-text="item.Title"/>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
					<v-card class="card-conteudos">
						<v-row>
							<v-col align-self="center"><v-checkbox label="Estudo teórico"/></v-col>
							<v-col align-self="center"><v-checkbox label="Resolução de questão"/></v-col>
							<v-col align-self="center"><v-checkbox label="Revisão"/></v-col>
						</v-row>
						<v-row>
							<v-col>
								<h2>Livros:</h2>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<h2>Observações</h2>
								<v-textarea outlined/>
							</v-col>
						</v-row>
					</v-card>
				</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: "Dragabble",
		data(){
			return {
				before: null,
				editing: false,
				selectedItem: undefined,
				items: [
					{
						ID: 1, Title: "Nome conteúdo", Ordering: 1, Subtitle: "", icon: "mdi-reorder-horizontal", exibirConteudo: false,
					},
					{
						ID: 2, Title: "Nome conteúdo", Ordering: 2, Subtitle: "(for campaigns, campaign products, and/or videos)", icon: "mdi-reorder-horizontal",
					},
					{
						ID: 3, Title: "Nome conteúdo", Ordering: 3, Subtitle: "", icon: "mdi-reorder-horizontal",
					},
					{
						ID: 4, Title: "Nome conteúdo", Ordering: 4, Subtitle: "(internal or external)", icon: "mdi-reorder-horizontal",
					},
					{
						ID: 5, Title: "Nome conteúdo", Ordering: 5, Subtitle: "", icon: "mdi-reorder-horizontal",
					},
				],
			};
		},
		computed: {
			options(){
				return {
					disabled: !this.editing,
				};
			},
			exibirConteudo(){
				return this.items.exibirConteudo;
			},
		},
		methods: {
			action(e){
				if(e === "edit") this.before = Object.assign([], this.items);
				if(e === "undo") this.items = this.before;
				this.editing = !this.editing;
			},
			remove(i){
				this.$delete(this.items, i);
			},
			clickListItem(index){
				this.items[0].exibirConteudo = !this.items[0].exibirConteudo;
			},
		},
	};
</script>

<style scoped>
	* >>> .card-materias{
		display:flex !important;
		align-items: center !important;
		border-radius: 30px !important;
	}
	* >>> .card-conteudos{
		padding: 8px 67px;
		background-color: var(--surface) !important;
	}
	* >>> .v-label{
		color: #000000DE !important;
		font-size: 1.5em;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold !important;
	}
</style>
