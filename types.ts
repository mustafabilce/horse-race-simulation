export interface Horse {
    id: number;
    name: string;
    color: string;
    condition: number;
}
export interface Race {
    run: number,
    distance: number,
    selectedHorses: Array<Horse>,
    result: Array<Horse>,
    isCompleted: boolean
}
export interface State {
    horses: Array<Horse>;
    selectedHorses: Array<Horse>;
    races: Array<Race>;
    isRaceGenarated: boolean;
    isRaceStarted: boolean,
    isRaceFinished: boolean;
    isRaceResultsReady: boolean;
}
export interface CurrentRaceIndexAndResult {
    currentRaceIndex: number,
    currentRaceResult: Array<Horse>
}