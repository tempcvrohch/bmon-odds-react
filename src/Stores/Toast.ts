import { observable, action } from 'mobx';
import { RootStore } from './Store.js';

interface Toast {
  open: boolean;
  message: string;
  variant: string;
}

class ToastStore {
  rootStore: RootStore;
  @observable toast: Toast;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.toast = {
      open: false,
      message: '',
      variant: 'success',
    };
  }

  @action
  showWithMessage(message) {
    this.toast.message = message;
    this.toast.open = true;
    setTimeout(() => (this.toast.open = false), 2000);
  }

  @action
  snackbarSuccess(message) {
    this.toast.variant = 'success';
    this.showWithMessage(message);
  }

  @action
  snackbarInfo(message) {
    this.toast.variant = 'info';
    this.showWithMessage(message);
  }

  @action
  snackbarWarning(message) {
    this.toast.variant = 'warning';
    this.showWithMessage(message);
  }

  @action
  snackbarError(message) {
    this.toast.variant = 'error';
    this.showWithMessage(message);
  }
}

export default ToastStore;
