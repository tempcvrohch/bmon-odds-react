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
import { MarketStateDto } from '../../../openapi/models/MarketStateDto.js';
import BetConfirmationInfo from './BetConfirmationInfo.js';

export interface ModalDetails {
  open: boolean;
  stake: number;
  marketState?: MarketStateDto;
}

const BetConfirmation = observer(
  (props: {
    modalDetails: ModalDetails;
    modalOpen: boolean;
    setModalDetails: React.Dispatch<React.SetStateAction<ModalDetails>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { betStore, toastStore } = React.useContext(RootStoreContext) as RootStore;
    const [loading, setLoading] = useState(false);

    const submit = () => {
      if (!props.modalDetails.marketState) {
        return;
      }
      setLoading(true);

      betStore
        .PlaceBet(props.modalDetails.marketState.id, {
          stake: props.modalDetails.stake,
          marketStateId: props.modalDetails.marketState.id,
        })
        .then(() => {
          toastStore.snackbarSuccess(`Bet placed successfully!`);
          closeModal();
        })
        .catch((e) => {
          toastStore.snackbarError(`Failed to place bet.`);

          console.error(e);
          closeModal();
        });
    };

    const closeModal = () => {
      setLoading(false);
      props.setModalOpen(false);
    };

    return (
      <Dialog onClose={closeModal} open={props.modalOpen} maxWidth={'xl'}>
        {/* TODO: add market name to dto */}
        <DialogTitle id="">Confirm Wager(Fulltime Result)</DialogTitle>
        <DialogContent>
          You are about to place <strong>€{props.modalDetails.stake.toString()}</strong> on{' '}
          {props.modalDetails.marketState && props.modalDetails.marketState.player ? (
            <BetConfirmationInfo
              player={props.modalDetails.marketState.player}
              odd={props.modalDetails.marketState.odd}
            />
          ) : (
            <span>Missing Market Info</span>
          )}
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
