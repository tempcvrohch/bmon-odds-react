import { observer } from 'mobx-react-lite';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import { formatDistance } from 'date-fns';
import { css } from '@emotion/react';
import { MatchDto } from '../../openapi/models/MatchDto.js';
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
  const playerSetScores = [0, 0];

  sets.forEach((set) => {
    const splitSet = set.split('-');
    const setWinnerIndex = +splitSet[0] > +splitSet[1] ? 0 : 1;
    playerSetScores[setWinnerIndex]++;
  });

  return playerSetScores;
}

const MatchSummary = observer((props: { match: MatchDto }) => {
	if(!props.match.league || !props.match.matchState || !props.match.matchState.marketStates){
		return (<span>Missing league/match state</span>);
	}

  const foundLeague = findLeagueIdentifier(props.match.league.name.toLowerCase());
  const sets = parseSets(props.match.matchState.setScore);
  const playerScores = parseIndividualSetScores(sets);

  return (
    <Card
      sx={{
        width: 400,
        height: 420,
        backgroundColor: '#2f2f2f',
      }}
    >
      <CardHeader
        avatar={<Avatar alt={''} src={`/img/league_logos/${foundLeague}.png`} />}
        title={props.match.name}
        subheader={props.match.league.name}
        sx={{ background: '#3d3d3d' }}
      />
      {/*TODO: fix child css */}
      <div
        css={css`
          width: 400px;
          text-align: center
        `}
      >
        <img src={`/img/avatars/${props.match.matchState.marketStates[0].id % 20}.jpg`} />
        <span css={setScoreIndicatorStyle}>{playerScores[0]}</span>
        <span css={setScoreIndicatorStyle}>:</span>
        <span css={setScoreIndicatorStyle}>{playerScores[1]}</span>
        <img src={`/img/avatars/${props.match.matchState.marketStates[1].id % 20}.jpg`} />
      </div>
      <CardContent
				sx={{
					marginBottom: 50
				}}>
        <span>
          Started: {props.match.createdAt && formatDistance(props.match.createdAt, new Date())}{' '}
        </span>
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
