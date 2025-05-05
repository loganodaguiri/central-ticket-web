<template>
	<div class="wrapper">
		<v-app-bar
			absolute
			color="background"
			height="98px"
			elevation="0"
			class="navbar"
			>
			<v-app-bar-nav-icon
				class="ml-10"
				v-if="$vuetify.breakpoint.smAndDown"
				color="#231125"
				@click.stop="drawerMobile = !drawerMobile"
				/>
			<v-img
				class="logo"
				v-bind:class="{'ml-15':$vuetify.breakpoint.smAndDown}"
				responsive
				contain
				height="100%"
				max-width="185"
				:src="LogoHorizontal" />
			<v-spacer/>
			<v-tabs
				hide-slider
				v-if="$vuetify.breakpoint.mdAndUp"
				centered
				>
				<v-tab
					v-for="link in recuperaLinks()"
					:key="link.titulo"
					@click="tabClick(link)"
					>
					<template v-if="link.exibir == null || link.exibir == true">
						{{ link.titulo }}
					</template>
				</v-tab>
			</v-tabs>

			<!-- Ícone do Perfil -->
			<div v-if="$vuetify.breakpoint.mdAndUp && tokenLogando" style="display: flex; align-items: center;">
				<div @click.stop="togglePerfilDropdown" style="display: flex; align-items: center; cursor: pointer;">
					<v-icon size="36">mdi-account-circle</v-icon>
					<v-icon>mdi-chevron-down</v-icon>
				</div>

				<!-- Dropdown de Perfil -->
				<div
					v-if="mostrarPerfilDropdown"
					style="position: absolute; top: 100%; right: 0; background: white; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0,0,0,0.1); margin-top: 8px; z-index: 1000;"
					>
					<ul style="list-style: none; margin: 0; padding: 8px 0;">
						<li
							v-for="link in linksPerfil"
							:key="link.titulo"
							@click="tabClick(link)"
							style="padding: 10px 20px; cursor: pointer;"
							>
							{{ link.titulo }}
						</li>
					</ul>
				</div>
			</div>
		</v-app-bar>

		<div @click="drawerMobile = false">
			<v-navigation-drawer
				class="mobile-nav"
				v-model="drawerMobile"
				bottom
				v-if="$vuetify.breakpoint.smAndDown"
				fixed
				hide-overlay
				>
				<ul style="list-style-type: none; padding: 5px 5px;">
					<li
						style="padding: 5px 5px; font-weight: 600;"
						v-for="link in recuperaLinks()"
						:key="link.titulo"
						@click="tabClick(link)"
						>
						<a>
							{{ link.titulo }}
						</a>
						<v-divider />
					</li>
				</ul>
			</v-navigation-drawer>
		</div>

		<v-dialog v-model="showCadastroModal">
			<v-card style="width: 500px">
				<v-card-title class="headline">Cadastro</v-card-title>
				<v-card-text>
					<v-text-field label="Nome" v-model="cadastroForm.name" />
					<v-text-field label="Email" v-model="cadastroForm.email" type="email" />
					<v-text-field label="Senha" v-model="cadastroForm.password" type="password" />
					<v-text-field label="Confirmar Senha" v-model="cadastroForm.confirmPassword" type="password" />
					<v-text-field label="Telefone" v-model="cadastroForm.phone" />
					<v-text-field label="Data de Nascimento" v-model="cadastroForm.birth" type="date" />
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn text @click="showCadastroModal = false">Cancelar</v-btn>
					<v-btn color="primary" @click="cadastroUsuario">Cadastrar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="showLoginModal">
			<v-card style="width: 500px">
				<v-card-title class="headline">Login</v-card-title>
				<v-card-text>
					<v-text-field label="Email" v-model="loginForm.email" type="email" />
					<v-text-field label="Senha" v-model="loginForm.password" type="password" />
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn text @click="showLoginModal = false">Cancelar</v-btn>
					<v-btn color="primary" @click="loginUsuario">Fazer Login</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>

	import Vue from "vue";
	import LogoHorizontal from "@/assets/logo-horizontal.png";
	import { exibirMensagemErroApi, exibirMensagemSucesso, exibirMensagemAtencao } from "@/util/MessageUtils.js";
	import { cadastroUsuario, loginUsuario } from "@/services/User.js";

	export default {
		name: "AppBar",

		created(){
			this.tokenLogando = localStorage.getItem("authToken");
		},

		data(){
			return {
				LogoHorizontal,
				drawerMobile: false,
				colors: [
					"primary",
					"secondary",
					"yellow darken-2",
					"red",
					"orange",
				],
				showModal: false,
				showCadastroModal: false,
				showLoginModal: false,
				loginForm: {
					email: "",
					password: "",
				},
				cadastroForm: {
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
					phone: "",
					birth: "",
				},
				tokenLogando: null,
				mostrarPerfilDropdown: false,
			};
		},
		computed: {
			isTelaPequena(){
				if(this.$vuetify.breakpoint.name === "sm"){
					return true;
				}
				if(this.$vuetify.breakpoint.name === "xs"){
					return true;
				}
				return false;
			},

			links(){
				return [
					{
						titulo: "Página Inicial",
						href: "paginaInicial",
					},
					{
						titulo: "Contato",
						href: "contato",
					},
					{
						titulo: "LOGIN",
						href: "login",
						exibir: this.tokenLogando == null,
					},
					{
						titulo: "CADASTRO",
						href: "cadastro",
						exibir: this.tokenLogando == null,
					},
				];
			},
			linksPerfil(){
				return [
					{ titulo: "Meu Perfil", href: "meuPerfil" },
					{ titulo: "Meus Eventos", href: "meusEventos" },
					{ titulo: "Meus Ingressos", href: "meusIngressos" },
					{ titulo: "Sair", href: "logout" },
				];
			},
		},
		methods: {
			abrirLoginModal(){
				this.showLoginModal = true;
			},

			abrirLink(url){
				const win = window.open(url, "_blank");
				win.focus();
			},

			tabClick(item){
				if(item.titulo === "CADASTRO"){
					this.showCadastroModal = true;
				}
				if(item.titulo === "LOGIN"){
					this.showLoginModal = true;
				}
				if(item.titulo === "Contato"){
					this.$router.push("/contato");
				}
				if(item.titulo === "Página Inicial"){
					if(this.$route.path !== "/"){
						this.$router.push("/");
					}
				}
				if(item.titulo === "Sair"){
					this.fazerLogout();
				}
				if(item.titulo === "Meu Perfil"){
					this.$router.push("/meus-dados");
				}
				if(item.titulo === "Meus Ingressos"){
					this.$router.push("/meus-ingressos");
				}
			},

			fazerLogout(){
				this.$authToken = null;
				localStorage.removeItem("authToken");
				window.location.reload();
			},

			recuperaLinks(){
				const linksVisiveis = [];
				this.links.forEach((item) => {
					if(item.exibir == null || item.exibir == true){
						linksVisiveis.push(item);
					}
				});
				return linksVisiveis;
			},

			togglePerfilDropdown(){
				this.mostrarPerfilDropdown = !this.mostrarPerfilDropdown;
			},

			cadastroUsuario(){
				this.$carregando();
				cadastroUsuario(this.cadastroForm)
					.then((res) => {
						exibirMensagemSucesso("Usuario Cadastrado com sucesso");
						this.showCadastroModal = false;
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao cadastrar o usuario. Tente novamente mais tarde.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},

			loginUsuario(){
				this.$carregando();
				loginUsuario(this.loginForm)
					.then((res) => {
						const { token, usuario_id: userId } = res.data;
						this.$authToken = token;
						localStorage.setItem("authToken", token);

						this.$authuserId = userId;
						localStorage.setItem("authuserId", userId);

						exibirMensagemSucesso("Bem vindo!!!");
						window.location.reload();
						this.showLoginModal = false;
					}).catch((error) => {
						exibirMensagemErroApi("Erro ao fazer login.");
					})
					.finally(() => {
						this.$finalizarCarregando();
					});
			},
		},
	};

</script>

<style scoped>

	.logo::v-deep{
		margin-left:95px;
	}

	div::v-deep.wrapper{
		background:#FFEEFC;
		overflow-x:hidden;
	}

	.navbar::v-deep .v-tabs{
		flex:  unset!important;
		width: unset!important;
		margin-right: 60px!important;
	}

	.navbar::v-deep .v-tabs .v-tab{
    padding: 0 25px;
		color:var(--azul)!important;
	}

</style>
