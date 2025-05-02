const BASE_URL = process.env.VUE_APP_BASE_URL;
const config = {};
config.profile = process.env.VUE_APP_PROFILE;
config.apis = {};
config.apis.urls = {
	BASE_URL,
	API_CONSULTA_ENTIDADE_APROVEI: `${BASE_URL}/api-consulta-entidade-aprovei/consulta/entidade/aprovei`,
	// API_APROVEI: `${BASE_URL}/api-aprovei`,
	API_APROVEI: "http://localhost:8192/api-aprovei",
};

console.warn(process.env.VUE_APP_PROFILE);

export default config;
