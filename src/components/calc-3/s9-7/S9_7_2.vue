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
                sign: this.range(1, 2) == 2 ? 'sin' : 'cos',
                multiplier: this.range(1, 10)
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

            if (this.problem.multiplier == 1) {
                this.renderMath(
                    document.getElementById('generate-1'),
                    `f(x)=\\${this.problem.sign}\\left(x\\right),\\ x_{0}=\\frac{\\pi}{2}`)
            } else {
                this.renderMath(
                    document.getElementById('generate-1'),
                    `f(x)=\\${this.problem.sign}\\left(${this.problem.multiplier}x\\right),\\ x_{0}=\\frac{\\pi}{${this.problem.multiplier * 2}}`)
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

            this.tips = false
            document.getElementById('tips-1').innerHTML = ""
            document.getElementById('tips-2').innerHTML = ""

            // generate-1
            if (this.problem.sign == 'sin') this.problem.sign = 'cos'
            else this.problem.sign = 'sin'
            var newNum = this.range(1, 10);
            while (this.problem.multiplier == newNum) newNum = this.range(1, 10)
            this.problem.multiplier = newNum
            if (this.problem.multiplier == 1) {
                this.renderMath(
                    document.getElementById('generate-1'),
                    `f(x)=\\${this.problem.sign}\\left(x\\right),\\ x_{0}=\\frac{\\pi}{2}`)
            } else {
                this.renderMath(
                    document.getElementById('generate-1'),
                    `f(x)=\\${this.problem.sign}\\left(${this.problem.multiplier}x\\right),\\ x_{0}=\\frac{\\pi}{${this.problem.multiplier * 2}}`)
            }
        },
        submitAnswer() {
            // SIN
            if (this.problem.sign == 'sin') {
                // Check Quadratic
                var latexQuadratic = this.elements.inputQuadratic.latex();
                if (latexQuadratic == `1-\\frac{${this.problem.multiplier * this.problem.multiplier}}{2}\\left(x-\\frac{\\pi}{${this.problem.multiplier * 2}}\\right)^2`) {
                    // Answer for Fractions
                    this.answer.quadratic = true
                }
                else if ((latexQuadratic == `1-${(this.problem.multiplier * this.problem.multiplier) / 2}\\left(x-\\frac{\\pi}{${this.problem.multiplier * 2}}\\right)^2` && ((this.problem.multiplier * this.problem.multiplier) % 2 == 0))) {
                    // Answer for Whole Numbers
                    this.answer.quadratic = true
                } else {
                    this.answer.quadratic = false
                }

                // Check Linear
                var latexLinear = this.elements.inputLinear.latex();
                if (latexLinear == `1`) {
                    this.answer.linear = true
                } else {
                    this.answer.linear = false
                }
            } else {
                // Check Quadratic
                var latexQuadratic = this.elements.inputQuadratic.latex();
                if (latexQuadratic == `-${this.problem.multiplier}\\left(x-\\frac{\\pi}{${this.problem.multiplier * 2}}\\right)`) {
                    this.answer.quadratic = true
                } else {
                    this.answer.quadratic = false
                }

                // Check Linear
                var latexLinear = this.elements.inputLinear.latex();
                if (latexLinear == `0`) {
                    this.answer.linear = true
                } else {
                    this.answer.linear = false
                }
            }
        },
        showTips() {
            this.tips = !this.tips
            if (this.tips) {
                if (this.problem.sign == 'sin') {
                    this.renderMath(
                        document.getElementById('tips-1'),
                        `1-\\frac{?}{2}\\left(x-\\frac{\\pi}{?}\\right)^2`)
                    this.renderMath(
                        document.getElementById('tips-2'),
                        `?`)
                } else {
                    this.renderMath(
                        document.getElementById('tips-1'),
                        `?\\left(x-\\frac{\\pi}{?}\\right)`)
                    this.renderMath(
                        document.getElementById('tips-2'),
                        `?`)
                }

            } else {
                document.getElementById('tips-1').innerHTML = ""
                document.getElementById('tips-2').innerHTML = ""
            }
        }
    }
}
</script>