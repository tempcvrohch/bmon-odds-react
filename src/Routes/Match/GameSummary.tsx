import { observer } from 'mobx-react-lite';
import { css } from '@emotion/react';

export interface Game {
	setScore: string;
	pointMutations: string[];
}

const GameSummary = observer((props: {game: Game}) => {
  return (
    <div>
      <span
        css={css`
          font-weight: 'bold';
        `}
      >
        {props.game.setScore}
      </span>
      <table
        css={css`
          margin: 5px;
          border-collapse: 'collapse';
          border-style: 'hidden';
          '& td': {
            border: '1px solid black';
            padding: 5px;
          },
        `}
      >
        <tbody>
          <tr>
            {props.game.pointMutations.map((mut, i) => (
              <td key={i}>{mut.split('-')[0]}</td>
            ))}
          </tr>
          <tr>
            {props.game.pointMutations.map((mut, i) => (
              <td key={i}>{mut.split('-')[1]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default GameSummary;
