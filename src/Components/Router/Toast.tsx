import { useContext } from 'react';
import { Snackbar } from '@mui/material';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import { Alert } from '@mui/material';

const Toast = observer(() => {
  const { toastStore } = useContext(RootStoreContext) as RootStore;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!toastStore.toast.open}
    >
      <Alert severity={toastStore.toast.variant}>{toastStore.toast.message}</Alert>
    </Snackbar>
  );
});

export default Toast;
