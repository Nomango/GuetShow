<template>
  <section class="swiper-slide home-swiper-slide">
    <Title
      class="ani"
      title="优秀毕设"
      subTitle="Excellent work"
      swiper-animate-effect="bounceIn"
      swiper-animate-duration="1s"
    />
    <div
      v-if="list.length > 0"
      class="swiper-container ani"
      id="project-swiper-container"
      swiper-animate-effect="fadeInRightBig"
      swiper-animate-duration="1.2s"
    >
      <div class="swiper-wrapper project-swiper-wrapper">
        <div
          class="swiper-slide project-swiper-slide"
          v-for="item in list"
          :key="item.id"
        >
          <div class="project-item">
            <div class="project-image-wrap">
              <img v-lazy="item.cover" class="project-image" />
              <img
                v-if="LevelImage[item.level]"
                :src="LevelImage[item.level]"
                alt=""
                class="project-level-image"
              />
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
    <div class="check-all-btn-box ani"
      swiper-animate-effect="bounceIn"
      swiper-animate-duration="1s"
      swiper-animate-delay="0.5s"
    >
      <div class="check-all-btn" @click="handleCheckAllClick">
        <van-icon name="wap-nav" />
        <span class="check-all-btn-text">查看全部</span>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item">Powered by L.L.</div>
      <div class="footer-item">Copyright (c) 2021-2022</div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { ProjectItem } from "@/types/home";
import Swiper from "swiper";
import { Title } from "@/components";

@Component({
  components: {
    Title
  }
})
export default class SlideTwo extends Vue {
  @Prop() list!: ProjectItem[];

  LevelImage = {
    1: require("../../assets/Image/ranking-11.png"),
    2: require("../../assets/Image/ranking-22.png"),
    3: require("../../assets/Image/ranking-33.png")
  };

  /** 跳转到 详情页 */
  handleToDetail(id: string) {
    this.$router.push({
      name: "Detail",
      params: {
        id
      }
    });
  }

  /** 跳转到 列表页 */
  handleCheckAllClick() {
    this.$router.push({
      name: "List"
    });
  }

  init() {
    new Swiper("#project-swiper-container", {
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
.home-swiper-slide {
  margin-top: 30px;
}

#project-swiper-container {
  width: 100%;
  perspective: 1200px;
  /* height: 385px; */
}

.project-swiper-wrapper {
  margin-top: 40px;
  margin-bottom: 20px;
  transform-style: preserve-3d;
}

.project-swiper-slide {
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
  position: relative;
  width: 100%;
  height: 200px;
  margin-top: 17px;
  border-radius: 12px 12px 0 0;
  overflow: hidden;

  .project-level-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

.check-all-btn-box {
  margin-top: 40px;
  text-align: center;

  .check-all-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 168px;
    height: 30px;
    line-height: 30px;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 15px;

    .check-all-btn-text {
      margin-left: 10px;
    }
  }
}

.footer {
  text-align: center;
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translate(-50%,-50%);
}
</style>
