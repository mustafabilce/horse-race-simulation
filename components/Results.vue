<template>
  <div class="card">
    <div class="card-body">
      <p class="mb-3 text-center pb-3 border-bottom">Results</p>
      <div v-if="isRaceResultsReady" class="my-container">
        <div
          v-for="race in races"
          :key="race.run"
          class="mb-3"
        >
          <div v-if="race.result && race.result.length > 0">
            <div class="bg-danger rounded">
              <p class="mb-0 text-white small px-3 py-2">
                {{ `${race.run}ST Lap - ${race.distance}m` }}
              </p>
            </div>
            <table>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
              <tr v-for="(horse, index) in race.result" :key="horse.id">
                <td>{{ index + 1 }}</td>
                <td>{{ horse.name }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Horse {
  id: number;
  name: string;
  color: string;
  condition: number;
}

interface Race {
  run: number;
  distance: number;
  selectedHorses: Horse[],
  result: Horse[];
  isCompleted: boolean
}

export default Vue.extend({
  computed: {
    races(): Race[] {
      return this.$store.state.races;
    },
    isRaceResultsReady(): boolean {
      return this.$store.state.isRaceResultsReady;
    },
    results(): Horse[] | undefined {
      const firstRace = this.$store.state.races?.[0];
      if (firstRace?.result && firstRace.result.length > 0) {
        return JSON.parse(JSON.stringify(firstRace.result));
      }
      return undefined;
    },
  },
});
</script>

<style lang="css">
.my-container {
  max-height: 500px;
  overflow-x: scroll;
}
</style>
