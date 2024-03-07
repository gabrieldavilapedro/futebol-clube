import { Team } from './Team';

export interface TeamModelInterface {
  findAll: () => Promise<Team[]>;
  findById: (id: number) => Promise<Team | null>;
}
