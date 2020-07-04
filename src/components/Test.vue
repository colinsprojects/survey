//Code used by this application: https://codeburst.io/create-a-quiz-with-vue-js-ed1e8e0e8294

<template>
  <div>
    <div v-for="(item, index) in questions" :key="item.question">
      <div v-show="index === questionIndex">
        <h2>Question {{questionIndex+1}}: {{ question.questionName }}</h2>
        <v-img max-height="800" max-width="800">
          <img :src="item.imageURL" />
        </v-img>

        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-column>
                <v-radio-group row>
                  <v-radio label="1" color="red" value></v-radio>
                  <v-radio label="2" color="red darken-3" value="red darken-3"></v-radio>
                  <v-radio label="3" color="indigo" value="indigo"></v-radio>
                  <v-radio label="4" color="indigo darken-3" value="indigo darken-3"></v-radio>
                  <v-radio label="5" color="orange" value="orange"></v-radio>
                </v-radio-group>
              </v-column>
            </v-container>
          </v-card-text>
        </v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Grade</th>
                <th class="text-left">Criteria</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in grade" :key="item.score">
                <td>{{ item.score }}</td>
                <td>{{ item.criteria }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-btn v-if="questionIndex > 0" v-on:click="prev">prev</v-btn>

        <div v-show="index <= questionIndex">
          <v-btn v-on:click="next">next</v-btn>
        </div>
        <div v-show="index > questionIndex">
          <v-btn>submit</v-btn>
        </div>

        <h1> {{ questions.length }} </h1>

         <div v-show="questionIndex === questions.length">
           <h1>Quiz Finished </h1>
      </div>
    </div>

  </div>
</template>


<script>
import { db } from "@/firebase";



export default {
  data() {
    return {
      questions: [          
      ],
      grade: [
        {
          score: "5",
          criteria: "This image is very beautiful"
        },
        {
          score: "4",
          criteria: "This image is good but not beautiful"
        },
        {
          score: "3",
          criteria: "This image is average"
        },
        {
          score: "2",
          criteria: "This image sucks"
        },
        {
          score: "1",
          criteria: "This image is absolutely terrible"
        }
      ],
      questionIndex: 0,
    
      
    };
  },
  
   firestore: {
    questions: db.collection("questions")
  },
  created() {
    this.$bind("questions", db.collection("questions")).then(questions => {
      this.questions === questions;
    });
  },
  

  methods: {
    // Go to next question
    next: function() {
      this.questionIndex++;
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
    }
  },          
};
</script>