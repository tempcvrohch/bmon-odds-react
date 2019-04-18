import React, { useEffect, useState } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import BetConfirmation from './Modals/BetConfirmation'

const useStyles = makeStyles({
    paper: {
        marginTop: 50
    },
    betOptions: {
        display: 'flex',
        justifyContent: 'center'
    },
    betOption: {
        margin: 20,
        padding: 15
    },
    toolbar: {
        color: '#fff',
        backgroundColor: '#2C4770',
    },
    betslipControls: {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: 8
    },
    stakeInput: {
        width: 100
    }
})

export default function Betslip(props) {
    const classes = useStyles()
    const { matchStore } = React.useContext(RootStoreContext);
    const [oddDetails, setOddDetails] = useState(null)
    const [stakeAmount, setStakeAmount] = useState(0)
    const [selectedBetIndex, setSelectedBetIndex] = useState(null)
    const [betPlaceButtonEnabled, setBetPlaceButtonEnabled] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalDetails, setModalDetails] = useState({
        open: false,
        marketState: {}
    })

    useEffect(() => {
        matchStore.FetchLatestMatchOddDetails(props.match.id).then(latestOddDetails => {
            setOddDetails(latestOddDetails)
        })
    }, [])

    useEffect(() => {
        setBetPlaceButtonEnabled(selectedBetIndex !== null && stakeAmount > 0.25 && stakeAmount < 100)
    })

    const continueToModal = () => {
        setModalOpen(true)
        setModalDetails({
            stake: stakeAmount,
            marketState: oddDetails[selectedBetIndex]
        })
    }

    return useObserver(() => (
        <Paper className={classes.paper}>
            <BetConfirmation modalDetails={modalDetails} setModalDetails={setModalDetails} modalOpen={modalOpen} setModalOpen={setModalOpen}></BetConfirmation>
            <Toolbar className={classes.toolbar}>Betslip</Toolbar>
            {oddDetails ? <div>
                <div className={classes.betOptions}>
                    {oddDetails.map((oddDetail, i) => (
                        <Button key={oddDetail.betId} disabled={oddDetail.odd === '999/1'} className={classes.betOption} variant={selectedBetIndex === i ? 'outlined' : 'contained'} size="large" color="secondary" onClick={() => setSelectedBetIndex(i)}>
                            {oddDetail.odd}
                        </Button>
                    ))}
                </div>
                <div className={classes.betslipControls}>
                    <FormControl className={classes.stakeInput}>
                        <InputLabel htmlFor="adornment-amount">Stake</InputLabel>
                        <Input
                            id="adornment-amount"
                            value={stakeAmount}
                            type="number"
                            onChange={ev => setStakeAmount(ev.target.value)}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" disabled={!betPlaceButtonEnabled} onClick={continueToModal}>
                        Place
                    </Button>
                </div>
            </div> : <span>loading...</span>}
        </Paper>
    ));
}