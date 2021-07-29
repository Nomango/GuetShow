<template>
  <header class="header-container">
    <img
      class="header-logo ani"
      swiper-animate-effect="bounceInLeft"
      swiper-animate-duration="1s"
      src="https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/logo_compress.png"
      alt=""
    />
    <div class="header-description" id="header-description">
      <div
        class="header-time ani"
        swiper-animate-effect="fadeInLeftBig"
        swiper-animate-duration="1s"
      >
        2021
      </div>
      <h1
        id="header-title"
        class="header-title ani"
        swiper-animate-effect="fadeInLeftBig"
        swiper-animate-duration="1.2s"
      >
        优秀毕设
      </h1>
      <div
        class="header-description-item subtitle-description-item ani"
        swiper-animate-effect="fadeInLeftBig"
        swiper-animate-duration="1.4s"
      >
        <span class="header-description-sub-text">Excellent Graduation Design<br />&amp;&nbsp;Thesis Exhibition</span>
      </div>
      <div
        class="header-description-item location-description-item ani"
        swiper-animate-effect="fadeInLeftBig"
        swiper-animate-duration="1.6s"
      >
        <span class="header-description-icon header-location-icon">
          <img src="../../assets/Image/localtion.svg" alt="" />
        </span>
        <span class="header-description-text">
          花江校区 四创中心4号楼108室
        </span>
      </div>

      <div
        class="header-description-item people-description-item ani"
        swiper-animate-effect="fadeInLeftBig"
        swiper-animate-duration="1.8s"
      >
        <span class="header-description-icon header-time-icon">
          <img src="../../assets/Image/time.svg" alt="" />
        </span>
        <span class="header-description-text">2021年7月</span>
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
  padding-left: 22px;
  z-index: 1;
}

.header-logo {
  display: inline-block;
  margin-top: 45px;
  width: 199px;
}

.header-description {
  margin-top: 100px;
}

.header-time {
  font-size: 42px;
  margin-bottom: 2px;
}

.header-title {
  width: 180px;
  font-size: 84px;
  line-height: 91px;
  text-shadow: 0 0 5px #f5f9ff;
}

.subtitle-description-item {
  position: relative;
  margin-top: 25px;
  padding-bottom: 16px;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 64px;
    height: 3px;
    background: #434343;
    border-radius: 1px;
  }
}

.header-description-sub-text {
  font-size: 14px;
  font-weight: 500;
  color: #434343;
  line-height: 20px;
  text-shadow: 0 0 5px #f5f9ff;
}

.header-description-item {
  display: flex;
  align-items: center;

  &.location-description-item {
    margin-top: 27px;

    .header-description-text {
      position: relative;
      top: 1px;
      margin-left: -8px;
      text-shadow: 0 0 5px #f5f9ff;
    }
  }

  &.people-description-item {
    margin-top: 5px;
    .header-description-text {
      position: relative;
      top: 1px;
      text-shadow: 0 0 5px #f5f9ff;
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
  transform: scale(0.8);
  transform-origin: 50% 50%;
}

.header-location-icon {
  width: 10px;
}

.header-time-icon {
  width: 12px;
}
</style>
