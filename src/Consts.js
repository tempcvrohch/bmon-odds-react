class Consts {
    constructor(){
        this.API_PORT = 8080
        this.API_WSS_URL = window.location.host.includes('localhost') ? `ws://localhost:${this.API_PORT}/ws` : `wss://${window.location.host}:${this.API_PORT}/ws`
        this.API_HTTPS_URL = window.location.host.includes('localhost') ? `http://localhost:${this.API_PORT}` : `https://${window.location.host}:${this.API_PORT}`
    }
}

export default new Consts()