import {observable, decorate, action} from 'mobx';
import fetch from 'node-fetch'
import Consts from '../Consts'

class MatchStore {
    constructor(rootStore){
        this.rootStore = rootStore
        this.matches = [];
        this.recentMatches = [];
    }

    async FetchRecentMatches(){
        let res = await fetch(`${Consts.API_HTTPS_URL}/matches/recent`)
        if(res.status !== 200){
            throw new Error(`FetchRecentMatches: non-200: ${res.status}`)
        }
        
        this.recentMatches = await res.json()
        return this.recentMatches
    }

    async FetchMatch(id){
        let res = await fetch(`${Consts.API_HTTPS_URL}/match/${id}`)
        if(res.status !== 200){
            throw new Error(`FetchMatch: non-200: ${res.status}`)
        }
        
        return await res.json()
    }
}

decorate(MatchStore, {
    matches: observable,
    recentMatches: observable,
})

export default MatchStore