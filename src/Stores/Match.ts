import { action, runInAction, makeAutoObservable } from 'mobx';
import { API_HTTPS_URL, OPEN_API_CONF } from '../Constants/Constants.js';
import { RootStore } from './Store.js';
import { MatchesApi } from '../openapi/apis/MatchesApi.js';
import { MatchDto } from '../openapi/models/MatchDto.js';

class MatchStore {
  rootStore: RootStore;
  matches: MatchDto[];
  recentMatches: MatchDto[];
  matchesApi: MatchesApi;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.matches = [];
    this.recentMatches = [];
    this.matchesApi = new MatchesApi();
		// @ts-expect-error Configuration ctor must be set to public in openapi/runtime.ts
    this.matchesApi.configuration = OPEN_API_CONF;

		makeAutoObservable(this);
  }

  async FetchRecentMatches(): Promise<MatchDto[]> {
    const recentMatches = await this.matchesApi.getRecentMatches();
    runInAction(() => {
      this.recentMatches = recentMatches;
    });
    return recentMatches;
  }

  @action
  async FetchMatch(id): Promise<MatchDto> {
    const res = await fetch(`${API_HTTPS_URL}/match/${id}`);
    if (res.status !== 200) {
      throw new Error(`FetchMatch: non-200: ${res.status}`);
    }

    return (await res.json()) as MatchDto;
  }
}

export default MatchStore;
