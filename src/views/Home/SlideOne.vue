<template>
  <section class="swiper-slide home-swiper-slide">
    <div class="home-main">
      <HeaderCom />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderCom from "./Header.vue";

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
</style>
