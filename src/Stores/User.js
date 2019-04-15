import { observable, decorate, action } from 'mobx';
import Consts from '../Consts'

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.loggedIn = false;
    }

    async Register(newUser) {
        let res = await fetch(`${Consts.API_HTTPS_URL}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        if (res.status !== 200) {
            throw new Error(`Register: non-200: ${res.status}`)
        }
    }

    async Login(loginUser) {
        let formData = new FormData();
        formData.append('username', loginUser.username);
        formData.append('password', loginUser.password);

        console.log(`${Consts.API_HTTPS_URL}/login`)
        let res = await fetch(`${Consts.API_HTTPS_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(formData)
        })
        if (res.status !== 200) {
            throw new Error(`Login: non-200: ${res.status}`)
        }

        this.loggedIn = true
    }

    logout(){
        this.loggedIn = false;
    }

    async GetCurrentUserBets() {
        let res = await fetch(`${Consts.API_HTTPS_URL}/user/bets/pending`, {
            method: 'GET',
            credentials: 'include',
        })
        if(res.status === 401){
            this.rootStore.toastStore.snackbarWarning('Not logged in.')
            throw new Error(`GetCurrentUserBets: 401`)
        } else if (res.status !== 200) {
            throw new Error(`GetCurrentUserBets: non-200: ${res.status}`)
        }

        return await res.json()
    }
}

decorate(UserStore, {
    loggedIn: observable,
    Register: action,
    Login: action,
    GetCurrentUserBets: action,
})

export default UserStore