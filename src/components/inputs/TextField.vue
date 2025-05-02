<template>
	<input-label :label="label">
		<text-input v-bind="$attrs" v-on="$listeners">
			<template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
				<slot :name="name" v-bind="slotData"/>
			</template>
			<template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
				<slot :name="someOtherName"/>
			</template>
		</text-input>
	</input-label>
</template>

<script>
	import InputLabel from "@/components/inputs/InputLabel.vue";
	import TextInput from "@/components/inputs/TextInput.vue";

	export default {
		components: {
			InputLabel,
			TextInput,
		},
		props: {
			label: {
				required: false,
			},
		},
	};
</script>

<style>

</style>
