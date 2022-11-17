<template>
    <div class="problem-container">
        <button class="btn btn-another" v-on:click="practiceAnother">Practice Another</button>
        <p>Find the local quadratic approximation of <span class="problem-tex">f</span> at <span class="problem-tex">x =
                x_{0}</span>, and use that
            approximation to find the local linear approximation of <span class="problem-tex">f</span> at <span
                class="problem-tex">x_{0}</span>.
        </p>
        <p class="problem-tex-center">
            <span id="generate-1"></span>
        </p>
        <p>Enter Approximation Formulas below.</p>
        <p>Local Quadratic Approx = <span class="problem-tex-answer mq-editable-field mq-math-mode"
                :class="{ 'answer-correct': answer.quadratic, 'answer-wrong': answer.quadratic == false}"
                id="input-quadratic"></span></p>
        <span id="tips-1"></span>
        <p>Local Linear Approx = <span class="problem-tex-answer mq-editable-field mq-math-mode"
                :class="{ 'answer-correct': answer.linear, 'answer-wrong': answer.linear == false}"
                id="input-linear"></span>
        </p>
        <span id="tips-2"></span>
        <div class="problem-submit">
            <button class="btn btn-submit" v-on:click="submitAnswer">Submit</button>
            <button class="btn btn-tips" v-on:click="showTips">Tips / How to Format Input</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //
            tips: false,
            // Generate Problem Values
            problem: {
                multiplier: this.range(1, 9),
            },
            // Problem Elements
            elements: {
                // Static Math Texts
                problemTexs: null,
                // Math Input Holders
                inputQuadratic: null,
                inputLinear: null,
            },
            // User Math Inputs
            answer: {
                quadratic: null,
                linear: null,
            },
        }
    },
    mounted() {
        this.setup()
    },
    methods: {
        range(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        // Render Math Spans
        renderMath(element, latex) {
            var mathSpan = latex
            element.innerHTML = mathSpan
            MQ.StaticMath(element)
        },
        setup() {
            // LOAD STATIC MATH TEXT
            this.elements.problemTexs = document.getElementsByClassName('problem-tex')
            Array.prototype.forEach.call(this.elements.problemTexs, function (texSpan) {
                MQ.StaticMath(texSpan);
            });

            // generate-1
            if (this.problem.multiplier == 1) {
                this.renderMath(
                    document.getElementById('generate-1'),
                    `f(x)=\\sqrt{x},\\ x_{0}=1`)
            } else {
                this.renderMath(
                    document.getElementById('generate-1'),
                    `f(x)=\\sqrt{${this.problem.multiplier}x},\\ x_{0}=\\frac{1}{${this.problem.multiplier}}`)
            }

            // LOAD MATH INPUT
            this.elements.inputQuadratic = MQ.MathField(document.getElementById('input-quadratic'));
            this.elements.inputLinear = MQ.MathField(document.getElementById('input-linear'));
        },
        practiceAnother() {
            // Reset State
            this.answer.quadratic = null
            this.answer.linear = null

            this.elements.inputQuadratic.latex("")
            this.elements.inputLinear.latex("")

            document.getElementById('tips-1').innerHTML = ""
            document.getElementById('tips-2').innerHTML = ""

            // generate-1
            var newNum = this.range(1, 9);
            while (this.problem.power == newNum) newNum = this.range(1, 9)
            this.problem.power = newNum
            this.renderMath(
                document.getElementById('generate-1'),
                `f(x)=e^{-{${this.problem.power}}x},\\ x_{0}=0`)
        },
        submitAnswer() {
            // Check Quadratic
            var latexQuadratic = this.elements.inputQuadratic.latex();
            console.log(latexQuadratic)

            if (latexQuadratic == `1+\\frac{${this.problem.multiplier}}{2}\\left(x-\\frac{1}{${this.problem.multiplier}}\\right)-\\frac{${this.problem.multiplier * this.problem.multiplier}}{8}\\left(x-\\frac{1}{${this.problem.multiplier}}\\right)^2`) {
                // Answer for Fractions
                this.answer.quadratic = true
            } else if ((latexQuadratic == `1-${this.problem.power}x+${(this.problem.power * this.problem.power) / 2}x^2` && ((this.problem.power * this.problem.power) % 2 == 0))) {
                // Answer for Lowest Form Fractions
                this.answer.quadratic = true
            } else if ((latexQuadratic == `1-${this.problem.power}x+${(this.problem.power * this.problem.power) / 2}x^2` && ((this.problem.power * this.problem.power) % 2 == 0))) {
                // Answer for Whole Numbers
                this.answer.quadratic = true
            } else {
                this.answer.quadratic = false
            }

            // Check Linear
            var latexLinear = this.elements.inputLinear.latex();
            // Answer for Fractions
            if (latexLinear == `1-${this.problem.power}x`) {
                this.answer.linear = true
            } else {
                this.answer.linear = false
            }
        },
        showTips() {
            this.tips = !this.tips
            if (this.tips) {
                this.renderMath(
                    document.getElementById('tips-1'),
                    `1-?x+\\frac{?}{2}x^2`)
                this.renderMath(
                    document.getElementById('tips-2'),
                    `1-?x`)
            } else {
                document.getElementById('tips-1').innerHTML = ""
                document.getElementById('tips-2').innerHTML = ""
            }
        }
    }
}
</script>