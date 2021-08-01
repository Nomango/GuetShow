<template>
  <header class="header-container">
    <img
      class="header-bg"
      src="https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/bg.png"
      alt=""
    />
    <div class="header-year-container">
      <img
        class="header-year ani"
        swiper-animate-effect="fadeInLeft"
        swiper-animate-duration="1s"
        src="https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/2021.png"
        alt=""
      />
    </div>
    <div class="header-description">
      <img
        class="header-description-title-en ani"
        swiper-animate-effect="fadeInUp"
        swiper-animate-duration="1.4s"
        src="https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/title-en.png"
        alt=""
      />
      <img
        class="header-description-desc ani"
        swiper-animate-effect="fadeInUp"
        swiper-animate-duration="1.8s"
        src="https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/title-desc.png"
        alt=""
      />
      <!-- <div class="header-description-desc">Excellent Graduation Design &amp; Thesis Exhibition</div> -->
      <div
        class="header-description-title ani"
        swiper-animate-effect="fadeInUp"
        swiper-animate-duration="1.8s"
        >
        优秀毕业设计（论文）展
      </div>
      <img
        class="header-logo ani"
        swiper-animate-effect="fadeInRight"
        swiper-animate-duration="1.8s"
        src="https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/logo_tv.png"
        alt=""
      />
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
  z-index: 1;
}

.header-bg {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 43%;
}

.header-year-container {
  margin: 30px 20px 15px;

  .header-year {
    width: 45%;
    height: auto;
  }
}

.header-description {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;

  .header-description-title-en {
    margin: 0px;
    padding: 0px;
    width: 50%;
  }

  .header-description-desc {
    // transform: rotate(90deg);
    // transform-origin: top left;
    // position: absolute;
    // top: 0;
    // left: 100vw;
    // width: 100vh;
    // height: 100vw;

    margin-top: 3px;
    margin-left: 25px;
    width: 3.35%;
  }

  .header-description-title {
    margin-left: 5px;
    writing-mode: tb-rl;
    font-size: 40px;
    color: #0f4c81;
  }

  .header-logo {
    margin-left: 25px;
    width: 10%;
  }
}
</style>
