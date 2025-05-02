<template>
	<div class="row">
		<!-- <div class="col-2">
			<div class="form-group">
				<div
					class="btn-group-vertical buttons"
					role="group"
					aria-label="Basic example"
					>
					<button class="btn btn-secondary" @click="add">Add</button>
					<button class="btn btn-secondary" @click="replace">Replace</button>
				</div>

				<div class="form-check">
					<input
						id="disabled"
						type="checkbox"
						v-model="enabled"
						class="form-check-input"
						/>
					<label class="form-check-label" for="disabled">DnD enabled</label>
				</div>
			</div>
		</div> -->

		<div class="col-6">
			<h3>Draggable {{ draggingInfo }}</h3>

			<draggable
				:list="list"
				:disabled="!enabled"
				class="list-group"
				ghost-class="ghost"
				:move="checkMove"
				@start="dragging = true"
				@end="dragging = false"
				>
				<div
					class="list-group-item"
					v-for="element in list"
					:key="element.name"
					>
					{{ element.name }}
				</div>
			</draggable>
		</div>

		<v-card
			color="primary"
			class="card-materias"
			dark
			rounded>
			<v-card-title>{{ list.name}} </v-card-title>
			<v-spacer/>
			<v-btn icon @click="action('edit')" >
				<v-icon>{{"mdi-pencil" }}</v-icon>
			</v-btn>
			<v-btn icon @click="action('done')" >
				<v-icon>{{"mdi-checkbox-marked-circle" }}</v-icon>
			</v-btn>
			<v-btn icon @click="action('undo')" >
				<v-icon>{{"mdi-undo" }}</v-icon>
			</v-btn>
			<!-- <DragabbleColapseConteudos :list="listConteudos"/> -->
		</v-card>
		<v-card  class="card-conteudos">
			<v-row>
				<v-col align-self="center"> <v-checkbox label="Estudo teórico"/> </v-col>
				<v-col align-self="center"> <v-checkbox label="Resolução de questão"/> </v-col>
				<v-col align-self="center"> <v-checkbox label="Revisão"/> </v-col>
			</v-row>
			<v-row>
				<v-col>
					<h2>Livros:</h2>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<h2>Observações</h2>
					<v-textarea outlined/>
				</v-col>
			</v-row>
		</v-card>

	</div>
</template>

<script>
	import draggable from "vuedraggable";

	let id = 1;
	export default {
		name: "simple",
		display: "Simple",
		order: 0,
		components: {
			draggable,
		},
		data(){
			return {
				enabled: true,
				list: [
					{ name: "CONTEUDO 1", id: 0 },
					{ name: "CONTEUDO 2", id: 1 },
					{ name: "CONTEUDO 3", id: 2 },
				],
				dragging: false,
			};
		},
		computed: {
			draggingInfo(){
				return this.dragging ? "under drag" : "";
			},
		},
		methods: {
			add(){
				this.list.push({ name: `Juan ${id}`, id: id += id });
			},
			replace(){
				this.list = [{ name: "Edgard", id: id += id }];
			},
			checkMove(e){
				window.console.log(`Future index: ${e.draggedContext.futureIndex}`);
			},
		},
	};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
