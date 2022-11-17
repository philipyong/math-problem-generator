<template>
  <main>
    <p>Solve <span id="problem">ax^2 + bx + c = 0</span>.</p>
    <p><span id="answer">x=</span></p>
    <button v-on:click="consoleAnswer">Check</button>
    <span id="fill-in-the-blank">\sqrt{ \MathQuillMathField{x}^2 + \MathQuillMathField{y}^2 }</span>
  </main>
</template>

<script>
export default {
  data() {
    return {
      answer: ""
    }
  },
  mounted() {
    this.displayMath()
  },
  methods: {
    displayMath() {
      // LOAD STATIC MATH QUESTION
      var problemSpan = document.getElementById('problem');
      MQ.StaticMath(problemSpan);

      // LOAD MATH INPUT
      var answerSpan = document.getElementById('answer');
      var answerMathField = MQ.MathField(answerSpan, {
        handlers: {
          edit: function () {
            this.answer = answerMathField.latex(); // Get entered math in LaTeX format
            console.log(answerMathField.latex())
            // checkAnswer(enteredMath);
          }
        }
      });


      var fillInTheBlank = MQ.StaticMath(document.getElementById('fill-in-the-blank'));
      fillInTheBlank.innerFields[0].latex() // => 'x'
      fillInTheBlank.innerFields[1].latex() // => 'y'

    },
    consoleAnswer() {
      console.log(this.answer)
    }
  }
}
</script>

<style scoped>

</style>