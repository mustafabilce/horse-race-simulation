<template>
  <!-- <Tutorial/> -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <Topbar/>
      </div>
      <div class="col-lg-3 col-md-6">
        <HorseList/>
      </div>
      <div class="col-lg-5 col-md-6">
        <Simulation/>
      </div>
      <div class="col-lg-2 col-md-6">
        <Program/>
      </div>
      <div class="col-lg-2 col-md-6">
        <Results/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
