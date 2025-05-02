module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/essential",
		"@vue/airbnb",
	],
	parserOptions: {
		parser: "babel-eslint",
	},
	rules: {
		"no-restricted-imports": ["error", {
			patterns: [".*.js", ".*.vue"],
		}],
		"no-undef": "error",
		"no-extra-boolean-cast": "error",
		"no-multi-spaces": ["warn", { exceptions: { Property: true, ImportDeclaration: true } }],
		"no-restricted-syntax": ["off", "ForOfStatement"],
		"brace-style": ["error", "stroustrup"],
		"space-before-blocks": ["error", "never"],
		"no-param-reassign": ["error", { props: false }],
		"keyword-spacing": ["error", {
			overrides: {
				if: { after: false },
				else: { after: false },
				for: { after: false },
				while: { after: false },
				static: { after: false },
			},
		}],
		"linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
		camelcase: "off",
		"no-underscore-dangle": "off",
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-tabs": 0,
		"prefer-destructuring": ["error", {
			object: true,
			array: false,
		}],
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"vue/html-indent": ["error", "tab", {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 1,
			alignAttributesVertically: true,
			ignores: [],
		}],
		"vue/html-self-closing": ["error", {
			html: {
				void: "always",
				normal: "always",
				component: "always",
			},
			svg: "always",
			math: "always",
		}],
		"vue/max-attributes-per-line": ["error", {
			singleline: 5,
			multiline: {
				max: 1,
				allowFirstLine: false,
			},
		}],
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		"vue/script-indent": ["error", "tab", {
			baseIndent: 1,
			switchCase: 1,
			ignores: [],
		}],
		"space-before-function-paren": ["error", "never"],
		"vue/singleline-html-element-content-newline": "off",
		"max-len": "off",
		eqeqeq: "off",
		"import/prefer-default-export": "off",
		"vue/max-len": ["error", {
			code: 200,
			comments: 9000,
			template: 9000,
			ignoreTemplateLiterals: true,
			ignoreUrls: true,
			ignoreStrings: true,
		}],
		"no-unused-vars": "off",
	},
	overrides: [
		{
			files: ["*.vue"],
			rules: {
				indent: "off",
			},
		},
	],
};
