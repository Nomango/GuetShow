<template>
  <div class="home-container">
    <HomeImage />
    <main class="home-main">
      <HeaderCom />
      <div class="divider-wrap">
        <van-divider content-position="center">
          优秀毕设
        </van-divider>
      </div>

      <div v-if="list.length > 0" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in list" :key="item.id">
            <div class="project-item">
              <div class="project-image-wrap">
                <img v-lazy="item.cover" class="project-image" />
              </div>
              <div class="project-content">
                <h2 class="project-title">{{ item.name }}</h2>
                <div class="project-info">
                  <div class="project-info-image">
                    <img src="../../assets/Image/people.svg" alt="" />
                  </div>
                  <div class="project-info-right">
                    <span class="project-owner-name">
                      {{ item.student && item.student.name }}
                    </span>
                    <br />
                    <span class="project-school">
                      {{ item.school }}
                    </span>
                  </div>
                </div>
                <van-button
                  round
                  plain
                  hairline
                  type="info"
                  @click="handleToDetail(item.id)"
                >
                  进去瞧瞧
                </van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="check-all-wrap">
        <div class="check-all-btn" @click="handleCheckAllClick">
          查看全部>>
        </div>
      </div>
    </main>
    <footer class="home-footer">
      <div class="copyright">
        <!-- <p class="copyright-item">Powered by Nomango</p> -->
        <p class="copyright-item">Copyright (c) 2021-2022</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/swiper.min.css";

import HeaderCom from "./Header.vue";
import HomeImage from "./Image.vue";
import { fetchRecommend } from "@/api/home";
import { ProjectItem } from "@/types/home";

@Component({
  components: {
    HeaderCom,
    HomeImage
  },
  beforeRouteEnter: async (to, form, next) => {
    try {
      const res = await fetchRecommend({
        pageSize: 15
      });
      const { data } = res || {};

      next((vm: any) => {
        vm.loading = true;
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
  list: ProjectItem[] = [];

  handleCheckAllClick() {
    this.$router.push({
      name: "List"
    });
  }

  handleToDetail(id: string) {
    this.$router.push({
      name: "Detail",
      params: {
        id
      }
    });
  }

  init() {
    new Swiper(".swiper-container", {
      slidesPerView: "auto",
      watchSlidesProgress: true,
      centeredSlides: true,
      on: {
        progress: function(this: any, swiper: Swiper, progress1: number) {
          const len = swiper.slides.length;
          for (var i = 0; i < len; i++) {
            const slide = swiper.slides[i] as any;
            const progress = slide.progress;

            const style = slide.style;
            style.transform = style.MsTransform = style.msTransform = style.MozTransform = style.OTransform = style.transform =
              "translate3d(0px, 0," + -Math.abs(progress * 250) + "px)";
          }
        },
        setTransition: function(this: any, swiper: Swiper, transition: number) {
          const slides = swiper.slides;
          for (let i = 0, len = slides.length; i < len; i++) {
            const slide = slides.eq(i);
            slide.find(".project-item").transition(transition);
          }
        }
      }
    });
  }

  mounted() {
    this.init();
  }

  @Watch("list")
  listChange() {
    this.$nextTick(() => {
      this.init();
    });
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  color: #434343;
  overflow: auto;
  padding-bottom: 20px;
  background-color: #f5f9ff;
}

.home-main {
  position: relative;
  z-index: 2;
}

.divider-wrap {
  margin-top: 120px;
  display: flex;
  justify-content: center;
}

.divider-wrap ::v-deep .van-divider {
  margin: auto;
  font-size: 16px;
  font-weight: 500;
  color: #434343;
  border-color: #434343;

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  &::before,
  &::after {
    display: inline-block;
    flex: none;
    width: 20px;
    border-width: 4px 0 0 0;
  }
}

.swiper-container {
  width: 100%;
  perspective: 1200px;
  /* height: 385px; */
}

.swiper-wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
  transform-style: preserve-3d;
}

.swiper-slide {
  width: 84.5%;
  min-height: 270px;
  transform-style: preserve-3d;
  transition: transform 0.3s;

  &.last-slide {
    display: flex;
    align-items: center;
    width: 95px;
    color: #fff;

    .more-icon {
      display: inline-block;
      width: 25px;
      height: 25px;

      img {
        width: 100%;
      }
    }

    .more-text {
      display: inline-block;
      width: 21px;
      font-size: 16px;
      margin-left: 10px;
      line-height: 1.5;
    }
  }
}

.project-item {
  display: block;
  width: 84.5%;
  margin: 0 auto;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 8px 12px #ebedf0;
}

.project-image-wrap {
  width: 100%;
  height: 200px;
  margin-top: 17px;

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }
}

.project-content ::v-deep {
  .van-button {
    width: 168px;
    height: 31px;
    line-height: 31px;
    background: #ffffff;
    color: #434343;
    border-radius: 15px;
    margin-top: 12px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border: none;
    &::before,
    &::after {
      display: none;
    }
  }
}

.project-content {
  padding: 12px 30px 10px;
  text-align: center;

  .project-title {
    color: #14232a;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
  }
}

.project-info {
  display: inline-flex;
  justify-content: center;
  font-size: 12px;
  color: #4f7181;
  margin-top: 12px;

  .project-info-right {
    text-align: left;
    margin-left: 6px;
  }

  .project-owner-name,
  .project-school {
    transform: scale(0.0667);
  }

  .project-school {
    margin-top: 10px;
  }
}

.project-info-image {
  display: flex;
  align-items: center;
  width: 25px;
  position: relative;
  top: 2px;

  img {
    width: 100%;
  }
}

.check-all-wrap {
  text-align: center;
}

.check-all-btn {
  display: inline-block;
  font-size: 12px;
  height: 30px;
  text-align: center;
  color: #323232;
  text-decoration: underline;
}

.home-footer {
  text-align: center;
  font-size: 12px;
  padding-bottom: 10px;

  .copyright-item {
    transform: scale(0.667);

    &:not(:last-of-type) {
      margin-top: 15px;
    }
  }
}
</style>
