import { observer } from 'mobx-react-lite';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const baseTileImgPath = 'img/sport_list_tiles/';
const sports = [
  {
    //TODO: crop images these properly
    name: 'Tennis',
    key: 'tennis',
    img: baseTileImgPath + 'tennis.jpg',
  },
  {
    name: 'Volleyball',
    key: 'volleyball',
    img: baseTileImgPath + 'volleyball.jpg',
  },
  {
    name: 'Soccer',
    key: 'soccer',
    img: baseTileImgPath + 'soccer.jpg',
  },
];

const SportList = observer(() => {
  return (
    <div>
      <ImageList cols={3}>
        {sports.map((sport) => (
          <ImageListItem key={sport.key}>
            <img
              alt={''}
              css={css`
                width: 260px;
                height: 146px;
              `}
              src={sport.img}
            ></img>
            <ImageListItemBar
              title={sport.name}
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
});

export default SportList;
