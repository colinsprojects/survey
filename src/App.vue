//Material Deisign used from https://vuetifyjs.com/en/getting-started/pre-made-layouts/
<template>
 <v-app id="inspire">
     <v-app-bar
      app
      color="deep-purple lighten-2"
      dark
    >
      <v-spacer></v-spacer>

      <span class="mr-2"> Survey </span>

      
    <v-btn depressed color="deep-purple lighten-2">
      <span class="mr-2">Change Language     </span>
           <v-icon>mdi-web</v-icon>

    </v-btn>
      </v-app-bar>

      <v-content v-if="!show">
        <v-btn @click="show =!show"> Start Quiz </v-btn>

      <p>This quiz is designed to ask you about how you feel in regarding locations. You will be asked to choose between two different images for each question.</p>
      </v-content>

    
  

    <v-content v-if="show">
     <SimpleQuiz> </SimpleQuiz>
    </v-content>
 
   

    <v-footer color="deep-purple lighten-2" app>

    </v-footer>
     


  </v-app>

  

  
  
  
   
</template>

<script>
import SimpleQuiz from './components/SimpleQuiz';


export default {
  name: 'App',

  components: {
    SimpleQuiz
  },

  data: function() {
    return{
    show: false
    }
  }
}

  </script>





<style scoped>

</style>