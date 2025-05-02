<template>
	<input-label :label="label">
		<v-text-field-simplemask
			outlined
			dense
			hide-details="auto"
			v-bind="$attrs"
			v-on="$listeners">
			<template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
				<slot :name="name" v-bind="slotData"/>
			</template>
			<template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
				<slot :name="someOtherName"/>
			</template>
		</v-text-field-simplemask>
	</input-label>
</template>

<script>
	import InputLabel from "@/components/inputs/InputLabel.vue";

	export default {
		components: {
			InputLabel,
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
