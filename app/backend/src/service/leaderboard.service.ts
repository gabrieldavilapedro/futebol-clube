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
    const allPerformance = teams.map((team) => new Performance(team.teamName, team.id));

    matches.forEach((match) => {
      const homeTeamPerformance = allPerformance.filter((team) => team.id === match.homeTeamId)[0];
      const awayTeamPerformance = allPerformance.filter((team) => team.id === match.awayTeamId)[0];

      if (route === 'home') homeTeamPerformance.updateAttributes(match.homeTeamGoals, match.awayTeamGoals, true);
      else if (route === 'away') {
        awayTeamPerformance.updateAttributes(match.homeTeamGoals, match.awayTeamGoals, false);
      } else {
        homeTeamPerformance.updateAttributes(match.homeTeamGoals, match.awayTeamGoals, true);
        awayTeamPerformance.updateAttributes(match.homeTeamGoals, match.awayTeamGoals, false);
      }
    });

    const leaderboard = allPerformance.map((team) => team.Performance).sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if ((a.goalsFavor - a.goalsOwn) !== (b.goalsFavor - b.goalsOwn)) {
        return (b.goalsFavor - b.goalsOwn) - (a.goalsFavor - a.goalsOwn);
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 200, data: leaderboard };
  }

}