export const VERSION = '0.1';
export const API_PORT = 8080;
export const API_WSS_URL = window.location.host.includes('localhost')
  ? `ws://localhost:${API_PORT}/ws`
  : `wss://${window.location.host}:${API_PORT}/ws`;
export const API_HTTPS_URL = window.location.host.includes('localhost')
  ? `http://localhost:${API_PORT}`
  : `https://${window.location.host}:${API_PORT}`;

export const CSRF_HEADER_NAME = 'X-XSRF-TOKEN';
export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
