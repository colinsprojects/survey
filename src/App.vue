//Material Deisign used from https://vuetifyjs.com/en/getting-started/pre-made-layouts/
<template>
  <v-app id="inspire">
    <v-app-bar app color="deep-purple lighten-2" dark>
      <v-spacer></v-spacer>

      <span class="mr-2">Survey</span>

      <v-btn depressed color="deep-purple lighten-2">
        <span class="mr-2">Change Language</span>
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content v-if="!show">
      <v-btn @click="show =!show">Start Quiz</v-btn>

      <p>This quiz is designed to ask you about how you feel in regarding locations. You will be asked to choose between two different images for each question.</p>
      <p>Please select your age bracket: </p>

      <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="40-50" value="40-50"></v-radio>
      <v-radio label="50-60" value="50-60"></v-radio>
       <v-radio label="60-70" value="60-70"></v-radio>
    </v-radio-group>
    <SimpleQuiz> </SimpleQuiz>
    </v-content>



    //<v-content v-if="show">
    <ComplexQuiz> </ComplexQuiz>
    </v-content>

  
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
   ComplexQuiz,
   // Test
  },

  data: function() {
    return {
      show: false
    };
  }
};
</script>

<style scoped>
</style>