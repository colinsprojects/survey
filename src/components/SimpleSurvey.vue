//Code used by this application to index the survey https://codeburst.io/create-a-quiz-with-vue-js-ed1e8e0e8294
//Code used in the database to increment the firebase data https://fireship.io/snippets/firestore-increment-tips/
  <template>
  <div>
    <div v-for="(question, index) in questions" :key="question.questions">
      <div v-show="index === questionIndex">
        <v-container fluid xs="6">
          <v-progress-linear
            color="teal accent-3"
            height="30"
            :value="questionIndex/(questions.length-1)*100"
          ></v-progress-linear>
          <p class="display-1">{{ questions.length-questionIndex-1 }} question(s) remaining</p>
        </v-container>

        <v-container fluid xs="6">
          <v-row align="center" justify="center">
            <h1 class="display-1">Question {{questionIndex+1}}: {{question.question}}</h1>
          </v-row>
        </v-container>

        <v-container xs="6">
          <v-row align="center" justify="center">
            <v-col flex>
              <v-card max-width="800">
                <v-img height="600">
                  <img :src="question.image1URL" />
                </v-img>
                <v-card-actions>
                  <v-radio-group row v-model="radioButton">
                    <v-radio
                      class="display-1"
                      label="Image 1"
                      color="light-blue darken-3"
                      value="1"
                    ></v-radio>
                  </v-radio-group>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col flex>
              <v-card max-width="800">
                <v-img height="600">
                  <img :src="question.image2URL" />
                </v-img>
                <v-card-actions>
                  <v-radio-group row v-model="radioButton">
                    <v-radio
                      class="display-1"
                      label="Image 2"
                      color="light-blue darken-3"
                      value="2"
                    ></v-radio>
                  </v-radio-group>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-spacer></v-spacer>

        <v-row align="center" justify="center">
          <v-radio-group row v-model="radioButton">
            <v-radio
              class="display-1"
              label="I can't decide"
              color="deep-orange darken-4"
              value="3"
            ></v-radio>
          </v-radio-group>
        </v-row>

        <div v-if="questionIndex === 0">
          <p class="display-1">
            <center>Click on the radio buttons to cast your vote, your vote will be saved at the end of the application</center>
          </p>

          <v-spacer></v-spacer>
        </div>

        <v-row align="center" justify="center">
          <v-btn x-large v-if="questionIndex > 0" v-on:click="backButton">Back</v-btn>
          <v-btn
            class="white--text"
            x-large
            v-if="questionIndex < questions.length-1"
            v-on:click="nextButton"
            :disabled="radioButton == null"
            color="light-blue darken-3"
          >Next</v-btn>
          <div v-if="questionIndex === questions.length-1">
            <v-btn x-large class="white--text" color="green" v-on:click="submit">submit</v-btn>
          </div>
        </v-row>
      </div>
    </div>
    <div v-show="questionIndex === questions.length">
      <ThankYou></ThankYou>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import firebase from "firebase/app";
import ThankYou from "./ThankYou";

export default {
  components: {
    ThankYou
  },
  data: function() {
    return {
      questions: [],
      questionIndex: 0,
      radioButton: null,
      answers: []
    };
  },
  //use vuefire api and bind the database to the array
  firestore: {
    questions: db.collection("SimpleSurvey")
  },
  created() {
    this.$bind("SimpleSurvey", db.collection("SimpleSurvey")).then(questions => {
      this.questions === questions;
    });
  },
  methods: {
    // Go to next question
    nextButton: function() {
      this.answers[this.questionIndex] = this.radioButton;
      this.questionIndex++;
      this.radioButton = null;
    },
    // Go to previous question
    backButton: function() {
      this.questionIndex--;
    },
    //using firebase increment
    submit: function() {
      this.answers[this.questionIndex] = this.radioButton;
      this.questionIndex++;

      const db = firebase.firestore();
      const increment = firebase.firestore.FieldValue.increment(1);

      var arrayLength = this.answers.length;

      //loop through all the answers from the quiz
      for (var i = 0; i < arrayLength; i++) {
        var count = i + 1;
        const answersRef = db.collection("SimpleSurvey").doc("" + count);
        if (this.answers[i] == 1) answersRef.update({ image1Votes: increment });
        else if (this.answers[i] == 2)
          answersRef.update({ image2Votes: increment });
        else if (this.answers[i] == 3)
          answersRef.update({ neutralVotes: increment });
      }
    }
  }
};
</script>

<style>
.v-label {
  font-size: 24px
}

</style>
