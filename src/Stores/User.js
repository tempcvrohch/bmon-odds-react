import {observable, decorate, action} from 'mobx';
import Consts from '../Consts'

class UserStore {
    constructor(rootStore){
        this.rootStore = rootStore
        this.loggedIn = false;
    }

    async Register(newUser){
        let res = await fetch(`${Consts.API_HTTPS_URL}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        if(res.status !== 200){
            throw new Error(`Register: non-200: ${res.status}`)
        }
    }

    async Login(loginUser){
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
        if(res.status !== 200){
            throw new Error(`Login: non-200: ${res.status}`)
        }
    }
}

decorate(UserStore, {
    loggedIn: observable,
    Register: action,
    Login: action,
})

export default UserStore