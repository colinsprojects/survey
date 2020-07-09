//Material Deisign used from https://vuetifyjs.com/en/getting-started/pre-made-layouts/
<template>
  <v-app id="inspire">
    <v-app-bar xs6 sm12 md18 app color="deep-purple lighten-2" dark>
      <v-spacer></v-spacer>

      <span class="mr-2">Survey</span>

      <v-btn depressed color="deep-purple lighten-2">
        <span class="mr-2">Change Language</span>
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </v-app-bar>
<v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-content v-if="show == 0">
        <v-btn @click="show = 1" v-show="!show">Start Simple Quiz</v-btn>

        <p>This quiz is designed to ask you about how you feel in regarding locations. You will be asked to choose between two different images for each question.</p>


        <v-btn @click="show = 2" v-show="!show">Start Complex Quiz</v-btn>
          <p>This quiz is designed to ask you about how you feel in regarding locations. You will be asked to rate an image for each question.</p>
      </v-content>

      <v-content v-if="show == 1">
        <SimpleQuiz></SimpleQuiz>
      </v-content>

      <v-content v-if="show == 2">
        <ComplexQuiz></ComplexQuiz>
      </v-content>
    </v-row>
</v-container>
  </v-app>
</template>

<script>
import ComplexQuiz from "./components/ComplexQuiz";
import SimpleQuiz from "./components/SimpleQuiz";
//import Test from "./components/Test"

export default {
  name: "App",

  components: {
    SimpleQuiz,
    ComplexQuiz
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