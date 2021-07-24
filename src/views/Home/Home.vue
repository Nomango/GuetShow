<template>
  <div class="home-container">
    <template v-if="!loading">
      <div
        class="swiper-container home-swiper-container"
        id="home-swiper-container"
      >
        <div class="swiper-wrapper home-swiper-wrapper">
          <SlideOne />
          <SlideTwo :list="list" />
        </div>
      </div>
      <div class="home-arrow" v-show="arrowVisible">
        <div class="home-arrow-box">
          <img src="../../assets/Image/next.svg" class="home-arrow-img" />
          <img src="../../assets/Image/next.svg" class="home-arrow-img" />
        </div>
      </div>
      <HomeImage class="home-background" :style='backgroundStyle' />
    </template>
    <div class="home-loading" v-else>
      <van-loading color="#0094ff" size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/swiper.min.css";

import SlideOne from "./SlideOne.vue";
import SlideTwo from "./SlideTwo.vue";

import { fetchRecommend } from "@/api/home";
import { ProjectItem } from "@/types/home";
import HomeImage from "./Image.vue";
import * as SwiperAni from "@/utils/swiperAnimate";

@Component({
  components: {
    SlideOne,
    SlideTwo,
    HomeImage
  },
  beforeRouteEnter: async (to, form, next) => {
    try {
      const res = await fetchRecommend({
        pageSize: 15
      });
      const { data } = res || {};

      next((vm: any) => {
        vm.loading = false;
        vm.list = data;
      });
    } catch (error) {
      next();
    }
  }
})
export default class Home extends Vue {
  @Prop() show!: boolean;

  loading = true;
  arrowVisible = true;
  list: ProjectItem[] = [];
  backgroundStyle: any = {};

  handleInitHomeSwiper() {
    const vm = this as any;
    new Swiper("#home-swiper-container", {
      direction: "vertical",
      watchSlidesProgress: true,
      mousewheel: true,
      on: {
        init: function(swiper) {
          SwiperAni.swiperAnimateCache(); // 隐藏动画元素
          SwiperAni.swiperAnimate(this); // 初始化完成开始动画

          swiper.slides
            .eq(swiper.activeIndex)
            .find(".ani")
            .removeClass("ani"); // 动画只展现一次，去除ani类名
        },
        slideChangeTransitionEnd: function(swiper: Swiper) {
          SwiperAni.swiperAnimate(this); // 每个slide切换结束时也运行当前slide动画

          swiper.slides
            .eq(swiper.activeIndex)
            .find(".ani")
            .removeClass("ani"); // 动画只展现一次，去除ani类名
        },
        slideChange: function(swiper: Swiper) {
          if (swiper.isEnd) {
            vm.backgroundStyle['margin-top'] = '-80px';
            vm.arrowVisible = false;
          } else {
            vm.backgroundStyle['margin-top'] = '60px';
            vm.arrowVisible = true;
          }
        },
        progress: function(this: any, swiper: Swiper, progress1: number) {
          const len = swiper.slides.length;
          for (var i = 0; i < len; i++) {
            const slide = swiper.slides[i] as any;
            const progress = slide.progress;

            const translate = (progress * swiper.height) / 3;
            const scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
            const opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);

            const style = slide.style;
            style.opacity = opacity;
            style.transform = style.MsTransform = style.msTransform = style.MozTransform = style.OTransform = style.transform = `translate3d(0, ${translate}px, -${translate}px) scaleY(${scale})`;
          }
        },
        setTransition: function(this: any, swiper: Swiper, transition: number) {
          const slides = swiper.slides;
          for (let i = 0, len = slides.length; i < len; i++) {
            const slide = slides.eq(i);
            slide.find(".home-swiper-slide").transition(transition);
          }
        }
      }
    });
  }

  @Watch("loading")
  loadingChange(val: boolean, oldVal: boolean) {
    if (!val) {
      this.$nextTick(() => {
        this.handleInitHomeSwiper();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  color: #434343;
  background-color: #f5f9ff;
}

.home-swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.home-swiper-slide {
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
}

.home-arrow {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  width: 23.4375px;
  margin: auto;
  animation: start 1.5s infinite ease-in-out;
  z-index: 999;
}

.home-arrow-box {
  position: relative;
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);

  .home-arrow-img {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
    width: inherit;
    color: #434343;

    &:not(:first-of-type) {
      left: 7px;
      opacity: 0.4;
    }
  }
}

.home-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes start {
  0%,
  30% {
    opacity: 0;
    transform: translate(0, 10px);
  }
  60% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(0, -8px);
  }
}
</style>
