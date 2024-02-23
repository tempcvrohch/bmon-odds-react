import React, { useEffect, useState } from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import MatchSummary from './MatchSummary.js';
import SetsContainer from './SetsContainer.js';
import Betslip from './Betslip.js';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { MatchDto } from '../../openapi/models/MatchDto.js';

const Match = observer(() => {
  const { matchStore } = React.useContext(RootStoreContext) as RootStore;
  const [match, setMatch] = useState<MatchDto>();
  const { id } = useParams();

  useEffect(() => {
    matchStore.FetchMatch(id).then((match) => {
      setMatch(match);
    });
  }, []);

  return (
    <div>
      {match ? (
        <div
          css={css`
            display: flex;
            justify-content: space-evenly;
            margin-top: 50px;
          `}
        >
          <div>
            <MatchSummary match={match}></MatchSummary>
            { match && <Betslip match={match}></Betslip> }
          </div>
          { match.matchStates && <SetsContainer matchStates={match.matchStates}></SetsContainer> }
        </div>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
});

export default Match;
