<template>
  <div class="container">
    <select v-model="selected">
      <option value="CheckTimes">Check / Times</option>
      <option value="SmileFrown">Smile / Frown</option>
    </select>
    <div class="row">
      <TransitioningSmileyIcon
        v-if="selected === 'SmileFrown'"
        id="icon"
        :error="error"
        :success-color="successColor"
        :error-color="errorColor"
        :duration="duration"
      />
      <TransitioningResultIcon
        v-else-if="selected === 'CheckTimes'"
        id="icon"
        :error="error"
        :success-color="successColor"
        :error-color="errorColor"
        :duration="duration"
      />
    </div>
    <button id="toggle-error-btn" @click="onClick">{{buttonText}}</button>
    <div class="config">
      <label>Success color</label>
      <div class="color-row">
        <input v-model="successColor">
        <div class="color-box" :style="{background: successColor}"></div>
      </div>
      <label>Error color</label>
      <div class="color-row">
        <input v-model="errorColor">
        <div class="color-box" :style="{background:errorColor}"></div>
      </div>
      <label>Transition duration</label>
      <input v-model.number="duration">
    </div>
  </div>
</template>
<script>
import { TweenLite } from 'gsap/TweenLite';
import { TransitioningSmileyIcon, TransitioningResultIcon } from '../src/main';

export default {
  name: 'HelloWorld',
  components: {
    TransitioningSmileyIcon,
    TransitioningResultIcon,
  },
  data() {
    return {
      error: false,
      successColor: 'rgba(83, 165, 48, 1)',
      errorColor: 'red',
      duration: 500,
      buttonText: '',
      selected: 'CheckTimes',
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
.container > *:not(select) {
  margin: 20px;
}
.row {
  display: flex;
}
.row > * {
  margin: 30px;
}
select {
  margin: 10px;
  font-size: 16px;
  padding: 7px;
  outline: none;
  background-color: #e4e4e4;
  border: none;
}
select > option {
  padding: 10px;
  outline: none;
  border: none;
  background-color: #e4e4e4;
  pointer-events: none;
}
select > option:hover {
  background-color: #d3d3d3;
}
.config {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.config > * {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 16px;
}
.color-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.color-box {
  width: 16px;
  height: 16px;
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
  background-color: #e4e4e4;
  transition: background-color 150ms ease-in-out;
}
button:hover {
  background-color: #d3d3d3;
}
</style>
