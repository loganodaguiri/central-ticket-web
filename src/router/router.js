import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import Contato from "@/views/Contato.vue";
import CadastroEvento from "@/views/CadastroEvento.vue";
import Evento from "@/views/Evento.vue";
import Compra from "@/views/Compra.vue";
import MeusDados from "@/views/MeuDados.vue";
import MeusIngressos from "@/views/MeusIngressos.vue";
import MeusEventos from "@/views/MeusEventos.vue";
import Dashboard from "@/views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "LandingPage",
		component: LandingPage,
		meta: { isAuthenticated: false },
	},
	{
		path: "/home",
		name: "Home",
		component: LandingPage,
		meta: { isAuthenticated: false },
	},
	{
		path: "/contato",
		name: "Contato",
		component: Contato,
		meta: { isAuthenticated: false },
	},
	{
		path: "/cadastro-evento/:id?",
		name: "CadastroEvento",
		component: CadastroEvento,
		meta: { isAuthenticated: false },
	},
	{
		path: "/evento/:id?",
		name: "Evento",
		component: Evento,
		meta: { isAuthenticated: false },
	},
	{
		path: "/compra",
		name: "Compra",
		component: Compra,
		meta: { isAuthenticated: false },
	},
	{
		path: "/meus-dados",
		name: "MeusDados",
		component: MeusDados,
		meta: { isAuthenticated: false },
	},
	{
		path: "/meus-ingressos",
		name: "MeusIngressos",
		component: MeusIngressos,
		meta: { isAuthenticated: false },
	},
	{
		path: "/meus-eventos",
		name: "MeusEventos",
		component: MeusEventos,
		meta: { isAuthenticated: false },
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
		meta: { isAuthenticated: false },
	},
];

const router = new VueRouter({
	mode: "history",
	base: "/", // aqui é importante deixar "/" para funcionar na raiz do domínio
	routes,
});

export default router;
