<template>
  <div class="guet-title-wrap">
    <van-divider content-position="center">
      {{ title }}
    </van-divider>
    <span v-if="subTitle" class="sub-divider">{{ subTitle }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Title extends Vue {
  @Prop() title!: string;
  @Prop() subTitle!: string;
}
</script>

<style lang="scss" scoped>
.guet-title-wrap {
  text-align: center;
  padding-top: 45px;

  .sub-divider {
    display: inline-block;
    margin-top: 12px;
    font-size: 8px;
    font-weight: 500;
    color: #434343;
  }
}

.guet-title-wrap ::v-deep .van-divider {
  margin: auto;
  font-size: 34px;
  font-weight: 500;
  color: #434343;
  border: none;
  justify-content: center;

  &::before,
  &::after {
    flex-grow: 0;
    flex-basis: 4px;
    height: 4px;
    border: none;
    background-color: #434343;
    transform: scale(1);
  }

  &::before {
    margin-right: 20px;
  }

  &::after {
    margin-left: 20px;
  }
}
</style>
