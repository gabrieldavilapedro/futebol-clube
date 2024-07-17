import Performance from '../classHelper/performanceTeam';
import TeamModel from '../models/Teams.model';
import MatchesModel from '../models/Matches.model';

export default class LeaderboardService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
    private matchesModel: MatchesModel = new MatchesModel(),
  ) { }

  public async getLeaderboard(route: string = 'home') {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchesModel.getInProgressFalse();

    const isHomeTeam = route === 'home';

    // Cria um novo objeto Performance para cada equipe
    const allPerformance = teams.map((team) => new Performance(team.teamName, team.id));

    // Para cada partida, atualiza a tabela de atributos da equipe da casa
    matches.forEach((match) => {
      const homeTeamPerformance = allPerformance.filter((team) => team.id === match.homeTeamId)[0];
      const awayTeamPerformance = allPerformance.filter((team) => team.id === match.awayTeamId)[0];

      if (isHomeTeam) homeTeamPerformance.updateAttributes(match.homeTeamGoals, match.awayTeamGoals, isHomeTeam);
      else awayTeamPerformance.updateAttributes(match.homeTeamGoals, match.awayTeamGoals, isHomeTeam);
    });

    // Ordena a tabela de classificação com base em vários critérios
    const leaderboard = allPerformance.map((team) => team.Performance).sort((a, b) => {
      // ordena por total de pontos
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;

      // ordena por total de vitórias
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;

      // ordena por saldo de gols
      if ((a.goalsFavor - a.goalsOwn) !== (b.goalsFavor - b.goalsOwn)) {
        return (b.goalsFavor - b.goalsOwn) - (a.goalsFavor - a.goalsOwn);
      }

      // ordena por gols a favor
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 200, data: leaderboard };
  }
}
