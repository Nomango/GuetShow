<template>
  <section class="swiper-slide home-swiper-slide">
    <div class="home-main">
      <HeaderCom />
    </div>
    <!-- <div class="header-footer">
      <div
        class="header-footer-item highlight ani"
        swiper-animate-effect="bounceInUp"
        swiper-animate-duration="2.4s"
      >桂林电子科技大学教务处</div>
      <div class="header-footer-item ani"
        swiper-animate-effect="bounceInUp"
        swiper-animate-duration="2.4s"
      >Copyright©2021 桂林电子科技大学优秀毕业设计（论文）展</div>
      <div class="header-footer-item ani"
        swiper-animate-effect="bounceInUp"
        swiper-animate-duration="2.4s"
      >全部作品版权归桂林电子科技大学及作者本人所有</div>
    </div> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HeaderCom from "./Header.vue";
import HeaderCom from "./Header2.vue";

@Component({
  components: {
    HeaderCom
  }
})
export default class SlideOne extends Vue {}
</script>

<style lang="scss" scoped>
.home-main {
  position: relative;
  z-index: 2;
}

.header-footer {
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: 30px;
  text-align: center;
  transform: translate(-50%, 0);

  .header-footer-item {
    font-family: "Microsoft Yahei";
  }

  .header-footer-item.highlight {
    color: #0f4c81;
    font-weight: bold;
  }
}
</style>
