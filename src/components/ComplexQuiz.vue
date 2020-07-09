//Code used by this application: https://codeburst.io/create-a-quiz-with-vue-js-ed1e8e0e8294
//https://fireship.io/snippets/firestore-increment-tips/
<template>
  <div>
    <div v-for="(question, index) in questions" :key="question.questions">
      <div v-show="index === questionIndex">
          <v-container fluid xs6 sm12 md18>
        <v-row align="center" justify="center">
          <h1 class="display-1">Question {{questionIndex+1}}: {{question.question}}</h1>
                  </v-row>
          </v-container>
        <v-container fluid xs6 sm12 md18>
          <v-row align="center" justify="center">
            <v-card max-width="800" max-height="800">
              <v-img>
                <img :src="question.imageURL" />
              </v-img>
            </v-card>
          </v-row>

        </v-container>

          <v-row align="center" justify="center">
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
                    <td>
                      <v-radio-group row v-model="radioButton">
                        <v-radio label="1" color="red" value="1"></v-radio>
                      </v-radio-group>
                    </td>
                    <td>{{question.criteria1}}</td>
                  </tr>
                  <tr>
                    <td>
                      <v-radio-group row v-model="radioButton">
                        <v-radio label="2" color="red darken-3" value="2"></v-radio>
                      </v-radio-group>
                    </td>
                    <td>{{question.criteria2}}</td>
                  </tr>
                  <tr>
                    <td>
                      <v-radio-group row v-model="radioButton">
                        <v-radio label="3" color="indigo" value="3"></v-radio>
                      </v-radio-group>
                    </td>
                    <td>{{question.criteria3}}</td>
                  </tr>
                  <tr>
                    <td>
                      <v-radio-group row v-model="radioButton">
                        <v-radio label="4" color="indigo darken-3" value="4"></v-radio>
                      </v-radio-group>
                    </td>
                    <td>{{question.criteria4}}</td>
                  </tr>
                  <tr>
                    <td>
                      <v-radio-group row v-model="radioButton">
                        <v-radio label="5" color="orange" value="5"></v-radio>
                      </v-radio-group>
                    </td>
                    <td>{{question.criteria5}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>

          <v-spacer/>

          <v-row align="center" justify="center">
            <v-btn v-if="questionIndex > 0" v-on:click="backButton">Back</v-btn>
            <v-btn
              v-if="questionIndex < questions.length-1"
              v-on:click="nextButton"
              :disabled="radioButton == null"
              color ="purple"
            >Next</v-btn>
            <div v-if="questionIndex === questions.length-1">
              <v-btn color="green" v-on:click="submit">submit</v-btn>
            </div>
          </v-row>

        <v-container fluid xs6 sm12 md18>
     
          <v-row align="center" justify="center">
            <div v-if="questionIndex === 0">
              <p>To use this application, select a value, use the table to inform your decision</p>
            </div>
          </v-row>

            </v-container>
   
      </div>

      

      <v-footer color="deep-purple lighten-2" app>
        <v-spacer></v-spacer>

        <span class="white--text">{{ questions.length-questionIndex-1 }} questions remaining</span>
      </v-footer>
    </div>
    <div v-if="questionIndex === questions.length">
      <ThankYou></ThankYou>
    </div>
    {{ answers }}
  </div>
</template>


<script>
import { db, fv } from "@/firebase";
import ThankYou from "./ThankYou";

export default {
  components: {
    ThankYou
  },
  data() {
    return {
      questions: [],
      questionIndex: 0,
      radioButton: null,
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
    nextButton: function() {
      this.answers[this.questionIndex] = this.radioButton;
      this.questionIndex++;
    },
    // Go to previous question
    backButton: function() {
      this.questionIndex--;
    },
    submit: function() {
      this.answers[this.questionIndex] = this.radioButton;
      this.questionIndex++;

      //var arrayLength = this.answers.length;

      const increment = fv.increment(1);

      const answersRef = db
        .collection("ComplexQuiz")
        .doc("EQcmN6NiupISQHhKN8wn");

      answersRef.update({ votes1: increment });

      //for (let i = 0; i < arrayLength; i++)
    },
    calculate: function() {
      //var arrayLength = this.answers.length;

      const increment = fv.increment(1);

      const quizRef = db.collection("ComplexQuiz").doc("ted");

      // Atomically increment the population of the city by 50.
      quizRef.update({ count: increment });
    }
  }
};
</script>