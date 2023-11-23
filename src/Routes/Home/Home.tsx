import React, { useEffect } from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import SimpleMatchTable from './SimpleMatchTable.js';
import SportList from './SportList.js';
import { css } from '@emotion/react';

const Home = observer(() => {
  let { matchStore } = React.useContext(RootStoreContext) as RootStore;

  useEffect(() => {
    matchStore.FetchRecentMatches();
  }, []);

  return (
    <div>
      <div
        css={css`
          marginTop: 50,
          display: 'flex',
          justifyContent: 'center',
        `}
      >
        <div>
          <SportList></SportList>
          <SimpleMatchTable
            matches={matchStore.recentMatches.filter((m) => m.live)}
          ></SimpleMatchTable>
        </div>
      </div>
    </div>
  );
});

export default Home;
