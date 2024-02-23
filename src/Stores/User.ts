import { makeAutoObservable, runInAction } from 'mobx';
import {
  API_HTTPS_URL,
  CSRF_HEADER_NAME,
  CSRF_COOKIE_NAME,
  OPEN_API_CONF,
} from '../Constants/Constants.js';
import { RootStore, getCookieValueWithName } from './Store.js';
import { UserApi } from '../openapi/apis/UserApi.js';
import { UserDto } from '../openapi/models/UserDto.js';

class UserStore {
  rootStore: RootStore;
  user: UserDto | null;
  loggedIn: boolean;
  userApi: UserApi;
	pendingBetsAmount: number;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.user = null;
    this.loggedIn = false;
    this.userApi = new UserApi();
		this.pendingBetsAmount = 0;
    // @ts-expect-error Configuration ctor must be set to public in openapi/runtime.ts
    this.userApi.configuration = OPEN_API_CONF;

    makeAutoObservable(this);
    this.GetCurrentUserSession();
  }

  async Register(newUser) {
    return this.userApi
      .register({
        xXSRFTOKEN: getCookieValueWithName(CSRF_COOKIE_NAME),
        userRegisterDto: newUser,
      })
      .then((registeredUser) => {
        runInAction(() => {
          this.user = registeredUser;
          this.loggedIn = true;
        });
      });
  }

  async Login(username: string, password: string) {
    return this.userApi.loginRaw({ username: username, password: password });
  }

  logout() {
    this.loggedIn = false;
  }

  async GetCurrentUserSession() {
    return this.userApi.getUserSessionRaw().then((registeredUser) => {
      runInAction(() => {
        this.user = registeredUser;
        this.loggedIn = true;
      });
    });
  }

  async GetCurrentUserBets() {
    const res = await fetch(`${API_HTTPS_URL}/bets/pending`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        [CSRF_HEADER_NAME]: getCookieValueWithName(CSRF_COOKIE_NAME),
      },
    });
    if (res.status === 401) {
      this.rootStore.toastStore.snackbarWarning('Not logged in.');
      throw new Error(`GetCurrentUserBets: 401`);
    } else if (res.status !== 200) {
      throw new Error(`GetCurrentUserBets: non-200: ${res.status}`);
    }

    return await res.json();
  }
}

export default UserStore;
