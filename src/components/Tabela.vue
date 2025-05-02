<template>
	<v-row no-gutters>
		<v-col cols="12">
			<v-data-table
				:item-key="itemKey"
				loading-text="Carregando..."
				@page-count="pageCount=$event"
				:loading="loading"
				:disabled="disabled"
				:page.sync="page"
				:items-per-page="10"
				:headers="headersComputed"
				class="my-2"
				v-bind:class="{'row-pointer':rowPointer}"
				:footer-props="{disablePagination:loading || disabled, disableItensPerPage:loading || disabled, itemsPerPageOptions:itemsPerPageOptions}"
				v-on="$listeners"
				v-bind="$attrs"
				>
				<template v-slot:top>
					<span class="title">{{descricaoLista}} </span>
				</template>
				<template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
					<slot :name="name" v-bind="slotData"/>
				</template>
				<template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
					<slot :name="someOtherName"/>
				</template>
				<template v-slot:[`item.actions`]="{ item }">
					<v-tooltip bottom v-if="actionButtons && actionButtons.editar">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="error"
								x-small
								icon
								v-bind="attrs"
								v-on="on"
								:disabled="loading || disabled"
								@click.stop="$emit('editar', item)">
								<v-icon
									color="var(--cor-primaria-100)"
									>
									mdi-pencil
								</v-icon>
							</v-btn>
						</template>
						<span>Editar</span>
					</v-tooltip>
					<v-tooltip bottom v-if="actionButtons && actionButtons.excluir">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="error"
								x-small
								icon
								v-bind="attrs"
								v-on="on"
								:disabled="loading || disabled"
								@click.stop="$emit('delete', item)">
								<v-icon
									color="var(--cor-primaria-100)"
									>
									mdi-delete
								</v-icon>
							</v-btn>
						</template>
						<span>Excluir</span>
					</v-tooltip>
				</template>
			</v-data-table>
		</v-col>
	</v-row>
</template>
<script>

	export default {
		name: "Tabela",
		props: {
			loading: {
				default: false,
				required: false,
				type: Boolean,
			},
			disabled: {
				default: false,
				required: false,
				type: Boolean,
			},
			descricaoLista: {
				required: false,
			},
			headers: {
				required: false,
			},
			itemKey: {
				required: false,
				default: "index",
			},
			rowPointer: {
				required: false,
				default: false,
				type: Boolean,
			},
			actionButtons: {
				required: false,
				type: Object,
			},
		},
		data(){
			return {
				pageCount: 0,
				page: this.paginaAtual,
				itemsPerPageOptions: [
					10,
					15,
					20,
					50,
				],
			};
		},
		computed: {
			headersComputed(){
				return !this.actionButtons
					? this.headers
					:	[
						...this.headers,
						{
							text: "Ações",
							align: "center",
							width: "100",
							sortable: false,
							value: "actions",
						},
					];
			},
			lang(){
				return this.$vuetify.lang.current || undefined;
			},
		},
		watch: {
			paginaAtual(pagina){
				this.page = pagina;
			},
			page(pagina){
				this.$emit("update:paginaAtual", pagina);
				this.$emit("page-change", pagina);
				this.$emit("pesquisar-paginado", {
					paginaAtual: pagina,
				});
			},
		},
	};
</script>
<style scoped>
		.simple-table > div{
		}
		.simple-table table thead{
			background-color: var(--cor-secundaria-100);
		}
		.simple-table table thead tr th{
			height: 32px!important;
			color: white !important;
		}
		.simple-table table tbody tr td{
			padding: 12px 6px 12px 6px!important;
			border-bottom:1px solid var(--cor-terciaria-300)!important;
		}
* >>> .v-data-table .v-data-table__wrapper{
	border-top-right-radius: 5px ;
	border-top-left-radius: 5px ;
}
* >>> .v-data-table table thead{
			background-color: var(--cor-secundaria-100);
}
* >>> .v-data-table .v-data-table-header tr th {
  height: 32px !important;
	color: white !important;
	padding: 4px 6px!important;
}
* >>> .v-data-table tbody tr td {
	padding: 12px 6px 12px 6px!important;
	border-bottom:1px solid var(--cor-terciaria-300)!important;
}
</style>
