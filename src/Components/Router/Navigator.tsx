import { observer } from 'mobx-react-lite';
import DrawerList from './DrawerList.js';
import { Drawer } from '@mui/material';

const Navigator = observer(() => {
  return (
      <Drawer
        sx={{ width: { xs: 50, sm: 180 } , gridArea: 'aside', div: {backgroundColor: '#2f2f2f'}}}
        variant="persistent"
        open={true}
        anchor="left"
				className="aside"
      >
        <DrawerList></DrawerList>
      </Drawer>
  );
});

export default Navigator;
