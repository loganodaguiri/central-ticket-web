<template>
	<v-text-field
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
	</v-text-field>
</template>

<script>
	export default {
		name: "TextInput",
	};
</script>

<style scoped>
</style>
