<template>
  <div class="guet-loading guet-loading--horizontal guet-loading__circular">
    <span class="guet-loading__spinner guet-loading__spinner--circular">
      <svg class="guet-icon guet-loading__circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
    <span class="guet-loading__text">
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  @Prop() text!: boolean;
}
</script>

<style lang="scss" scoped>
.guet-loading {
  position: relative;
  color: #c8c9cc;
  font-size: 0;
  vertical-align: middle;
}
.guet-loading__spinner {
  position: relative;
  display: inline-block;
  width: 20px;
  max-width: 100%;
  height: 20px;
  max-height: 100%;
  vertical-align: middle;
  animation: van-rotate 0.8s linear infinite;
}

.guet-loading__spinner--circular {
  animation-duration: 2s;
}

.guet-loading__circular {
  display: block;
  width: 100%;
  height: 100%;
}

.guet-loading__circular circle {
  animation: van-circular 1.5s ease-in-out infinite;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
}

.guet-loading__text {
  display: inline-block;
  margin-left: 8px;
  color: #969799;
  font-size: 14px;
  vertical-align: middle;
}

.guet-loading--horizontal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.guet-loading--horizontal .guet-loading__text {
  margin: 0 0 0 8px;
}

@keyframes van-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}
</style>
