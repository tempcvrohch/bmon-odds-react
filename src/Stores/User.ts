import { makeAutoObservable, runInAction } from 'mobx';
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME, OPEN_API_CONF } from '../Constants/Constants.js';
import { RootStore, getCookieValueWithName } from './Store.js';
import { UserApi } from '../openapi/apis/UserApi.js';
import { UserDto } from '../openapi/models/UserDto.js';
import { BetsApi } from '../openapi/apis/BetsApi.js';
import { BetDto } from '../openapi/models/BetDto.js';

class UserStore {
  rootStore: RootStore;
  user: UserDto | null;
  loggedIn: boolean;
  userApi: UserApi;
  betsApi: BetsApi;
  bets: BetDto[];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.user = null;
    this.loggedIn = false;
    this.userApi = new UserApi();
    this.betsApi = new BetsApi();
    this.bets = [];
    // @ts-expect-error Configuration ctor must be set to public in openapi/runtime.ts
    this.userApi.configuration = OPEN_API_CONF;
    // @ts-expect-error Configuration ctor must be set to public in openapi/runtime.ts
    this.betsApi.configuration = OPEN_API_CONF;

    makeAutoObservable(this);
    this.GetCurrentUserSession();
  }

  async Register(newUser) {
    return this.userApi
      .registerRaw({
        xXSRFTOKEN: getCookieValueWithName(CSRF_COOKIE_NAME),
        userRegisterDto: newUser,
      })
      .then(async (res) => {
        const registeredUser = await res.value();
        runInAction(() => {
          this.user = registeredUser;
          this.loggedIn = true;
        });
      });
  }

  async Login(username: string, password: string) {
    return this.userApi
      .loginRaw({ username: username, password: password }, { redirect: 'follow' })
      .then(async (res) => {
        const registeredUser = await res.value();
        runInAction(() => {
          this.user = registeredUser;
          this.loggedIn = true;
        });
      });
  }

  logout() {
    return this.userApi
      .logoutRaw({ headers: { [CSRF_HEADER_NAME]: getCookieValueWithName(CSRF_COOKIE_NAME) } })
      .then(() => {
        runInAction(() => {
          this.user = null;
          this.loggedIn = false;
        });
      });
  }

  async GetCurrentUserSession() {
    return this.userApi.getUserSessionRaw().then(async (res) => {
      const registeredUser = await res.value();
      runInAction(() => {
        this.user = registeredUser;
        this.loggedIn = true;
      });
    });
  }

  async GetCurrentUserBets() {
    return this.betsApi.getUserBetsPendingRaw().then(async (res) => {
      const pendingBets = await res.value();
      runInAction(() => {
        this.bets = pendingBets;
      });
      return pendingBets;
    });
  }
}

export default UserStore;
