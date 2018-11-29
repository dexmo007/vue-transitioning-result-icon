<template>
  <div class="hello">
    <svg width="400" height="400">
      <circle :style="{fill: tweenedCSSColor}" cx="200" cy="200" r="200"></circle>
      <polygon id="polygon" :points="points"></polygon>
    </svg>
    <button @click="onClick">Toggle</button>
  </div>
</template>

<script>
import Color from 'color-js/color';
import TWEEN from '@tweenjs/tween.js';
import 'gsap/AttrPlugin';
import {TweenLite} from 'gsap/TweenLite';

function generatePolygonPointsTimes(x, l) {
  const c = l/Math.sqrt(2);
  const x2 = x/2;
  const ps = [
    [x/4-c/2,x/4+c/2],//tll
    [x/4+c/2,x/4-c/2],//tlr
    [x2, x2-c],//ct
    [3*x/4-c/2,x/4-c/2],//trl
    [3*x/4+c/2,x/4+c/2],//trr
    [x2+c, x2],//cr
    [3*x/4+c/2,3*x/4-c/2],//brr
    [3*x/4-c/2,3*x/4+c/2],//brl
    [x2, x2+c],//cb
    [x/4+c/2,3*x/4+c/2],//blr
    [x/4-c/2,3*x/4-c/2],//bll
    [x2-c, x2],//cl
  ];
  const points =  ps.map(p => `${p[0]},${p[1]}`).join(' ');
  return points;
}

function generatePolygonPointsCheck(x, l, deltaY) {
  const h = l / Math.sqrt(2);
  const t = x/6;
  const u = x/Math.sqrt(8);
  const phi = 55 * Math.PI/180;
  const L = u*Math.tan(phi);
  const deltaL = L/Math.sqrt(2);
  const cb = [x/4+t,x/2+t+Math.sqrt(2)*l]
  const cr = [cb[0]+h,cb[1]-h];
  const cl = [cb[0]-h,cb[1]-h];
  const cll = [cl[0]-h,cl[1]-h];
  const ps = [
    [x/4-h,x/2+h],//ll
    [x/4,x/2],//lr
    [x/4+t,x/2+t],//ct
    [x/4+t+deltaL,x/2+t-deltaL],//rt
    [x/4+t+deltaL+h,x/2+t-deltaL+h],//rb
    cr,cr,
    cb,
    cl,cl,
   cll,cll,
  ];
  const points =  ps
    .map(p => [p[0],p[1]+deltaY])
    .map(p => `${p[0]},${p[1]}`).join(' ');
  return points;
}

export default {
  name: 'HelloWorld',
  data(){
    return {
      color: Color('green'),
      error: false,
      resultIcon: 'check-circle',
      tweenedColor: {},
      points: generatePolygonPointsCheck(400,40,-20),
    }
  },
  created() {
    this.tweenedColor = Object.assign({}, this.color);
  },
  methods: {
    onClick(){
      this.error = !this.error;
      this.resultIcon = this.error ? 'times-circle' : 'check-circle';
      this.color = Color(this.error ? 'red' : 'green').toRGB();
      const points = this.error ? generatePolygonPointsTimes(400,40) : generatePolygonPointsCheck(400,40,-20);
      TweenLite.to('#polygon',1,{attr:{points:points}});
    },
  },
  watch: {
    color(){
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 750)
        .start();
      animate();
      
    },
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.hello > * {
  margin: 20px;
}
.result-icon {
  font-size: 400px;
}
#box {
  width: 300px;
  height: 300px;
}
svg { 
  display: block; 
}
polygon { 
  fill: white;
}
circle {
  /*fill: transparent;*/
  /*stroke:#41B883;*/
  /*stroke-width: 10px;*/
}
</style>
