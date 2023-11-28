import React, { useEffect, useState } from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import {
  Paper,
  Toolbar,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from '@mui/material';
import BetConfirmation, { ModalDetails } from './Modals/BetConfirmation.js';
import { MarketState, Match } from '../../Types/Models.js';
import { css } from '@emotion/react';

const Betslip = observer((props: { match: Match }) => {
  const { matchStore } = React.useContext(RootStoreContext) as RootStore;
  const [oddDetails, setOddDetails] = useState<MarketState[]>();
  const [stakeAmount, setStakeAmount] = useState(0);
  const [selectedBetIndex, setSelectedBetIndex] = useState(0);
  const [betPlaceButtonEnabled, setBetPlaceButtonEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<ModalDetails>({
    open: false,
    stake: 0,
  });

  useEffect(() => {
    matchStore.FetchLatestMatchOddDetails(props.match.id).then((latestOddDetails) => {
      setOddDetails(latestOddDetails);
    });
  }, []);

  useEffect(() => {
    setBetPlaceButtonEnabled(selectedBetIndex !== null && stakeAmount > 0.25 && stakeAmount < 100);
  });

  const continueToModal = () => {
    if (!oddDetails) {
      return;
    }

    setModalOpen(true);
    setModalDetails({
      open: true,
      stake: stakeAmount,
      marketState: oddDetails[selectedBetIndex],
    });
  };

  return (
    <Paper
      css={css`
        margin-top: 50px;
      `}
    >
      <BetConfirmation
        modalDetails={modalDetails}
        setModalDetails={setModalDetails}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      ></BetConfirmation>
      <Toolbar
        sx={{
          color: '#fff',
          backgroundColor: '#2C4770',
        }}
      >
        Betslip
      </Toolbar>
      {oddDetails ? (
        <div>
          <div
            css={css`
              display: 'flex',
              justify-content: 'center',
            `}
          >
            {oddDetails.map((oddDetail, i) => (
              <Button
                // key={oddDetail.betId} TODO: figure out what
                disabled={oddDetail.odd === '999/1'}
                css={css`
                  margin: 20px,
                  padding: 15px,
                `}
                variant={selectedBetIndex === i ? 'outlined' : 'contained'}
                size="large"
                color="secondary"
                onClick={() => setSelectedBetIndex(i)}
              >
                {oddDetail.odd}
              </Button>
            ))}
          </div>
          <div
            css={css`
              display: 'flex',
              justify-content: 'space-evenly',
              padding: 8px,
            `}
          >
            <FormControl
              css={css`
                width: 100px;
              `}
            >
              <InputLabel htmlFor="adornment-amount">Stake</InputLabel>
              <Input
                id="adornment-amount"
                value={stakeAmount}
                type="number"
                onChange={(ev) => setStakeAmount(parseInt(ev.target.value))}
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              disabled={!betPlaceButtonEnabled}
              onClick={continueToModal}
            >
              Place
            </Button>
          </div>
        </div>
      ) : (
        <span>loading...</span>
      )}
    </Paper>
  );
});

export default Betslip;