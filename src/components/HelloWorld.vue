<template>
  <div class="container">
    <div class="row">
      <OverlayingRects :error="error"/>
      <TwelvePoints :error="error"/>
    </div>
    <button id="toggle-error-btn" @click="onClick">{{buttonText}}</button>
  </div>
</template>
<script>
import OverlayingRects from "./OverlayingRects.vue";
import TwelvePoints from "./TwelvePoints.vue";

import { TweenLite } from "gsap/TweenLite";

export default {
  name: "HelloWorld",
  components: {
    OverlayingRects,
    TwelvePoints
  },
  data() {
    return {
      error: false,
      buttonText: ""
    };
  },
  created() {
    this.buttonText = this.error ? "Fix 'em up" : "Sabotage!!";
  },
  methods: {
    onClick() {
      this.error = !this.error;
    }
  },
  watch: {
    error() {
      const newText = this.error ? "Fix 'em up" : "Sabotage!!";
      TweenLite.to("#toggle-error-btn", 1, { text: { value: newText } });
    }
  }
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
button {
  border: none;
  outline: none;
  padding: 25px;
  font-size: 24px;
  width: 200px;
}
button:hover {
  background-color: #d3d3d3;
}
</style>
