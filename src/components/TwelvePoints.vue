<template>
  <svg width="400" height="400">
    <circle :style="{fill: tweenedCSSColor}" cx="200" cy="200" r="200"></circle>
    <polygon id="polygon" :points="points"></polygon>
  </svg>
</template>

<script>
import Color from "color-js/color";
import TWEEN from "@tweenjs/tween.js";
import "gsap/AttrPlugin";
import { TweenLite } from "gsap/TweenLite";

import { times, check } from "../icons/TwelvePoints";

const timesPoints = times(400, 40);
const checkPoints = check(400, 40, -20);

export default {
  name: "TwelvePoints",
  props: {
    error: Boolean
  },
  data() {
    return {
      tweenedColor: {},
      points: null
    };
  },
  created() {
    const color = Color(this.error ? "red" : "green").toRGB();
    this.tweenedColor = Object.assign({}, color);

    this.points = this.error ? timesPoints : checkPoints;
  },
  watch: {
    error() {
      const color = Color(this.error ? "red" : "green").toRGB();
      const points = this.error ? timesPoints : checkPoints;
      TweenLite.to("#polygon", 1, { attr: { points: points } });

      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween(this.tweenedColor).to(color, 750).start();
      animate();
    }
  },
  computed: {
    tweenedCSSColor() {
      return Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha
      }).toCSS();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  display: block;
}
polygon {
  fill: white;
}
</style>
