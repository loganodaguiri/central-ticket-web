<template>
	<text-field-simple-mask
		mask="###.###.###-##"
		:value="value"
		@input="$emit('input', $event)"
		v-on="$listeners"
		v-bind="$attrs"/>
</template>

<script>
	export default {
		name: "CPF",
		props: {
			value: {
				type: String,
			},
		},
	};
</script>
