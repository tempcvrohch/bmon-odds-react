import { observer } from 'mobx-react-lite';
import DrawerList from './DrawerList.js';
import { Drawer } from '@mui/material';

const Navigator = observer(() => {
  return (
    <div>
      <Drawer
        sx={{ width: { xs: 50, sm: 180 } }}
        variant="persistent"
        open={true}
        // open={rootStore.userStore.loggedIn}
        anchor="left"
      >
        <DrawerList></DrawerList>
      </Drawer>
    </div>
  );
});

export default Navigator;
