<template>
  <div class="guet-loading">
    <span class="guet-spinner">
      <svg class="guet-icon guet-icon-circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
    {{ renderText }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  @Prop() renderText!: boolean;
}
</script>

<style lang="scss" scoped></style>
