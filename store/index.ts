import { GetterTree, ActionTree, MutationTree, ActionContext } from "vuex";
import { State, CurrentRaceIndexAndResult } from '@/types';

export const state = () => ({
  horses: [
    {
      id: 1,
      name: "Şimşek",
      color: "Tomato", // #FF5733
      condition: 85,
    },
    {
      id: 2,
      name: "Rüzgar",
      color: "LimeGreen", // #33FF57
      condition: 92,
    },
    {
      id: 3,
      name: "Fırtına",
      color: "RoyalBlue", // #3357FF
      condition: 78,
    },
    {
      id: 4,
      name: "Kartal",
      color: "DeepPink", // #FF33A1
      condition: 64,
    },
    {
      id: 5,
      name: "Yıldırım",
      color: "DarkOrange", // #FFA533
      condition: 91,
    },
    {
      id: 6,
      name: "Şahin",
      color: "MediumSpringGreen", // #33FFA5
      condition: 88,
    },
    {
      id: 7,
      name: "Sürat",
      color: "RebeccaPurple", // #A533FF
      condition: 79,
    },
    {
      id: 8,
      name: "Kasırga",
      color: "LightCoral", // #F08080
      condition: 73,
    },
    {
      id: 9,
      name: "Bora",
      color: "Turquoise", // #40E0D0
      condition: 82,
    },
    {
      id: 10,
      name: "Şahlan",
      color: "HotPink", // #FF69B4
      condition: 67,
    },
    {
      id: 11,
      name: "Süvari",
      color: "Black", // #000000
      condition: 90,
    },
    {
      id: 12,
      name: "Yaman",
      color: "MediumSlateBlue", // #7B68EE
      condition: 81,
    },
    {
      id: 13,
      name: "Deniz",
      color: "SkyBlue", // #87CEEB
      condition: 74,
    },
    {
      id: 14,
      name: "Gökhan",
      color: "OrangeRed", // #FF4500
      condition: 86,
    },
    {
      id: 15,
      name: "Kartopu",
      color: "PaleTurquoise", // #AFEEEE
      condition: 65,
    },
    {
      id: 16,
      name: "Şehzade",
      color: "Orchid", // #DA70D6
      condition: 93,
    },
    {
      id: 17,
      name: "Poyraz",
      color: "DarkSlateBlue", // #483D8B
      condition: 89,
    },
    {
      id: 18,
      name: "Bulut",
      color: "MediumSeaGreen", // #3CB371
      condition: 77,
    },
    {
      id: 19,
      name: "Rüzgar Gülü",
      color: "SlateBlue", // #6A5ACD
      condition: 83,
    },
    {
      id: 20,
      name: "Sonbahar",
      color: "Gold", // #FFD700
      condition: 87,
    },
  ],
  selectedHorses: [],
  races: [
    {
      run: 1,
      distance: 1200,
      selectedHorses: [],
      result: [],
      isCompleted: false
    },
    {
      run: 2,
      distance: 1400,
      selectedHorses: [],
      result: [],
      isCompleted: false
    },
    {
      run: 3,
      distance: 1600,
      selectedHorses: [],
      result: [],
      isCompleted: false
    },
    {
      run: 4,
      distance: 1800,
      selectedHorses: [],
      result: [],
      isCompleted: false
    },
    {
      run: 5,
      distance: 2000,
      selectedHorses: [],
      result: [],
      isCompleted: false
    },
    {
      run: 6,
      distance: 2200,
      selectedHorses: [],
      result: [],
      isCompleted: false
    },
  ],
  isRaceGenarated: false,
  isRaceStarted: false,
  isRaceFinished: false,
  isRaceResultsReady: false,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  // name: (state) => state.name,
};

export const mutations: MutationTree<RootState> = {
  SET_RACES: (state: State, generatedRaces: []) => (state.races = generatedRaces, state.isRaceGenarated = true),
  START_RACE: (state: State) => (state.isRaceStarted = true),
  END_RACE: (state: State) => (state.isRaceStarted = false),
  SET_RACE_STATUS: (state: State) => (state.isRaceFinished = true),
  SET_CURRENT_RACE_RESULT(state: State, data: { currentRaceIndex: number, currentRaceResult: any[] }) {
    if (data.currentRaceIndex >= 0 && data.currentRaceIndex < state.races.length) {
      const race = state.races[data.currentRaceIndex];
      race.result = data.currentRaceResult;
      race.isCompleted = true;
      state.isRaceResultsReady = true;
    } else {
      console.error('Invalid race index:', data.currentRaceIndex);
    }
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async getRandom10Horse({ commit, state }: ActionContext<State, State>) {
    const copiedHorses = JSON.parse(JSON.stringify(state.horses));
    
    const generatedRaces = [];
    const copiedRaces = JSON.parse(JSON.stringify(state.races));
    for (let i = 0; i < copiedRaces.length; i++) {
      const element = copiedRaces[i];
      const randomHorses = copiedHorses.sort(() => Math.random() - 0.5).slice(0, 10);
      element.selectedHorses = randomHorses;
      generatedRaces.push(element);
    }

    commit("SET_RACES", generatedRaces);
    commit("END_RACE");
  },
  async startOrPauseRace({ commit }: ActionContext<State, State>) {
    commit("START_RACE");
  },
  async setRoundsResults({ commit }: ActionContext<State, State>, payload: CurrentRaceIndexAndResult) {
    if(payload.currentRaceResult && payload.currentRaceResult.length === 10){
      commit("SET_CURRENT_RACE_RESULT", payload);
    }
  },
  async setIsRaceFinished({ commit }: ActionContext<State, State>) {
    commit("SET_RACE_STATUS");
  },
};
