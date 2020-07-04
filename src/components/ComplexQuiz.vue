//Code used by this application: https://codeburst.io/create-a-quiz-with-vue-js-ed1e8e0e8294

<template>
  <div>
    <div v-for="(question, index) in questions" :key="question.questions">
      <div v-show="index === questionIndex">
        <h1>Question {{questionIndex+1}}: {{question.question}}</h1>
        <v-img max-height="400" max-width="800">
          <img :src="question.imageURL" />
        </v-img>

        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-column>
                <v-radio-group row v-model="radioButton">
                  <v-radio label="1" color="red" value=1></v-radio>
                  <v-radio label="2" color="red darken-3" value="2"></v-radio>
                  <v-radio label="3" color="indigo" value="3"></v-radio>
                  <v-radio label="4" color="indigo darken-3" value="4"></v-radio>
                  <v-radio label="5" color="orange" value="5"></v-radio>
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
              <tr>
              <td>1</td>
              <td>{{question.criteria1}}</td>
              </tr>
              <tr>
              <td>2</td>
              <td>{{question.criteria2}}</td>
              </tr>
              <tr>
              <td>3</td>
              <td>{{question.criteria3}}</td>
              </tr>
              <tr>
              <td>4</td>
              <td>{{question.criteria4}}</td>
              </tr>
              <tr>
              <td>5</td>
              <td>{{question.criteria5}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <div v-if="questionIndex === 0">
          <p>To use this application, select a value, use the table to inform your decision </p>
    
          </div>

    

        <v-btn v-if="questionIndex > 0" v-on:click="prev">prev</v-btn>
        <v-btn v-if="questionIndex < questions.length-1" v-on:click="next" :disabled="radioButton == 'null'">next</v-btn>
        <div v-if="questionIndex === questions.length-1">
        <v-btn color="green" v-on:click="submit">submit</v-btn>
        </div>
      
      </div>

       <v-footer color="deep-purple lighten-2" app>
      <v-spacer></v-spacer>

      <span class="white--text">{{ questions.length-questionIndex-1 }} questions remaining</span>
    </v-footer>
    </div>
    <div v-if="questionIndex === questions.length">
      <h1>Thank you participating in the quiz, if you would like to partipcate in our giveaway please enter your details below:</h1>
    </div>

               <p>{{ radioButton || 'null' }}</p>
               <v-btn> calculate </v-btn>

    {{ answers }}
    {{ questionIndex}}



    
  </div>

  
</template>


<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      questions: [],
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
      radioButton: "",
      answers: []
    };
  },

  firestore: {
    questions: db.collection("ComplexQuiz")
  },
  created() {
    this.$bind("ComplexQuiz", db.collection("ComplexQuiz")).then(questions => {
      this.questions === questions;
    });
  },

  methods: {
    // Go to next question
    next: function() {
      this.questionIndex++;
      this.answers.splice(this.questionIndex, 1, this.radioButton);
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
    },
    submit: function() {
      this.questionIndex++;
    }         
    
  
  }
};
</script>