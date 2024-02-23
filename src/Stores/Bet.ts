import { makeAutoObservable, runInAction } from 'mobx';
import { OPEN_API_CONF, CSRF_COOKIE_NAME } from '../Constants/Constants.js';
import { MarketsApi } from '../openapi/apis/MarketsApi.js';
import { MarketStateDto } from '../openapi/models/MarketStateDto.js';
import { RootStore, getCookieValueWithName } from './Store.js';
import { BetApi } from '../openapi/apis/BetApi.js';
import { BetPlaceDto } from '../openapi/models/BetPlaceDto.js';

class BetStore {
  rootStore: RootStore;
  currentMarketStates: MarketStateDto[];
  marketsApi: MarketsApi;
  betApi: BetApi;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.marketsApi = new MarketsApi();
    this.betApi = new BetApi();
    this.currentMarketStates = [];
    // @ts-expect-error Configuration ctor must be set to public in openapi/runtime.ts
    this.marketsApi.configuration = OPEN_API_CONF;
    // @ts-expect-error Configuration ctor must be set to public in openapi/runtime.ts
    this.betApi.configuration = OPEN_API_CONF;

    makeAutoObservable(this);
  }

  async PlaceBet(marketStateId: number, betPlaceDto: BetPlaceDto) {
		return this.betApi.placeBetRaw({xXSRFTOKEN: getCookieValueWithName(CSRF_COOKIE_NAME), marketStateId, betPlaceDto, });
	}

  async FetchLatestMarketStates(matchId: number) {
    const marketStates = await this.marketsApi.getLatestMarketsByMatchId({ id: matchId });
    runInAction(() => {
      this.currentMarketStates = marketStates;
    });
  }
}

export default BetStore;
