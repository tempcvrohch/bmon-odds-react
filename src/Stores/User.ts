import { observable, action } from 'mobx';
import { API_HTTPS_URL, CSRF_HEADER_NAME, CSRF_COOKIE_NAME } from '../Constants/Constants.js';
import { RootStore, getCookieValueWithName } from './Store.js';
import { User } from '../Types/Models.js';

class UserStore {
  rootStore: RootStore;
  @observable user: User | null;
  @observable loggedIn: boolean;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.user = null;
    this.loggedIn = false;

    this.GetCurrentUserSession();
  }

  @action
  async Register(newUser) {
    const res = await fetch(`${API_HTTPS_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        [CSRF_HEADER_NAME]: getCookieValueWithName(CSRF_COOKIE_NAME),
      },
      body: JSON.stringify(newUser),
    });
    if (res.status !== 200) {
      throw new Error(`Register: non-200: ${res.status}`);
    }
  }

  @action
  async Login(loginUser) {
    const formData = new FormData();
    formData.append('username', loginUser.username);
    formData.append('password', loginUser.password);

    console.log(`${API_HTTPS_URL}/auth/login`);
    const res = await fetch(`${API_HTTPS_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        [CSRF_HEADER_NAME]: getCookieValueWithName(CSRF_COOKIE_NAME),
      },
      //body: new URLSearchParams(formData),
      body: formData,
    });
    if (res.status !== 200) {
      throw new Error(`Login: non-200: ${res.status}`);
    }

    this.loggedIn = true;
  }

  @action
  logout() {
    this.loggedIn = false;
  }

  async GetCurrentUserSession() {
    const res = await fetch(`${API_HTTPS_URL}/auth/session`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        [CSRF_HEADER_NAME]: getCookieValueWithName(CSRF_COOKIE_NAME),
      },
    });
    if (res.status === 200) {
      this.loggedIn = true;
      this.user = await res.json();
      console.log(this.user);
    }
  }

  @action
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
