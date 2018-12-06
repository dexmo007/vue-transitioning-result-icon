<template>
  <svg viewBox="0 0 400 400">
    <circle :style="{fill: tweenedCSSColor}" cx="200" cy="200" r="200"></circle>
    <circle fill="white" cx="140" cy="110" r="20"></circle>
    <circle fill="white" cx="270" cy="110" r="20"></circle>
    <path :id="pathId" :d="path" stroke="white" stroke-width="10" fill="transparent"/>
  </svg>
</template>

<script>
import Color from 'color-js/color';
import TWEEN from '@tweenjs/tween.js';
import { TweenLite } from 'gsap/TweenLite';
import AttrPlugin from 'gsap/AttrPlugin';
import ResultIconProps from './ResultIconProps';

import { generateDomId } from '../util/Utils';

// this is required to ensure that the plugin actually gets loaded
// eslint-disable-next-line no-unused-vars
const GsapPlugins = [AttrPlugin];

const smilePath = 'M100 230 c0 100, 200 100, 200 0';
const frownPath = 'M100 310 c0 -100, 200 -100, 200 0';

export default {
  name: 'TransitioningResultIcon',
  props: ResultIconProps,
  data() {
    return {
      pathId: generateDomId(),
      tweenedColor: {},
      path: null,
      smilePath,
      frownPath,
    };
  },
  created() {
    const [color, path] = this.update();
    this.tweenedColor = Object.assign({}, color);
    this.path = path;
  },
  watch: {
    error() {
      const [color, path] = this.update();
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween(this.tweenedColor).to(color, this.duration).start();
      animate();
      TweenLite.to(`#${this.pathId}`, this.duration / 1000, {
        attr: { d: path },
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
      const path = this.error ? frownPath : smilePath;
      return [color, path];
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
</style>
