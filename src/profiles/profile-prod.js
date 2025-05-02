import urlsApis from "@/profiles/profile-apis.js";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const config = {};
config.profile = process.env.VUE_APP_PROFILE;
config.apis = {};
config.apis.urls = {};

// Atribuir as urls para cada api antes de exportar
Object.entries(urlsApis).forEach(([chave, valor]) => {
	config.apis.urls[chave] = BASE_URL.concat(valor);
});
config.apis.urls.BASE_URL = BASE_URL;

export default config;
