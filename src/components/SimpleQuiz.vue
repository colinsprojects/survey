  //Component for Simple Quiz option
  //Uses code from Fireship's Firestore tutorial https://www.youtube.com/watch?v=wvRVfyPKOA0&t=274s

  <template>
  <div class="SimpleQuiz">
    <div v-for="(question, index) in questions" :key="question.questions">
      <div v-show="index === questionIndex">
         <v-container fluid xs="6">
        <v-row  align="center" justify="center">
        <h1 class="display-1">Question {{questionIndex+1}}: {{question.question}}</h1>
        </v-row>
         </v-container>

        <v-container fluid xs="6">
          <v-row align="center" justify="center">
            <v-col flex>
              <v-card max-width="800">
                <v-img>
                  <img :src="question.image1URL" />
                </v-img>
                <v-card-actions>
                  <v-radio-group row v-model="radioButton">
                    <v-radio label="Image 1" color="red" value="1"></v-radio>
                  </v-radio-group>
                </v-card-actions>
              </v-card>

            </v-col>

            <v-col flex>
              <v-card max-width="800">
                <v-img>
                  <img :src="question.image2URL" />
                </v-img>
                <v-card-actions>
                  <v-radio-group row v-model="radioButton">
                    <v-radio label="Image 2" color="indigo" value="2"></v-radio>
                  </v-radio-group>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-spacer></v-spacer>
       
         <v-row align="center" justify="center">

         <v-radio-group row v-model="radioButton">
          <v-radio label="I can't decide" color="indigo" value="3"></v-radio>
        </v-radio-group>

        

         </v-row>

 

        <v-row align="center" justify="center">
          <v-btn v-if="questionIndex > 0" v-on:click="backButton">Back</v-btn>
          <v-btn
            v-if="questionIndex < questions.length-1"
            v-on:click="nextButton"
            :disabled="radioButton == null"
          >Next</v-btn>
          <div v-if="questionIndex === questions.length-1">
            <v-btn color="green" v-on:click="submit">submit</v-btn>
          </div>
        </v-row>
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
import { db } from "@/firebase";
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

  firestore: {
    questions: db.collection("SimpleQuiz")
  },
  created() {
    this.$bind("SimpleQuiz", db.collection("SimpleQuiz")).then(questions => {
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
    }
  }
};
</script>

<style>
img {
  background-size: cover !important;
}
</style>
