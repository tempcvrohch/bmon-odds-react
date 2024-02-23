import { observer } from 'mobx-react-lite';
import SetSummary from './SetSummary.js';
import { Toolbar } from '@mui/material';
import { MatchStateDto } from '../../openapi/models/MatchStateDto.js';

function splitMatchMutationsOnSets(matchMutations) {
  const lastSetScore = matchMutations[matchMutations.length - 1].setScore;
  if (!lastSetScore.includes(',')) {
    return [matchMutations]; //this match only has 1 set (so far)
  }

  const lastSets: MatchStateDto[] = lastSetScore.split(',');
  const matchMutationsOnSets: MatchStateDto[][] = [];
  lastSets.forEach(() => matchMutationsOnSets.push([]));

  matchMutations.forEach((mut) => {
    const ind = (mut.setScore.match(/,/g) || []).length;

    if (matchMutationsOnSets[ind]) {
      matchMutationsOnSets[ind].push(mut);
    }
  });

  return matchMutationsOnSets;
}

const SetContainer = observer((props: { matchStates: MatchStateDto[] }) => {
  const setMutations = splitMatchMutationsOnSets(props.matchStates);

  return (
    <div>
      <Toolbar
        sx={{
          color: '#fff',
          backgroundColor: '#2C4770',
        }}
      >
        Set Summaries
      </Toolbar>
      {setMutations.map((setMutationArray, ind) => (
        <SetSummary key={ind} setIndex={ind} mutations={setMutationArray}></SetSummary>
      ))}
    </div>
  );
});

export default SetContainer;
