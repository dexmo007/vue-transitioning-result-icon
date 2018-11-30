<template>
  <div class="container">
    <div class="row">
      <OverlayingRects :error="error"/>
      <TwelvePoints :error="error"/>
    </div>
    <button @click="onClick">Toggle</button>
  </div>
</template>
<script>
import OverlayingRects from "./OverlayingRects.vue";
import TwelvePoints from "./TwelvePoints.vue";

export default {
  name: "HelloWorld",
  components: {
    OverlayingRects,
    TwelvePoints
  },
  data() {
    return {
      error: false
    };
  },
  methods: {
    onClick() {
      this.error = !this.error;
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
</style>
