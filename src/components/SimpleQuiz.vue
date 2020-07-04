  //Component for Simple Quiz option
  //Uses code from Fireship's Firestore tutorial https://www.youtube.com/watch?v=wvRVfyPKOA0&t=274s
  //Uses code from Mazipan's vue-image select repository https://github.com/mazipan/vue-select-image

  <template>
  <div class="SimpleQuiz">
    <div>
      <h1>Question {{questionNumber}}</h1>
      <div v-for="question in questions" :key="question.questions">
      
         <v-img max-height="800" max-width="800">
           
          <img :src="question.questionName" />
        </v-img>
      </div>

      <div v-if="questionNumber == 1">
        <vue-select-image
          :dataImages="question1Images"
          h="600"
          w="1000"
          @onselectimage="incrementCounter"
        ></vue-select-image>
        <v-container>
          <v-btn-toggle color="deep-purple">
            <v-btn @click="neutralCounter">Neutral</v-btn>
          </v-btn-toggle>
        </v-container>
      </div>

      <div v-if="questionNumber == 2">
        <vue-select-image
          :dataImages="question2Images"
          h="600"
          w="1000"
          @onselectimage="incrementCounter"
        ></vue-select-image>
        <v-container>
          <v-btn-toggle color="deep-purple">
            <v-btn @click="neutralCounter">Neutral</v-btn>
          </v-btn-toggle>
        </v-container>
      </div>

      <div v-if="questionNumber == 3">
        <vue-select-image
          :dataImages="question3Images"
          h="600"
          w="1000"
          @onselectimage="incrementCounter"
        ></vue-select-image>
        <v-container>
          <v-btn-toggle color="deep-purple">
            <v-btn @click="neutralCounter">Neutral</v-btn>
          </v-btn-toggle>
        </v-container>
      </div>
    </div>

    <div class="text-center">
      <v-spacer></v-spacer>
      <v-btn @click="backButton" color="deep-purple accent-3">Back</v-btn>

      <v-btn @click="nextButton" color="blue lighten-2">Next</v-btn>
    </div>

    <div>
      1st image voted: {{ counter1 }}
      2nd image voted: {{ counter2}}
      Neutral vote{{ counter3}}
    </div>

    <v-footer color="deep-purple lighten-2" app>
      <v-spacer></v-spacer>

      <span class="white--text">{{ 5 - questionNumber }} questidasdasdsons left</span>
    </v-footer>
  </div>
</template>

  <script>
import VueSelectImage from "vue-select-image";
import { db } from "@/firebase";
// add stylesheet
require("vue-select-image/dist/vue-select-image.css");

export default {
  components: { VueSelectImage },

  data: function() {
    return {
      questions: [               
      ],
      questionNumber: 1,
      questionIndex: 0,
      counter1: 0,
      counter2: 0,
      counter3: 0,
      imageSelected: { id: "", src: "", title: "" },
      question1Images: [
        {
          id: "1",
          src:
            "https://www.sydney.com/sites/sydney/files/styles/landscape_992x558/public/2019-08/164693.jpg?itok=Dx6TfEd6",
          title: "Question 1"
        },
        {
          id: "2",
          src:
            "https://i2.au.reastatic.net/800x600/789b33ca91abe2fa163c44a8ef7759b1323a1775e386aa13b7c2b2164af01124/image.jpg",
          title: "Question 1"
        }
      ],
      question2Images: [
        {
          id: "3",
          src:
            "https://www.rd.com/wp-content/uploads/2017/12/the-true-story-behind-the-mysterious-mcdonalds-gold-card-673955074-Vytautas-Kielaitis-ft.jpg",
          title: "Question 2"
        },
        {
          id: "4",
          src:
            "https://pbs.twimg.com/profile_images/1118290981806153728/xF3xyqit_400x400.png",
          title: "Question 2"
        }
      ],
      question3Images: [
        {
          id: "5",
          src:
            "https://media.istockphoto.com/vectors/sad-face-icon-unhappy-face-symbol-vector-id934714316",
          title: "Question 3"
        },
        {
          id: "6",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png",
          title: "Question 3"
        }
      ],
      question4Images: [
        {
          id: "7",
          src:
            "https://i2.au.reastatic.net/800x600/789b33ca91abe2fa163c44a8ef7759b1323a1775e386aa13b7c2b2164af01124/image.jpg",
          title: "Question 4"
        },
        {
          id: "8",
          src:
            "https://i2.au.reastatic.net/800x600/789b33ca91abe2fa163c44a8ef7759b1323a1775e386aa13b7c2b2164af01124/image.jpg",
          title: "Question 4"
        }
      ],
      question5Images: [
        {
          id: "9",
          src:
            "https://i2.au.reastatic.net/800x600/789b33ca91abe2fa163c44a8ef7759b1323a1775e386aa13b7c2b2164af01124/image.jpg",
          title: "Question 5"
        },
        {
          id: "10",
          src:
            "https://i2.au.reastatic.net/800x600/789b33ca91abe2fa163c44a8ef7759b1323a1775e386aa13b7c2b2164af01124/image.jpg",
          title: "Question 5"
        }
      ],
      votesArray: []
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
    backButton: function() {
      if (this.questionNumber > 1) this.questionNumber--;
      this.questionIndex--;
    },
    nextButton: function() {
      this.questionNumber++;
      this.questionIndex++;
    },
    incrementCounter: function(data) {
      this.imageSelected = data;
      if (data.id == 1) this.counter1++;
      else if (data.id == 2) this.counter2++;
    },

    neutralCounter: function() {
      this.counter3++;
    }
  

   

    
  }
};
</script>

<style lang="scss">
.ion {
  &:hover {
    color: #4f8ef7;
  }
}
.label-image {
  font-size: 0.7rem;
}
.vue-select-image {
  display: flex;
  justify-content: center;
}
pre,
code {
  text-align: left;
  max-width: 500px;
  margin: auto;
}

.VueSelectImage {
  ::v-deep .vue-select-image__thumbnail--active {
    background: #50af2b;
    &:after {
      content: "✅";
      position: absolute;
      color: #50af2b;
      margin-top: -190px;
      margin-left: 70px;
      font-size: 20px;
      border-radius: 3px;
    }
  }
}

.adswrapper {
  width: 30%;
  margin: 0 auto;
  text-align: center;
}
</style>


