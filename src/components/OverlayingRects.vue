<template>
  <svg :id="svgId" width="400" height="400">
    <circle :style="{fill: tweenedCSSColor}" cx="200" cy="200" r="200"></circle>
    <polygon class="polygon" :points="points"></polygon>
    <polygon class="polygon2" :points="points2"></polygon>
  </svg>
</template>

<script>
import Color from "color-js/color";
import TWEEN from "@tweenjs/tween.js";
import { TweenLite } from "gsap/TweenLite";

import { times, check } from "../icons/OverlayingRects";
import { generateDomId } from "../util/Utils";

const timesPoints = times(400, 40);
const checkPoints = check(400, 40, -20);

export default {
  name: "OverlayingRects",
  props: {
    error: Boolean
  },
  data() {
    return {
      svgId: generateDomId(),
      tweenedColor: {},
      points: null,
      points2: null
    };
  },
  created() {
    const color = Color(this.error ? "red" : "green").toRGB();
    this.tweenedColor = Object.assign({}, color);

    this.points = this.error ? timesPoints[0] : checkPoints[0];
    this.points2 = this.error ? timesPoints[1] : checkPoints[1];

    function animate() {
      if (TWEEN.update()) {
        requestAnimationFrame(animate);
      }
    }
    new TWEEN.Tween(this.tweenedColor).to(color, 750).start();
    animate();
    TweenLite.to(`#${this.svgId} .polygon`, 1, { attr: { points: this.points } });
    TweenLite.to(`#${this.svgId} .polygon2`, 1, { attr: { points: this.points2 } });
  },
  watch: {
    error() {
      this.color = Color(this.error ? "red" : "green").toRGB();
      const points = this.error ? timesPoints[0] : checkPoints[0];
      const points2 = this.error ? timesPoints[1] : checkPoints[1];

      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween(this.tweenedColor).to(this.color, 750).start();
      animate();
      TweenLite.to(".polygon", 1, { attr: { points: points } });
      TweenLite.to(".polygon2", 1, { attr: { points: points2 } });
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
