import React, { createContext } from 'react';
import UserStore from './User.js';
import ToastStore from './Toast.js';
import MatchStore from './Match.js';
import BetStore from './Bet.js';
import { observable } from 'mobx';

class RootStore {
  @observable userStore: UserStore;
  @observable toastStore: ToastStore;
  @observable matchStore: MatchStore;
  @observable betStore: BetStore;

  constructor() {
    //order matters
    this.userStore = new UserStore(this);
    this.toastStore = new ToastStore(this);
    this.matchStore = new MatchStore(this);
    this.betStore = new BetStore(this);
  }
}

const store = new RootStore();
const RootStoreContext = createContext(store);

function RootStoreProvider({ children }) {
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
}

export function getCookieValueWithName(name: string): string {
  const desiredCookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith(name + '='));

  return desiredCookie ? desiredCookie.split('=')[1] : '';
}

export { RootStore, RootStoreContext, RootStoreProvider };
