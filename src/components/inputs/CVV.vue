<template>
	<text-field-simple-mask
		mask="###"
		:value="value"
		@input="$emit('input', $event)"
		v-on="$listeners"
		v-bind="$attrs"
		/>
</template>

<script>
	export default {
		name: "CVV",
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
				cvv: undefined,
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
				this.cvv = this.value;
			},
			selecionar(){
				if(this.cvv != this.value){
					this.$emit("input", this.cvv);
				}
			},
			limpar(){
				this.cvv = null;
				this.selecionar();
			},
		},
	};
</script>
