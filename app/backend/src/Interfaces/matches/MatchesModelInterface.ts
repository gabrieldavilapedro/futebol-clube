import { Match } from './Matches';

export interface MatchesModelInterface {
  getMatches: () => Promise<Match[]>;
  getMatchesInProgress: (boolean: boolean) => Promise<Match[]>;
}
