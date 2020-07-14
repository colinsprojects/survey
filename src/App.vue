//Material Deisign template used from https://vuetifyjs.com/en/getting-started/pre-made-layouts/
<template>
  <v-app id="app">
    <v-app-bar color="deep-purple lighten-2" dark>
      <v-toolbar-title>Simple Survey</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn x-large depressed color="deep-purple lighten-2" @click="show = 0">Return Home</v-btn>
    </v-app-bar>

    <v-container fill-height>
      <v-content v-if="show == 0">
        <p
          class="display-1"
        >The following survey is designed to ask you to rate certain images based on how you perceive them.</p>
        <p class="display-1">Please keep in mind that your data will be collected.</p>

        <v-spacer></v-spacer>

        <v-btn
          class="white--text"
          x-large
          color="light-blue darken-3"
          @click="show = 1"
          v-show="!show"
        >Start Survey</v-btn>
      </v-content>

      <v-content v-if="show == 1">
        <SimpleSurvey></SimpleSurvey>
      </v-content>

      <v-footer color="deep-purple lighten-2" app></v-footer>
    </v-container>
  </v-app>
</template>

<script>
import SimpleSurvey from "./components/SimpleSurvey";
//import Test from "./components/Test"

export default {
  name: "App",

  components: {
    SimpleSurvey
    // Test
  },

  data: function() {
    return {
      show: 0
    };
  }
};
</script>

<style scoped>
</style>