import React from 'react'
import { useObserver } from "mobx-react-lite";
import { makeStyles } from "@material-ui/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    tileImg: {
        width: 260,
        height: 146,
        marginTop: 33,
    }
})

const baseTileImgPath = 'img/sport_list_tiles/'
const sports = [{ //TODO: crop images these properly
    name: 'Tennis',
    key: 'tennis',
    img: baseTileImgPath + 'tennis.jpg'
}, {
    name: 'Volleyball',
    key: 'volleyball',
    img: baseTileImgPath + 'volleyball.jpg'
}, {
    name: 'Soccer',
    key: 'soccer',
    img: baseTileImgPath + 'soccer.jpg'
}]

export default function SportList() {
    const classes = useStyles()

    return useObserver(() => (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={3}>
                {sports.map(sport => (
                    <GridListTile key={sport.key}>
                        <img alt={''} className={classes.tileImg} src={sport.img}></img>
                        <GridListTileBar
                            title={sport.name}
                            classes={{
                                root: classes.titleBar,
                            }}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    ))
}