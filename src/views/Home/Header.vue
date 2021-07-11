<template>
  <header class="header-container">
    <div class="header-time">2021</div>
    <h1 class="header-title">毕设展览</h1>
    <div class="header-description">
      <div class="header-description-item location-description-item">
        <span class="header-description-icon header-location-icon">
          <img src="../../assets/Image/localtion.svg" alt="" />
        </span>
        <span class="header-description-text">
          桂林电子科技大学F栋教学楼5楼报告厅
        </span>
      </div>
      <div class="header-description-item people-description-item">
        <span class="header-description-icon header-time-icon">
          <img src="../../assets/Image/people.svg" alt="" />
        </span>
        <span class="header-description-text">2021.7.5 - 2021.8.1</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  margin-top: 127px;
  padding-left: 22px;
  z-index: 1;
}

.header-time {
  font-size: 42px;
}

.header-logo {
  position: relative;
  display: inline-block;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 40px 0;
  border: 1px solid #fff;
}

.header-title {
  width: 180px;
  font-size: 84px;
  line-height: 91px;
}

.header-description-item {
  display: flex;
  align-items: center;

  &.location-description-item {
    .header-description-text {
      margin-left: -30px;
    }
  }

  &.people-description-item {
    .header-description-text {
      margin-left: -13.5px;
    }
  }
}

.header-description-icon {
  img {
    width: 100%;
  }
}

.header-description-text {
  font-size: 12px;
  text-align: left;
  margin-top: 1px;
  transform: scale(0.667);
  transform-origin: 50% 50%;
}

.header-location-icon {
  width: 9px;
}

.header-time-icon {
  width: 8px;
}
</style>
