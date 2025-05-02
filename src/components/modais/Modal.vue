<template>
	<v-dialog
		v-model="open"
		:max-width=" tamanho ? tamanho : '986' "
		>
		<v-sheet>
			<v-container class="py-8">
				<v-row :justify="justificar ? justificar: 'space-between' " align="center" class="mb-4">
					<v-col cols="auto">
						<span class="text-h5" v-if="title">{{title}}</span>
					</v-col>
					<v-col cols="auto" v-if="esconderIconeFechamento == true ? false : true">
						<v-btn icon small @click="hide()" color="red"><v-icon>mdi-close</v-icon></v-btn>
					</v-col>
				</v-row>
				<slot />
			</v-container>
		</v-sheet>
	</v-dialog>
</template>

<script>
	export default {
		name: "Modal",
		props: {
			title: String,
			tamanho: Number,
			justificar: String,
			esconderIconeFechamento: Boolean,
		},
		data(){
			return {
				open: false,
			};
		},
		methods: {
			show(){
				this.open = true;
			},
			hide(){
				this.open = false;
			},
			toggle(valor = null){
				if(typeof value == "boolean"){
					this.open = valor;
				}
				else{
					this.open = !this.open;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
.text-h5 {
	font-size: 30px;
	font-family:'Times New Roman';
}
</style>
