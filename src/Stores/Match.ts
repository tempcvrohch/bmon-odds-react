import { observable, action } from 'mobx';
import { API_HTTPS_URL } from '../Constants/Constants.js';
import { RootStore } from './Store.js';
import { MarketState, Match } from '../Types/Models.js';

class MatchStore {
  rootStore: RootStore;
  @observable matches: Match[];
  @observable recentMatches: Match[];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.matches = [];
    this.recentMatches = [];
  }

  @action
  async FetchRecentMatches(): Promise<Match[]> {
    let res = await fetch(`${API_HTTPS_URL}/matches/recent`, {}); //credentials: 'include'?
    if (res.status !== 200) {
      throw new Error(`FetchRecentMatches: non-200: ${res.status}`);
    }

    return await res.json() as Match[]
  }

  @action
  async FetchMatch(id): Promise<Match> {
    let res = await fetch(`${API_HTTPS_URL}/match/${id}`);
    if (res.status !== 200) {
      throw new Error(`FetchMatch: non-200: ${res.status}`);
    }

    return await res.json() as Match;
  }

  @action
  async FetchLatestMatchOddDetails(matchId): Promise<MarketState[]> {
    let res = await fetch(`${API_HTTPS_URL}/match/${matchId}/market/latest`);
    if (res.status !== 200) {
      throw new Error(`FetchMatch: non-200: ${res.status}`);
    }

    return await res.json() as MarketState[];
  }
}

export default MatchStore;
