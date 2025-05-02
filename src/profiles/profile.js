/* eslint-disable global-require */
export const PROFILE = "prod";

export function getProfile(){
	return process.env.VUE_APP_PROFILE;
}

// eslint-disable-next-line import/no-dynamic-require
export const config = require(`./profile-${getProfile()}.js`).default;
