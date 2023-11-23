export interface User {
  id: number;
  username: string;
  password: string;
  balance: number;
	pendingBetsAmount: number;
}

export enum BetStatus {
  WIN,
  LOSS,
  PENDING,
  VOID,
}

export interface Bet {
	createdAt: string;
  id: number;
  status: BetStatus;
  stake: number;
  toReturn: number;
  marketState: MarketState;
}
export interface Match {
	createdAt: string;
  id: number;
  bId: string;
  name: string;
  sportName: string;
  leagueName: string;
  live: boolean;
	matchState: MatchState;
	matchStates: MatchState[];
}

export interface MarketType {
  id: string;
  name: string;
}

export interface MarketState {
  id: number;
  marketName: string;
  playerName: string;
  fixtureId: number;
  betId: number;
  suspended: boolean;
  odd: string;
}

export interface MatchState {
  id: number;
  setScore: string;
  pointScore: string;
  servingIndex: string;
}

export interface Sport {
  sportName: string;
  sportId: string;
  wsId: string;
}
