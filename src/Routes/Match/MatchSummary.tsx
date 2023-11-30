import { observer } from 'mobx-react-lite';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import { formatDistance, parseISO } from 'date-fns';
import { css } from '@emotion/react';
import { Match } from '../../Types/Models.js';

const setScoreIndicatorStyle = css`
  font-size: 100px;
  margin: 10px;
`;

function findLeagueIdentifier(leagueName) {
  const leagues = ['atp', 'chall', 'itf', 'wta'];
  let foundLeague = 'ukn';

  leagues.forEach((leagueId) => {
    if (leagueName.includes(leagueId)) {
      foundLeague = leagueId;
    }
  });

  return foundLeague;
}

function parseSets(setScore) {
  let sets = [setScore];
  if (setScore.includes(',')) {
    sets = setScore.split(',');
  }

  return sets;
}

function parseIndividualSetScores(sets) {
  let playerSetScores = [0, 0];

  sets.forEach((set) => {
    let splitSet = set.split('-');
    let setWinnerIndex = +splitSet[0] > +splitSet[1] ? 0 : 1;
    playerSetScores[setWinnerIndex]++;
  });

  return playerSetScores;
}

const MatchSummary = observer((props: { match: Match }) => {
  const foundLeague = findLeagueIdentifier(props.match.leagueName.toLowerCase());
  const sets = parseSets(props.match.matchState.setScore);
  const playerScores = parseIndividualSetScores(sets);

  return (
    <Card
      sx={{
        width: 400,
        height: 350,
      }}
    >
      <CardHeader
        avatar={<Avatar alt={''} src={`/img/league_logos/${foundLeague}.png`} />}
        title={props.match.name}
        subheader={props.match.leagueName}
      />
      {/*TODO: fix child css */}
      <div
        css={css`
          width: 400px,
          height: 120px,
          text-align: 'center',
        `}
      >
        <span css={setScoreIndicatorStyle}>{playerScores[0]}</span>
        <span css={setScoreIndicatorStyle}>:</span>
        <span css={setScoreIndicatorStyle}>{playerScores[1]}</span>
      </div>
      <CardContent>
        <span>Started: {formatDistance(parseISO(props.match.createdAt), new Date())} </span>
        <ul>
          {sets.map(
            (set) => (
              <li key={set}>
                <Typography component="p">{set}</Typography>
              </li>
            ),
            this,
          )}
        </ul>
      </CardContent>
    </Card>
  );
});

export default MatchSummary;
