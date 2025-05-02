<script>
	export default {
		name: "ConfigPlataforma",

		created(){
			this.verificaRedirecionamentoPlataforma();
		},
		methods: {
			verificaRedirecionamentoPlataforma(){
				if(this.$route.params.idPlataforma == 2){
					this.$store.dispatch("estadoNavegacao/setPlataforma", 2);
					this.settarTemaPlataforma(2);
					this.$router.push("/home-concurso");
				}
				else{
					this.$store.dispatch("estadoNavegacao/setPlataforma", 1);
					this.settarTemaPlataforma(1);
					this.$router.push("/home");
				}
			},
			settarTemaPlataforma(idPlataforma){
				this.$store.dispatch("tema/carregarTemaSelecionado", idPlataforma);
			},
		},
	};

</script>
