import React, { useEffect } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'

export default function Home() {
    let { matchStore, router } = React.useContext(RootStoreContext);

    useEffect(() => {
        matchStore.FetchLiveMatches()
    }, [])

    return useObserver(() => (
        <div>
            {matchStore.length}
        </div>
    ));
}