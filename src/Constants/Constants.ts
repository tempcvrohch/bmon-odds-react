import { Configuration } from '../openapi/runtime.js'

// @ts-expect-error vite imports the envfile
const envFile  = import.meta.env;
console.log(envFile);
export const OPEN_API_CONF = new Configuration({basePath: envFile.VITE_BMON_BACKEND_URL })
export const VERSION = '0.1';
export const API_PORT = 8080;
export const API_WSS_URL = envFile.VITE_BMON_BACKEND_URL + "/ws"
export const API_HTTPS_URL = envFile.VITE_BMON_BACKEND_URL;

export const CSRF_HEADER_NAME = 'X-XSRF-TOKEN';
export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
