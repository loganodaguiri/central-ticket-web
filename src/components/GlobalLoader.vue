<template>
	<v-overlay
		opacity="0.8"
		z-index="10000"
		:value="exibirCarregando"
		>
		<v-row
			align="center"
			justify="center"
			>
			<v-col cols="auto">
				<v-progress-circular
					indeterminate
					color="white"
					size="75"
					width="8"
					/>
			</v-col>
			<v-col cols="12" />
			<v-col cols="auto">
				{{carregandoMsg}}
			</v-col>
		</v-row>
	</v-overlay>
</template>

<script>
	export default {
		name: "GlobalLoader",
		computed: {
			carregando(){
				return this.$store.state.carregamento.carregando;
			},
			exibirCarregando(){
				return this.carregando?.length > 0;
			},
			carregandoMsg(){
				if(this.exibirCarregando){
					return this.carregando[this.carregando.length - 1];
				}
				return "...";
			},
		},
	};
</script>

<style>
</style>
