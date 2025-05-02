<template>
	<!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
	<label >
		<span class="gray700--text font-weight-medium">
			{{label}}
		</span>
		<slot />
	</label>
</template>

<script>
	export default {
		name: "InputLabel",
		props: {
			label: {
				type: String,
			},
		},
	};
</script>

<style scoped>
label::v-deep > span {
	font-size: 16px;
}

</style>
