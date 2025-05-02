<template>
	<draggable
		class="draggable-component conteudos"
		tag="el-collapse"
		:list="list"
		:component-data="collapseComponentData"
		@change="updateChecklistItem($event)"
		>
		<el-collapse-item
			v-for="item in list"
			:key="item.id"
			:title="item.conteudoMateriaVO.conteudo.nome"
			:name="item.id"
			class="classTeste"
			@change="updateChecklistItem($event)"
			>

			<v-card  class="card-conteudos">
				<v-container fluid>
					<v-row class="d-flex justify-end">
						<v-col class="d-flex justify-end px-0">
							<a @click="redirecionaParaSimulados()" class="link">Visualizar questões desse conteúdo</a>
						</v-col>
					</v-row>
					<v-row align="center" justify="center">
						<v-col class="d-flex justify-center"> <v-checkbox v-model="item.estudoTeorico" label="Estudo teórico" @change="updateChecklistItem($event)"/> </v-col>
						<v-col class="d-flex justify-center"> <v-checkbox v-model="item.resolucaoQuestao" label="Resolução de questão" @change="updateChecklistItem($event)"/> </v-col>
						<v-col class="d-flex justify-center"> <v-checkbox v-model="item.revisao" label="Revisão" @change="updateChecklistItem($event)"/> </v-col>
					</v-row>
					<v-row class="d-flex justify-start pr-10 pl-10">
						<v-col	class="d-flex justify-start">
							<h2>Livros:</h2>
						</v-col>
					</v-row>
					<v-row class="d-flex justify-start pr-10 pl-10 pb-0">
						<v-col>
							<h2 class="d-flex justify-start">Observações</h2>
							<v-textarea v-model="item.observacoes" outlined @input="updateChecklistItem($event)"/>
						</v-col>
					</v-row>
					<v-row class="d-flex justify-end">
						<v-col cols="12" class="d-flex justify-end pr-12 pt-0">
							<a-btn buttonColor="primaria-100">Salvar observações</a-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</el-collapse-item>
	</draggable>
</template>

<script>
	import "element-ui/lib/theme-chalk/index.css";
	import draggable from "vuedraggable";
	import Filtros from "@/models/FiltroModel.js";

	export default {
		name: "DragabbleColapseConteudos",
		display: "Third party",
		order: 10,
		props: {
			list: {
				type: Array,
			},
		},
		components: {
			draggable,
		},
		data(){
			return {
				activeNames: [1],
				collapseComponentData: {
					on: {
						input: this.inputChanged,
					},
					props: {
						value: this.activeNames,
					},
				},
			};
		},
		computed: {
			computedStyleConteudo(){
				return "color:green!important";
			},
			styleListaConteudos(item){
				if(item.listaConteudo.estudoTeorico || item.listaConteudo.resolucaoQuestao || item.listaConteudo.revisao){
					return "color: green !important;";
				}
				if(item.listaConteudo.estudoTeorico && item.listaConteudo.resolucaoQuestao && item.listaConteudo.revisao){
					return "color: violet !important;";
				}
				return "color: grey !important;";
			},
		},
		methods: {
			inputChanged(val){
				this.activeNames = val;
			},
			redirecionaParaSimulados(){
				// this.$router.push("/simulados");
				const filtro = new Filtros();
				const paginacao = {
					size: 10,
					page: 0,
					totalPages: 0,
				};
				filtro.listaMateriaQuestao = [13];
				filtro.listaConteudoQuestao = [65];
				// this.$refs.simulados.buscarQuestoes();
				this.$router.push({ path: "/simulados", query: { filtro } });
			},
			updateChecklistItem(event, item){
				this.$emit("update-checklist");
			},
		},
		watch: {
			// list(newValue, oldValue){
			// 	this.$emit("update:checklistModel", "salvarAlteracoesChecklist");
			// },
		},
	};
</script>
<style scoped>
	.card-conteudos{
		border-radius: 20px !important;
	}

	.el-collapse.conteudos::v-deep .el-collapse-item__header{
		background-color: white !important;
		color: black !important;
		margin-left: 5px !important;
		border: none;
		padding-left: 10px;
		margin-bottom: 0px;
	}

	/*.el-collapse.conteudos::v-deep .el-collapse-item__header.is-active{
		color:green!important;
	}*/

	.classTeste{
		color:green!important;
	}

	.link{
		cursor: pointer;
		color: #000000DE !important;
		font-weight: bold !important;
		text-decoration: underline;
	}
	/*	border-radius: 20px;
		border-top: 1px solid #EBEEF5;
		border-right: 1px solid #EBEEF5;
		border-left: 1px solid #EBEEF5;
		*/
</style>
