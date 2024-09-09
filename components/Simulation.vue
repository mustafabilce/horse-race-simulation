<template>
  <div class="card" id="simulationComponent">
    <div class="card-body">
      <p class="mb-3 text-center pb-3 border-bottom">Similuation</p>
      <div v-if="checkIsRaceFinish == false">
        <div class="race-track">
          <HorseComponent
            v-for="(horse, index) in currentRace.selectedHorses"
            :key="`${horse.id}-${currentRaceIndex}-${currentRace.run}-${index}`"
            :horse="horse"
            :index="index"
            @race-finished-from-horse="onRaceFinishedFromHorse"
          />
        </div>
        <div
          class="d-flex justify-content-between"
          v-if="
            currentRace.selectedHorses && currentRace.selectedHorses.length > 0
          "
        >
          <p></p>
          <p class="mb-0 mt-3 text-center text-danger font-weight-bold">
            {{ `${currentRace.run}ST Lap - ${currentRace.distance}m` }}
          </p>
          <p class="text-danger mb-0 mt-3 font-weight-bold">FINISH</p>
        </div>
      </div>
      <div v-else>
        <p class="mb-0">Race completed.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HorseComponent from "./Horse.vue";

import { defineComponent } from 'vue';
import { Horse, State, Race } from '../types';


export default defineComponent({
  components: { HorseComponent },
  data() {
    return {
      currentRaceIndex: 0,
      currentRaceResult: [] as Horse[],
    };
  },
  watch: {
    checkCurrentRace(newIndex) {
      if (this.checkCurrentRace == true) {
        this.increaseMethod();
      }
    },
  },
  computed: {
    currentRace() {
      this.currentRaceResult = [];

      return this.$store.state.races[this.currentRaceIndex];
    },
    checkCurrentRace() {
      if (
        this.$store.state.races[this.currentRaceIndex].isCompleted == true &&
        this.$store.state.races[this.currentRaceIndex].result &&
        this.$store.state.races[this.currentRaceIndex].result.length == 10
      ) {
        return true;
      } else {
        return false;
      }
    },
    checkIsRaceFinish(){
      if (this.$store.state.races) {
        const data: Race[] = this.$store.state.races;
        const found = data.filter((element) => element.isCompleted == true);
        if(found && found.length == 6){
          this.$store.dispatch("setIsRaceFinished");
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    increaseMethod() {
      if (this.currentRaceIndex < this.$store.state.races.length - 1) {
        this.currentRaceIndex++;
      }
    },
    onRaceFinishedFromHorse(item: Horse) {
      this.currentRaceResult.push(item);

      this.$store.dispatch("setRoundsResults", {
        currentRaceResult: this.currentRaceResult,
        currentRaceIndex: this.currentRaceIndex,
      } as any);
    },
    onRaceFinished() {
      if (this.currentRaceIndex < this.$store.state.races.length - 1) {
        this.currentRaceIndex++;
      }
    },
  },
});
</script>

<style scoped>
.race-track {
  display: flex;
  flex-direction: column;
  border-right: 2px solid red;
}
</style>
