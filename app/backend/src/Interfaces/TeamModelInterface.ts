import { Team } from './Team';

export interface TeamModelInterface {
  findAll: () => Promise<Team[]>;
}
