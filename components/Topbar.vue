<template>
  <div
    class="bg-primary d-flex justify-content-between align-items-center p-2 mb-3"
  >
    <p class="mb-0 text-white">Horse Racing Simulator</p>
    <div>
      <button class="btn btn-light btn-sm" @click="generateProgram" id="generateProgramButton">
        Generate Program
      </button>
      <button :disabled="!isProgramReady" class="btn btn-light btn-sm" @click="startPauseRace" id="startRaceButton">
        Start / Pause
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HorseControlPanel',
  computed: {
    isProgramReady(){
      if(this.$store && this.$store.state){
        if(this.$store.state.horses && this.$store.state.horses.length > 0){
          return this.$store.state.isRaceGenarated;
        }
      }
    }
  },
  methods: {
    generateProgram(): void {
      if(this.$store && this.$store.state){
        if(this.$store.state){
          this.$store.dispatch("getRandom10Horse");
        }
      }
    },
    
    startPauseRace(): void {
      this.$store.dispatch("startOrPauseRace");
    },
  },
});
</script>
