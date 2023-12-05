import React from 'react';
import { observer } from 'mobx-react-lite';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import GameSummary, { Game } from './GameSummary.js';
import { MatchState } from '../../Types/Models.js';
import { ExpandMore } from '@mui/icons-material';

const numberSuffixes = ['st', 'nd', 'rd', 'th', 'th'];

function splitSetMutationsInGames(setMutations) {
  const games: Game[] = [];
  let currentGame: Game;

  setMutations.forEach((mut) => {
    if (!currentGame) {
      currentGame = {
        setScore: mut.setScore,
        pointMutations: [mut.pointScore],
      };
      return;
    }

    if (mut.setScore === currentGame.setScore) {
      currentGame.pointMutations.push(mut.pointScore);
    } else {
      games.push(currentGame);
      currentGame = {
        setScore: mut.setScore,
        pointMutations: [mut.pointScore],
      };
    }
  });

  return games;
}

const SetSummary = observer((props: { setIndex: number; mutations: MatchState[][] }) => {
  const [expanded, setExpanded] = React.useState(false);
  const games = splitSetMutationsInGames(props.mutations);

  const onPanelClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      sx={{
        width: 400,
      }}
      expanded={expanded}
      onChange={onPanelClick}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{`${props.setIndex + 1}${numberSuffixes[props.setIndex]} Set`}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'inline-block',
        }}
      >
        {games.map((game) => (
          <GameSummary game={game}></GameSummary> //TODO: check if key is needed on game.id
        ))}
      </AccordionDetails>
    </Accordion>
  );
});

export default SetSummary;
