import React, { useEffect } from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import BetsList from './BetsList.js';
import NoBets from './NoBets.js';
import { css } from '@emotion/react';
import { Paper, Toolbar, Typography } from '@mui/material';
import { BetStatusDto } from '../../openapi/models/BetStatusDto.js';

const Bets = observer(() => {
  const { userStore, toastStore } = React.useContext(RootStoreContext) as RootStore;
  const toolbarCss = css`
    color: #fff;
    background-color: #2C4770;
  `;

  useEffect(() => {
    userStore
      .GetCurrentUserBets()
      .then((bets) => {
        console.log(bets);
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
        margin-top: 50px;
        display: flex;
        justify-content: center;
				backgroundColor: #2f2f2f;
      `}
    >
      <div>
        {userStore.bets.filter((b) => b.status === BetStatusDto.Pending).length > 0 ? (
          <Paper>
            <Toolbar css={toolbarCss}>
              <Typography variant="h6" color="inherit">
                Pending
              </Typography>
            </Toolbar>
            <BetsList bets={userStore.bets.filter((b) => b.status === BetStatusDto.Pending)}></BetsList>
          </Paper>
        ) : (
          <NoBets text={'No pending bets...'}></NoBets>
        )}
        {userStore.bets.filter((b) => b.status !== BetStatusDto.Pending).length > 0 ? (
          <Paper>
            <Toolbar css={toolbarCss}>
              <Typography variant="h6" color="inherit">
                Resolved
              </Typography>
            </Toolbar>
            <BetsList bets={userStore.bets.filter((b) => b.status !== BetStatusDto.Pending)}></BetsList>
          </Paper>
        ) : (
          <NoBets text={'No resolved bets...'}></NoBets>
        )}
      </div>
    </div>
  );
});

export default Bets;
