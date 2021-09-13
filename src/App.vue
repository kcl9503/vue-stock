<template>
  <v-app>
    <v-main>
      <SearchBar />
      <Chart />
    </v-main>
  </v-app>
</template>

<script>
import SearchBar from "./components/searchBar/searchBar";
import Chart from "./components/chart"
export default {
  name: "App",

  components: {
    SearchBar,
    Chart
  },

  data: () => ({
    //
  }),
};
</script>
