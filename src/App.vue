<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1 id="title">Calculus 3 Gym</h1>
  </header>

  <div id="main-layout">
    <div id="navbar">
      <nav>
        <RouterLink class="routerlink" to="/">Home</RouterLink>
        <RouterLink class="routerlink" to="/calc-3/s9-7">Section 9.7</RouterLink>
      </nav>
    </div>
    <div id="workspace">
      <RouterView />
    </div>
  </div>

</template>

<style>
html {
  position: relative;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: cadetblue;
  height: 60px;
}

#title {
  text-align: center;
  margin: 0;
  color: white;
}

#main-layout {
  display: flex;
  height: calc(100vh - 60px);
}

#navbar {
  max-width: 200px;
  background-color: floralwhite;
  padding: 20px 10px;
}

#navbar nav {
  display: flex;
  flex-direction: column;
}

a:link {
  text-decoration: none;
}


a:visited {
  text-decoration: none;
}


a:hover {
  text-decoration: none;
}


a:active {
  text-decoration: none;
}

a {
  margin: 10px;
  color: lightblue;
}

.router-link-active {
  color: black;
}

#workspace {
  padding: 20px;
  margin: auto;
}

.question-selector {
  display: flex;
}

.question-icon {
  color: black;
  border: solid black 2px;
  width: 36px;
  height: 36px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.router-link-active .question-icon {
  color: olive;
  border: solid olive 2px;
}

.problem-router-view {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

.problem-container {
  font-size: 20px;
}

.problem-tex-center {
  text-align: center;
}

.problem-tex-answer {
  padding: 10px;
  min-width: 200px;
}

.answer-correct {
  background: #90EE90;
}

.answer-wrong {
  background: #FF7F7F;
}

.problem-submit {
  margin-top: 20px;
}

.btn {
  font-size: 20px;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-another {
  background-color: sandybrown;
  font-size: 16px;
}

.btn-submit {
  background-color: lightskyblue;
}

.btn-tips {
  background-color: mediumaquamarine;
  margin-left: 10px;
}
</style>
