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

Vue.use(VueRouter);

const routes = [
	{
		path: "/", name: "Index", component: LandingPage, alias: "/", meta: { isAuthenticated: false },
	},
	{
		path: "/contato", name: "Contato", component: Contato, alias: "/", meta: { isAuthenticated: false },
	},
	{
		path: "/cadastro-evento/:id?", name: "CadastroEvento", component: CadastroEvento, alias: "/", meta: { isAuthenticated: false },
	},
	{
		path: "/evento/:id?", name: "Evento", component: Evento, alias: "/", meta: { isAuthenticated: false },
	},
	{
		path: "/compra", name: "Evento", component: Compra, alias: "/", meta: { isAuthenticated: false },
	},
	{
		path: "/meus-dados", name: "MeusDados", component: MeusDados, alias: "/", meta: { isAuthenticated: false },
	},
	{
		path: "/meus-ingressos", name: "MeusIngressos", component: MeusIngressos, alias: "/", meta: { isAuthenticated: false },
	},
	{
		path: "/meus-eventos", name: "MeusEventos", component: MeusEventos, alias: "/", meta: { isAuthenticated: false },
	},
];

const router = new VueRouter({
	mode: "history",
	base: "/central-tiket/",
	routes,
});

export default router;
