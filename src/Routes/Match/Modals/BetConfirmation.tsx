import React, { useState } from 'react';
import { RootStoreContext, RootStore } from '../../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { MarketState } from '../../../Types/Models.js';

export interface ModalDetails {
  open: Boolean;
  stake: Number;
  marketState?: MarketState;
}

const BetConfirmation = observer(
  (props: { modalDetails: ModalDetails; modalOpen: boolean; setModalDetails: React.Dispatch<React.SetStateAction<ModalDetails>>, setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { betStore, toastStore, userStore } = React.useContext(RootStoreContext) as RootStore;
    const [loading, setLoading] = useState(false);

    const submit = () => {
      setLoading(true);

      betStore
        .PlaceBet(props.modalDetails)
        .then(() => {
          toastStore.snackbarSuccess(`Bet placed successfully!`);
          if (userStore.user) {
            userStore.user.pendingBetsAmount++;
            userStore.user.balance -= +props.modalDetails.stake;
          }
          closeModal();
        })
        .catch((e) => {
          if (!e.message.includes('401')) {
            toastStore.snackbarError(`Failed to place bet.`);
          }

          console.error(e);
          closeModal();
        });
    };

    const closeModal = () => {
      setLoading(false);
      props.setModalOpen(false);
    };

		if(!props.modalDetails.marketState){
			return <><span>MarketState unavailable</span></>
		}

    return (
      <Dialog onClose={closeModal} open={props.modalOpen} maxWidth={'xl'}>
        <DialogTitle id="">Confirm Wager({props.modalDetails.marketState.marketName})</DialogTitle>
        <DialogContent>
          You are about to place <strong>€{props.modalDetails.stake.toString()}</strong> on{' '}
          <strong>
            {props.modalDetails.marketState.playerName} @ {props.modalDetails.marketState.odd}
          </strong>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={submit} disabled={loading} color="primary">
            Submit
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

export default BetConfirmation;
