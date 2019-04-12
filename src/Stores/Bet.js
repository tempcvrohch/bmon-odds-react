import {observable, decorate, action} from 'mobx';
import Consts from '../Consts'

class UserStore {
    constructor(rootStore){
        this.rootStore = rootStore
    }

    async PlaceBet(newBet){
        let res = await fetch(`${Consts.API_HTTPS_URL}/bet/place`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBet)
        })
        if(res.status === 401){
            this.rootStore.toastStore.snackbarWarning('Not logged in.')
            throw new Error(`PlaceBet: 401`)
        } else if(res.status !== 200){
            throw new Error(`PlaceBet: non-200: ${res.status}`)
        }
    }
}

decorate(UserStore, {
    PlaceBet: action,
})

export default UserStore