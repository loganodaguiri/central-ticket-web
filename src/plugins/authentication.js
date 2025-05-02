/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
import Vue from "vue";
import Keycloak from "keycloak-js";

const options = {
	url: `${process.env.VUE_APP_BASE_URL_KEYCLOAK}`,
	realm: process.env.VUE_APP_REALM,
	clientId: process.env.VUE_APP_CLIENT_ID,
	onLoad: "login-required",
	timeSkew: 5,
};

const _keycloak = Keycloak(options);

const Plugin = {
	install(Vue){
		Vue.$keycloak = _keycloak;
	},
};

Plugin.install = (Vue) => {
	Vue.$keycloak = _keycloak;
	Object.defineProperties(Vue.prototype, {
		$keycloak: {
			get(){
				return _keycloak;
			},
		},
	});
};

Vue.use(Plugin);

export default Plugin;
