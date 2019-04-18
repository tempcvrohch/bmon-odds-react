import React, { useState } from 'react';
import { RootStoreContext } from '../../../Stores';
import { useObserver } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
})

export default function BetConfirmation(props) {
    const classes = useStyles()
    const { betStore, toastStore, userStore } = React.useContext(RootStoreContext);
    const [loading, setLoading] = useState(false)

    const submit = () => {
        setLoading(true)

        betStore.PlaceBet(props.modalDetails).then(() => {
            toastStore.snackbarSuccess(`Bet placed successfully!`)
            userStore.user.pendingBetsAmount++
            closeModal()
        }).catch(e => {
            if(!e.message.includes('401')){
                toastStore.snackbarError(`Failed to place bet.`)
            }

            console.error(e)
            closeModal()
        })
    }

    const closeModal = () => {
        setLoading(false)
        props.setModalOpen(false)
    }

    return useObserver(() => (
        <Dialog onClose={closeModal} open={props.modalOpen} maxWidth={'xl'}>
            <DialogTitle id="">Confirm Wager({props.modalDetails.marketState.marketName})</DialogTitle>
            <DialogContent>
                You are about to place <strong>€{props.modalDetails.stake}</strong> on <strong>{props.modalDetails.marketState.playerName} @ {props.modalDetails.marketState.odd}</strong>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={submit} disabled={loading} color="primary">
                    Submit
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
            </DialogActions>
        </Dialog>
    ));
}