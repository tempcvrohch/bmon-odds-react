import { Configuration } from '../openapi/runtime.js'

// @ts-expect-error vite imports the envfile
const envFile  = import.meta.env;

export const OPEN_API_CONF = new Configuration({basePath: envFile.VITE_BMON_BACKEND_URL, credentials: 'include' })
export const VERSION = 'v1.0';
export const API_PORT = 8080;
export const API_WSS_URL = envFile.VITE_BMON_BACKEND_URL + "/ws"
export const API_HTTPS_URL = envFile.VITE_BMON_BACKEND_URL;

export const CSRF_HEADER_NAME = 'X-XSRF-TOKEN';
export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
