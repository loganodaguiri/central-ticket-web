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
	},
	{
		path: "/home",
		name: "Home",
		component: LandingPage,
	},
	{
		path: "/contato",
		name: "Contato",
		component: Contato,
	},
	{
		path: "/cadastro-evento/:id?",
		name: "CadastroEvento",
		component: CadastroEvento,
	},
	{
		path: "/evento/:id?",
		name: "Evento",
		component: Evento,
	},
	{
		path: "/compra",
		name: "Compra",
		component: Compra,
	},
	{
		path: "/meus-dados",
		name: "MeusDados",
		component: MeusDados,
	},
	{
		path: "/meus-ingressos",
		name: "MeusIngressos",
		component: MeusIngressos,
	},
	{
		path: "/meus-eventos",
		name: "MeusEventos",
		component: MeusEventos,
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
	},
];

const router = new VueRouter({
	mode: "history",
	base: "/", // aqui é importante deixar "/" para funcionar na raiz do domínio
	routes,
});

export default router;
