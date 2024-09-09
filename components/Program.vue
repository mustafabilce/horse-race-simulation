<template>
  <div class="card" id="programComponent">
    <div class="card-body">
      <p class="mb-3 text-center pb-3 border-bottom">Program</p>
      <div v-if="isRaceGenarated" class="my-container">
        <div
          v-for="race in this.$store.state.races"
          :key="race.run"
          class="mb-3 raceElement"
        >
          <div>
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
              <tr v-for="(horse, index) in race.selectedHorses" :key="horse.id" class="raceElementTableItem">
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

export default Vue.extend({
  computed: {
    isRaceGenarated() {
      return this.$store.state.isRaceGenarated;
    },
  },
  methods: {
    generateProgram() {
      this.$store.dispatch("getRandom10Horse");
    },
  },
});
</script>
