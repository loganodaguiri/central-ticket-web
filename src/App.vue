<template>
	<v-app class="screen-size" :style="{cssColors}">
		<system-menu v-if="!isTelaPagamento && isUsuarioCadastrado"/>
		<PopupDeDivulgacao v-if="!isTelaPagamento && isUsuarioCadastrado"/>
		<v-main :style="vMainStyle">
			<router-view/>
		</v-main>
		<GlobalLoader />
	</v-app>
</template>

<script>
	import GlobalLoader from "@/components/GlobalLoader.vue";
	import { exibirMensagemErro, exibirMensagemInfo } from "@/util/MessageUtils.js";

	export default {
		name: "App",
		components: {
			GlobalLoader,
		},
	};
</script>

<style>
	.v-main__wrap{
		/* background: url("@/assets/background-home.png"); */
		/* background: url("@/assets/background-home-verde.png"); */
		/* background: url(var(--path-image)); */
		/* background-size: 100%; */
	}

	.screen-size {
		width: 100%;
		height: 100%;
		background-color: white;
	}

	.swal2-show{
		display:block!important;
	}

	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: var(--cor-secundaria-100);
		border-radius: 8px;
	}

	::-webkit-scrollbar-track {
		background: var(--cor-secundaria-200);
		border-radius: 8px;
	}

	.payment-info{
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
		color: var(--cor-primaria-100);
	}

	.swal2-header, .swal2-container, .swal2-actions{
		font-family:"Poppins";
	}
</style>
<style scoped>
	.v-application::v-deep{
		width: 100%;
		height: 100%;
		background-color: var(--cor-secundaria-100) !important;
	}

	.v-application::v-deep [class^="text-"]{
		font-family: 'Open Sans'!important;
		font-style: normal;
		color:black;
	}

	.v-application::v-deep .text-h4{
		font-weight: 400;
		font-size: 32px;
		line-height: 44px;
	}

	.v-application::v-deep .text-h5{
		font-weight: 600;
		font-size: 24px;
		line-height: 36px;
	}

	.v-application::v-deep .text-h6{
		font-weight: 600;
		font-size: 20px;
		line-height: 28px;
	}

	.v-application::v-deep .text-subtitle{
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
	}

	/*------------------------TABELA------------------------ */
	.v-application::v-deep	.simple-table > div{
	}

	.v-application::v-deep .simple-table table thead{
		background-color: var(--cor-secundaria-100);
	}

	.v-application::v-deep	.simple-table table thead tr th{
		height: 32px!important;
		color: white !important;
	}

	.v-application::v-deep	.simple-table table tbody tr td{
		padding: 12px 6px 12px 6px!important;
		border-bottom:1px solid var(--cor-terciaria-300)!important;
	}

	.v-application::v-deep .v-data-table .v-data-table__wrapper{
		border-top-right-radius: 5px ;
		border-top-left-radius: 5px ;
	}
	.v-application::v-deep .v-data-table table thead{
				background-color: var(--cor-secundaria-100);
	}
	.v-application::v-deep .v-data-table .v-data-table-header tr th {
		height: 32px !important;
		color: white !important;
		padding: 4px 6px!important;
	}
	.v-application::v-deep .v-data-table tbody tr td {
		padding: 12px 6px 12px 6px!important;
		border-bottom:1px solid var(--cor-terciaria-300)!important;
	}
	/*------------------------INPUTS------------------------ */

	.v-application::v-deep  .v-text-field--outlined:not(.v-text-field--rounded){
		border-radius:10px;
	}
</style>
