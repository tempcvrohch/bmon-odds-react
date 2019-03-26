import React, {createContext} from "react";
import UserStore from './User'
import ToastStore from "./Toast";
import MatchStore from "./Match";

class RootStore {
    constructor(){ //order matters
        this.userStore = new UserStore(this)
        this.toastStore = new ToastStore(this)
        this.matchStore = new MatchStore(this)
        this.router = undefined
    }
}

const store = new RootStore()
const RootStoreContext = createContext(store);
function RootStoreProvider({children}){
    return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>
}

export {
    RootStoreContext,
    RootStoreProvider
}