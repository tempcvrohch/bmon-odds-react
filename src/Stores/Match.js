import {observable, decorate, action} from 'mobx';
import fetch from 'node-fetch'
import Consts from '../Consts'

class MatchStore {
    constructor(rootStore){
        this.rootStore = rootStore
        this.matches = [];
        this.liveMatches = [];
    }

    async FetchLiveMatches(){
        let res = await fetch(`${Consts.API_HTTPS_URL}/matches/recent`)
        if(res.status !== 200){
            throw new Error(`FetchLiveMatches: non-200: ${res.status}`)
        }
        
        this.liveMatches = await res.json()
        return this.liveMatches
    }
}

decorate(MatchStore, {
    matches: observable,
})

export default MatchStore