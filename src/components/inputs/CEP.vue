<template>
	<the-mask
		mask="##.###-###"
		v-model="cep"
		class="form-control mono"
		@change.native="selecionar()"
		:disabled="disabled"
		@keyup.enter.native="$emit('enter',$event)"
		@blur.native="$emit('blur',$event)"/>
</template>

<script>
	export default {
		name: "CEP",
		props: {
			value: {
				type: String,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data(){
			return {
				cep: null,
			};
		},
		watch: {
			value(){
				this.atualizar();
			},
		},
		created(){
			this.atualizar();
		},
		methods: {
			atualizar(){
				this.cep = this.value;
			},
			selecionar(){
				this.$emit("input", this.cep);
			},
			limpar(){
				this.cep = null;
				this.selecionar();
			},
		},
	};
</script>
