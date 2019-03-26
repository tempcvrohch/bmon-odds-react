import {observable, decorate, action} from 'mobx';

class UserStore {
    constructor(rootStore){
        this.rootStore = rootStore
        this.loggedIn = false;
    }
}

decorate(UserStore, {
    loggedIn: observable,
})

export default UserStore