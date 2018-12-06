<template>
  <div id="app">
    <GitHubCorner href="https://github.com/dexmo007/vue-transitioning-result-icon"/>
    <h1>Transitioning Result Icon</h1>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';
import GitHubCorner from './GitHubCorner.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    GitHubCorner,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
