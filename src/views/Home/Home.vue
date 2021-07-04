<template>
  <div class="home-container">
    <HeaderCom />
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/swiper.min.css";
import HeaderCom from "./Header.vue";

@Component({
  components: {
    HeaderCom
  },

  beforeRouteEnter(to, form, next) {
    console.log("as");
    next();
  }
})
export default class Home extends Vue {
  @Prop() show!: boolean;

  mounted() {
    new Swiper(".swiper-container", {});
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 600px;
  height: 300px;
}
</style>
