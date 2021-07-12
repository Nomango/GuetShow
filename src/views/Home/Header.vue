<template>
  <header class="header-container">
    <img class="header-logo" src="../../assets/Image/logo.png" alt="" />
    <div class="header-time">2021</div>
    <h1 class="header-title">毕设展览</h1>
    <div class="header-description">
      <div class="header-description-item location-description-item">
        <span class="header-description-icon header-location-icon">
          <img src="../../assets/Image/localtion.svg" alt="" />
        </span>
        <span class="header-description-text">
          花江校区 四创中心4号楼108室
        </span>
      </div>
      <div class="header-description-item people-description-item">
        <span class="header-description-icon header-time-icon">
          <img src="../../assets/Image/time.svg" alt="" />
        </span>
        <span class="header-description-text">于 2021.7 启动</span>
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
.header-logo {
  position: relative;
  display: block;
  width: 45%;
  margin: 40px auto 180px;
}

.header-container {
  position: relative;
  margin-top: 40px;
  padding-left: 22px;
  z-index: 1;
}

.header-time {
  font-size: 42px;
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
      margin-left: -23px;
    }
  }

  &.people-description-item {
    .header-description-text {
      margin-left: -9px;
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
