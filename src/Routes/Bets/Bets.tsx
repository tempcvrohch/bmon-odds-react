import React, { useEffect, useState } from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import BetsList from './BetsList.js';
import NoBets from './NoBets.js';
import { css } from '@emotion/react';
import { Bet, BetStatus } from '../../Types/Models.js';
import { Paper, Toolbar, Typography } from '@mui/material';


const Bets = observer(() => {
  let { userStore, toastStore } = React.useContext(RootStoreContext) as RootStore;
  const [bets, setBets] = useState<Bet[]>([]);
  const toolbarCss = css`color: '#fff', backgroundColor: '#2C4770'`;

  useEffect(() => {
    userStore
      .GetCurrentUserBets()
      .then((bets) => {
        console.log(bets);
        setBets(bets);
      })
      .catch((e) => {
        if (!e.message.includes('401')) {
          toastStore.snackbarError(`Failed to retreive pending bets`);
        }

        console.error(e);
      });
  }, []);

  return (
    <div
      css={css`
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
      `}
    >
      <div>
        {bets.filter((b) => b.status === BetStatus.PENDING).length > 0 ? (
          <Paper>
            <Toolbar css={toolbarCss}>
              <Typography variant="h6" color="inherit">
                Pending
              </Typography>
            </Toolbar>
            <BetsList bets={bets.filter((b) => b.status === BetStatus.PENDING)}></BetsList>
          </Paper>
        ) : (
          <NoBets text={'No pending bets...'}></NoBets>
        )}
        {bets.filter((b) => b.status !== BetStatus.PENDING).length > 0 ? (
          <Paper>
            <Toolbar css={toolbarCss}>
              <Typography variant="h6" color="inherit">
                Resolved
              </Typography>
            </Toolbar>
            <BetsList bets={bets.filter((b) => b.status !== BetStatus.PENDING)}></BetsList>
          </Paper>
        ) : (
          <NoBets text={'No resolved bets...'}></NoBets>
        )}
      </div>
    </div>
  );
});

export default Bets;
