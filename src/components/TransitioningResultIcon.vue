<template>
  <svg viewBox="0 0 400 400">
    <circle :style="{fill: tweenedCSSColor}" cx="200" cy="200" r="200"></circle>
    <polygon :id="polygon1" :points="points"></polygon>
    <polygon :id="polygon2" :points="points2"></polygon>
  </svg>
</template>

<script>
import Color from 'color-js/color';
import TWEEN from '@tweenjs/tween.js';
import { TweenLite } from 'gsap/TweenLite';
import AttrPlugin from 'gsap/AttrPlugin';

import { times, check } from '../icons/OverlayingRects';
import { generateDomId } from '../util/Utils';

// this is required to ensure that the plugin actually gets loaded
// eslint-disable-next-line no-unused-vars
const GsapPlugins = [AttrPlugin];

const timesPoints = times(400, 40);
const checkPoints = check(400, 40, -20);

function validateColor(value) {
  try {
    Color(value);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  name: 'TransitioningResultIcon',
  props: {
    error: Boolean,
    duration: {
      type: Number,
      default: 500,
      validator(value) {
        return value > 0 && Number.isInteger(value);
      },
    },
    successColor: {
      type: String,
      default: 'green',
      validator(value) {
        return validateColor(value);
      },
    },
    errorColor: {
      type: String,
      default: 'red',
      validator(value) {
        return validateColor(value);
      },
    },
  },
  data() {
    return {
      polygon1: generateDomId(),
      polygon2: generateDomId(),
      tweenedColor: {},
      points: null,
      points2: null,
    };
  },
  created() {
    const [color, points, points2] = this.update();
    this.tweenedColor = Object.assign({}, color);
    this.points = points;
    this.points2 = points2;
  },
  watch: {
    error() {
      const [color, points, points2] = this.update();
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween(this.tweenedColor).to(color, this.duration).start();
      animate();
      TweenLite.to(`#${this.polygon1}`, this.duration / 1000, {
        attr: { points },
      });
      TweenLite.to(`#${this.polygon2}`, this.duration / 1000, {
        attr: { points: points2 },
      });
    },
  },
  computed: {
    tweenedCSSColor() {
      return Color(this.tweenedColor).toCSS();
    },
  },
  methods: {
    update() {
      const color = Color(
        this.error ? this.errorColor : this.successColor,
      ).toRGB();
      const points = this.error ? timesPoints[0] : checkPoints[0];
      const points2 = this.error ? timesPoints[1] : checkPoints[1];
      return [color, points, points2];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  display: block;
  width: 40px;
}
polygon {
  fill: white;
}
</style>
