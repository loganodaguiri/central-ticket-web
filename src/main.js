import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AutoNumericVue from "autonumeric-vue/src/components/AutoNumericVue";
import ElementUI from "element-ui";
import JwPagination from "jw-vue-pagination";
import { VueMaskDirective } from "v-mask";
import VueCountdown from "@chenfengyuan/vue-countdown";
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import VueCookie from "vue-cookie";
import VueDateFns from "vue-date-fns";
import feather from "vue-icon";
import VModal from "vue-js-modal";
import { VueRecaptcha } from "vue-recaptcha";
import VueSweetalert2 from "vue-sweetalert2";
import VueTheMask from "vue-the-mask";
import VuetifyMask from "vuetify-mask-with-slots";
import ModalOk from "@/components/modais/ModalOk.vue";
import ModalConfirmacao from "@/components/modais/ModalConfirmacao.vue";
import ModalAlerta from "@/components/modais/ModalAlerta.vue";
import Modal from "@/components/modais/Modal.vue";
import TextFieldSimpleMask from "@/components/inputs/TextFieldSimpleMask.vue";
import TextField from "@/components/inputs/TextField.vue";
import ComboBox from "@/components/inputs/ComboBox.vue";
import ButtonDefault from "@/components/buttons/ButtonDefault.vue";
import App from "./App.vue";
import authentication from "./plugins/authentication.js";
import prototypes from "./plugins/prototypes.js";
import vuetify from "./plugins/vuetify.js";
import router from "./router/router.js";
import store from "./store/index.js";

import "element-ui/lib/theme-chalk/index.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "tiptap-vuetify/dist/main.css";
import "vue-search-select/dist/VueSearchSelect.css";
import "vuetify/dist/vuetify.min.css";
import "./styles/main.css";

library.add(faUserSecret);

Vue.use(authentication);
Vue.use(VueDateFns);
Vue.use(VueApexCharts);
Vue.use(VueTheMask);
Vue.use(VuetifyMask);
Vue.use(VModal);
Vue.use(feather, "feather-icon");
Vue.use(VueSweetalert2);
Vue.use(VueCookie);
Vue.use(ElementUI);

Vue.directive("mask", VueMaskDirective);
Vue.component("apexchart", VueApexCharts);
Vue.component("jw-pagination", JwPagination);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("a-btn", ButtonDefault);
Vue.component("combo-box", ComboBox);
Vue.component("text-field", TextField);
Vue.component("text-field-simple-mask", TextFieldSimpleMask);
Vue.component("ModalConfirmacao", ModalConfirmacao);
Vue.component("ModalAlerta", ModalAlerta);
Vue.component("ModalOk", ModalOk);
Vue.component("modal", Modal);
Vue.component("auto-numeric", AutoNumericVue);
Vue.component("vue-recaptcha", VueRecaptcha);
Vue.component(VueCountdown.name, VueCountdown);
Object.assign(Vue.prototype, prototypes);

Vue.config.productionTip = false;

const tokenSalvo = localStorage.getItem("authToken");
Vue.prototype.$authToken = tokenSalvo;

const userIdSalvo = localStorage.getItem("authuserId");
Vue.prototype.$authuserId = userIdSalvo;

Vue.$keycloak.init({ checkLoginIframe: false }).then((auth) => {
	if(auth){
		store.dispatch("usuario/carregarUsuarioLogado");
	}
	new Vue({
		router,
		store,
		vuetify,
		library,
		FontAwesomeIcon,
		render: (h) => h(App, { props: { keycloak: Vue.$keycloak } }),
	}).$mount("#app");
}).catch(() => {
	console.error("Failed to authenticate");
});
