<template>
  <div class="container">
    <div class="row">
      <TransitioningResultIcon id="icon" :error="error" success-color="rgba(83, 165, 48, 1)"
      :duration="500"/>
      <!-- <TwelvePoints :error="error"/> -->
    </div>
    <button id="toggle-error-btn" @click="onClick">{{buttonText}}</button>
  </div>
</template>
<script>
import { TweenLite } from 'gsap/TweenLite';
import TransitioningResultIcon from './TransitioningResultIcon.vue';


export default {
  name: 'HelloWorld',
  components: {
    TransitioningResultIcon,
  },
  data() {
    return {
      error: false,
      buttonText: '',
    };
  },
  created() {
    this.buttonText = this.error ? "Fix 'em up" : 'Sabotage!!';
  },
  methods: {
    onClick() {
      this.error = !this.error;
    },
  },
  watch: {
    error() {
      const newText = this.error ? "Fix 'em up" : 'Sabotage!!';
      TweenLite.to('#toggle-error-btn', 0.5, { text: { value: newText } });
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container > * {
  margin: 20px;
}
.row {
  display: flex;
}
.row > * {
  margin: 30px;
}
#icon {
  width: 400px;
  height: 400px;
}
@media (max-width: 400px) {
  #icon {
    width: calc(100vw - 30px);
    height: calc(100vw - 30px);
  }
}
button {
  border: none;
  outline: none;
  padding: 25px;
  font-size: 24px;
  font-family: monospace;
  width: 200px;
}
button:hover {
  background-color: #d3d3d3;
}
</style>
