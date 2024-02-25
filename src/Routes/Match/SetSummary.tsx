import React from 'react';
import { observer } from 'mobx-react-lite';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import GameSummary, { Game } from './GameSummary.js';
import { ExpandMore } from '@mui/icons-material';
import { MatchStateDto } from '../../openapi/models/MatchStateDto.js';

const numberSuffixes = ['st', 'nd', 'rd', 'th', 'th'];

function splitSetMutationsInGames(setMutations) {
  const games: Game[] = [];
  let currentGame: Game;

  let gameId = 0;
  setMutations.forEach((mut) => {
    if (!currentGame) {
      currentGame = {
        id: gameId++,
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
        id: gameId++,
        setScore: mut.setScore,
        pointMutations: [mut.pointScore],
      };
    }
  });

  return games;
}

const SetSummary = observer((props: { setIndex: number; mutations: MatchStateDto[][] }) => {
  const [expanded, setExpanded] = React.useState(false);
  const games = splitSetMutationsInGames(props.mutations);

  const onPanelClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      sx={{
        width: 400,
          background: '#2f2f2f'
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
          background: '#2f2f2f'
        }}
      >
        {games.map((game) => (
          <GameSummary key={game.id} game={game}></GameSummary> //TODO: check if key is needed on game.id
        ))}
      </AccordionDetails>
    </Accordion>
  );
});

export default SetSummary;
