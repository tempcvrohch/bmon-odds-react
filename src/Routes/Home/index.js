import React from 'react';
import { useObserver } from 'mobx-react-lite'

export default function Home() {
    return useObserver(() => (
        <div>
            home route
        </div>
    ));
}