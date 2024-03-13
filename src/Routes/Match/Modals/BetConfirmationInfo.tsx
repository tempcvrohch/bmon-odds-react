import React from 'react';
import { PlayerDto } from '../../../openapi/index.js';

const BetConfirmationInfo = (props: { player: PlayerDto; odd: number }) => {
  return (
    <strong>
      {props.player.firstname + ' ' + props.player.lastname} @ {props.odd}
    </strong>
  );
};

export default BetConfirmationInfo;
