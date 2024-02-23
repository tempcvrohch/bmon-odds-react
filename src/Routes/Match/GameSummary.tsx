import { observer } from 'mobx-react-lite';
import { css } from '@emotion/react';

export interface Game {
  id: number;
  setScore: string;
  pointMutations: string[];
}

const GameSummary = observer((props: { game: Game }) => {
  return (
    <div>
      <span
        css={css`
          font-weight: bold;
        `}
      >
        {props.game.setScore}
      </span>
      <table
        css={css`
          margin: 5px;
          border-collapse: collapse;
          border-style: hidden;
          & tbody & tr & td: {
            border: 1px solid white;
            padding: 5px;
          },
        `}
      >
        <tbody>
          <tr>
            {props.game.pointMutations.map((mut, i) => (
              <td
                css={css`
                  margin: 5px;
                  border: 1px solid white;
                  padding: 5px;
                `}
                key={i}
              >
                {mut.split('-')[0]}
              </td>
            ))}
          </tr>
          <tr>
            {props.game.pointMutations.map((mut, i) => (
              <td
                css={css`
                  margin: 5px;
                  border: 1px solid white;
                  padding: 5px;
                `}
                key={i}
              >
                {mut.split('-')[1]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default GameSummary;
