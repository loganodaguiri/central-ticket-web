import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import pt from "vuetify/src/locale/pt.ts";

const icones = {};
const aprovei_concurso = {
	primary: "#447C4F",
	secondary: "#1E7D73",
	"cor-branca": "#FFFFFF",
	"cor-preta": "#000000",
	"cor-amarela": "#EFBB3A",
	"cor-btn-comprar": "#76D2C9",
	"cor-btn-pesquisar": "#1E7D73",
	"cor-barra-navegacao": "#1E7D73",
	"cor-cabecalho-caderno": "#95C7C1",
	"cor-meusebooks": "#1E7D73",
	"cor-btn-card-ebooks": "#76D2C9",
	"cor-landing-txt": "#1E7D73",
	"cor-landingfun-bgexterno": "#84CC93",
	"cor-landingfun-bginterno": "#E9F2F1",
	"cor-landing-bgsurface": "#1E7D73",
	"cor-txt-ebooks": "#144D47",
	"cor-primaria-100": "#447C4F",
	"cor-primaria-200": "#419652",
	"cor-primaria-300": "#052F0D",
	"cor-secundaria-100": "#1E7D73",
	"cor-secundaria-200": "#95C7C1",
	"cor-secundaria-300": "#144D47",
	"cor-terciaria-100": "#84CC93",
	"cor-terciaria-200": "#498C57",
	"cor-terciaria-300": "#1D3823",
	error: "#AE2424",
	danger: "#AE2424",
	dangerLight: "#ae242429",
	success: "#60B04C",
	successLight: "#60b04c29",
	warning: "#E9D843",
	info: "#66E5C7",
	surface: "#E9F2F1",
	background: "#FFFFFF",
	azul: "#0281AE",
};

const aprovei_residencia = {
	primary: "#231125",
	secondary: "#592E51",
	"cor-branca": "#FFFFFF",
	"cor-preta": "#000000",
	"cor-amarela": "#EFBB3A",
	"cor-btn-comprar": "#EFBB3A",
	"cor-btn-pesquisar": "#7C5980",
	"cor-barra-navegacao": "#592E51",
	"cor-cabecalho-caderno": "#7C5980",
	"cor-meusebooks": "#7C5980",
	"cor-btn-card-ebooks": "#EFBB3A",
	"cor-landing-txt": "#7E236D",
	"cor-txt-ebooks": "#592E51",
	"cor-landingfun-bgexterno": "#CEBBCE",
	"cor-landingfun-bginterno": "#DFD3E4",
	"cor-landing-bgsurface": "#37133B",
	"cor-primaria-100": "#231125",
	"cor-primaria-200": "#7C5980",
	"cor-primaria-300": "#0C060D",
	"cor-secundaria-100": "#592E51",
	"cor-secundaria-200": "#998A96",
	"cor-secundaria-300": "#331A2E",
	"cor-terciaria-100": "#1E1E1E",
	"cor-terciaria-200": "#807D7D",
	"cor-terciaria-300": "#000000",
	error: "#AE2424",
	dangerLight: "#ae242429",
	danger: "#AE2424",
	success: "#60B04C",
	successLight: "#60b04c29",
	warning: "#E9D843",
	info: "#66E5C7",
	surface: "#FFEEFC",
	background: "#FFFFFF",
	azul: "#0281AE",
};

const vuetify = new Vuetify({
	lang: { locales: { ptbr: pt }, current: "ptbr" },
	theme: {
		defaultTheme: "light",
		themes: {
			light: {
				aprovei_residencia,
				aprovei_concurso,
			},
			dark: {
				primary: "#231125",
				secondary: "#592E51",
				"cor-branca": "#FFFFFF",
				"cor-primaria-100": "#231125",
				"cor-primaria-200": "#7C5980",
				"cor-primaria-300": "#0C060D",
				"cor-secundaria-100": "#592E51",
				"cor-secundaria-200": "#998A96",
				"cor-secundaria-300": "#331A2E",
				"cor-terciaria-100": "#1E1E1E",
				"cor-terciaria-200": "#807D7D",
				"cor-terciaria-300": "#000000",
				error: "#AE2424",
				danger: "#AE2424",
				dangerLight: "#ae242429",
				success: "#60B04C",
				successLight: "#60b04c29",
				warning: "#E9D843",
				info: "#66E5C7",
				surface: "#FFEEFC",
				background: "#FFFFFF",
				azul: "#0281AE",
			},

		},
	},
	icons: {
		values: icones,
	},
});

Vue.use(Vuetify);

Vue.use(TiptapVuetifyPlugin, {
	// the next line is important! You need to provide the Vuetify Object to this place.
	vuetify, // same as "vuetify: vuetify"
	// optional, default to 'md' (default vuetify icons before v2.0.0)
	// iconsGroup: "mdi",
});

export default vuetify;
