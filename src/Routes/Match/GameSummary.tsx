import { observer } from 'mobx-react-lite';
import { css } from '@emotion/react';

export interface Game {
	setScore: String;
	pointMutations: String[];
}

const GameSummary = observer((props: {game: Game}) => {
  return (
    <div>
      <span
        css={css`
          fontweight: 'bold';
        `}
      >
        {props.game.setScore}
      </span>
      <table
        css={css`
          margin: 5,
          borderCollapse: 'collapse',
          borderStyle: 'hidden',
          '& td': {
            border: '1px solid black',
            padding: 5,
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
