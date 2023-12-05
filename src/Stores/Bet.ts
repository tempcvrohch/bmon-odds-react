import {API_HTTPS_URL} from '../Constants/Constants.js';
import { RootStore } from './Store.js';

class UserStore {
	rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async PlaceBet(newBet) {
    const res = await fetch(`${API_HTTPS_URL}/bet/place`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newBet),
    });
    if (res.status === 401) {
      this.rootStore.toastStore.snackbarWarning('Not logged in.');
      throw new Error(`PlaceBet: 401`);
    } else if (res.status !== 200) {
      throw new Error(`PlaceBet: non-200: ${res.status}`);
    }
  }
}

export default UserStore;
