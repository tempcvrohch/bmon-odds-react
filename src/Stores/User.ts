import { observable, action } from 'mobx';
import { API_HTTPS_URL } from '../Constants/Constants.js';
import { RootStore } from './Store.js';
import { User } from '../Types/Models.js';

class UserStore {
  rootStore: RootStore;
  @observable user: User | null;
  @observable loggedIn: Boolean;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.user = null;
    this.loggedIn = false;

    this.GetCurrentUserSession();
  }

  @action
  async Register(newUser) {
    let res = await fetch(`${API_HTTPS_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (res.status !== 200) {
      throw new Error(`Register: non-200: ${res.status}`);
    }
  }

  @action
  async Login(loginUser) {
    let formData = new FormData();
    formData.append('username', loginUser.username);
    formData.append('password', loginUser.password);

    console.log(`${API_HTTPS_URL}/auth/login`);
    let res = await fetch(`${API_HTTPS_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
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
    let res = await fetch(`${API_HTTPS_URL}/auth/session`, {
      method: 'GET',
      credentials: 'include',
    });
    if (res.status === 200) {
      this.loggedIn = true;
      this.user = await res.json();
      console.log(this.user);
    }
  }

  @action
  async GetCurrentUserBets() {
    let res = await fetch(`${API_HTTPS_URL}/bets/pending`, {
      method: 'GET',
      credentials: 'include',
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
