export default class Performance {
  private _id: number;
  private _name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: number;

  constructor(name: string, id: number) {
    this._id = id;
    this._name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = 0;
  }

  public updateAttributes(homeGoals: number, awayGoals: number, isHomeTeam: boolean) {
    this.totalGames += 1;

    if (isHomeTeam) {
      this.goalsFavor += homeGoals;
      this.goalsOwn += awayGoals;

      if (homeGoals > awayGoals) {
        this.totalVictories += 1;
        this.totalPoints += 3;
      } else if (homeGoals === awayGoals) {
        this.totalDraws += 1;
        this.totalPoints += 1;
      } else {
        this.totalLosses += 1;
      }
    } else {
      this.goalsFavor += awayGoals;
      this.goalsOwn += homeGoals;

      if (awayGoals > homeGoals) {
        this.totalVictories += 1;
        this.totalPoints += 3;
      } else if (awayGoals === homeGoals) {
        this.totalDraws += 1;
        this.totalPoints += 1;
      } else {
        this.totalLosses += 1;
      }
    }

    this._goalsBalance = this.goalsFavor - this.goalsOwn;
    this._efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get Performance() {
    return {
      name: this._name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}
