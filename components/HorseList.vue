<template>
  <div class="card" id="horseListComponent">
    <div class="card-body">
      <p class="mb-3 text-center pb-3 border-bottom">Horse List (1 - 20)</p>
      <table v-if="horses && horses.length > 0">
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
        <tr v-for="horse in horses" :key="horse.id" class="horseListTableElement">
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td>{{ horse.color }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Horse } from '../types'; // Horse tipini import ediyoruz

export default defineComponent({
  name: 'HorseList',
  
  data() {
    return {
      horses: [] as Horse[], // Horse[] tipini tanımladık
    };
  },

  mounted() {
    if(this.$store && this.$store.state){
      if(this.$store.state.horses && this.$store.state.horses.length > 0){
        this.horses = this.$store.state.horses as Horse[];
      }
    }
  },
});
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 4px;
  font-size: 12px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #28a745;
  color: white;
  font-size: 12px;
}
</style>
