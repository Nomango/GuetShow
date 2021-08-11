<template>
  <div class="pulldown-sina">
    <div
      class="pulldown-bswrapper"
      ref="bsWrapper"
    >
      <div class="pulldown-scroller">
        <div class="pulldown-tips">
          <div v-html="tipText"></div>
        </div>
        <ul class="pulldown-list">
          <template v-for="item in list">
            <slot :item="item" />
          </template>
        </ul>
        <div class="pullup-tips">
          <div v-if="finished" class="before-trigger">
            <span class="pullup-txt">已经到底啦</span>
          </div>
          <div v-else-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">下拉加载更多</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">加载中...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import PullUp from '@better-scroll/pull-up'
import MouseWheel from '@better-scroll/mouse-wheel'

import { ProjectItem, TeacherItem } from "@/types/home";

BScroll.use(PullDown)
BScroll.use(PullUp)
BScroll.use(MouseWheel)

// pulldownRefresh state
const PHASE = {
  moving: {
    enter: 'enter',
    leave: 'leave'
  },
  fetching: 'fetching',
  succeed: 'succeed',
  top: 'top',
}
const TIME_BOUNCE = 800
const THRESHOLD = 70
const STOP = 56
const ARROW_BOTTOM = '<svg width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M367.997 338.75l-95.998 95.997V17.503h-32v417.242l-95.996-95.995l-22.627 22.627L256 496l134.624-134.623l-22.627-22.627z"></path></svg>'
const ARROW_UP = '<svg width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M390.624 150.625L256 16L121.376 150.625l22.628 22.627l95.997-95.998v417.982h32V77.257l95.995 95.995l22.628-22.627z"></path></svg>'

const TEXTS_MAP: any = {
  enter: `${ARROW_BOTTOM} 下拉刷新`,
  leave: `${ARROW_UP} 释放刷新`,
  fetching: '加载中...',
  succeed: '刷新成功',
  top: '已经到顶啦',
}

@Component
export default class GuetList extends Vue {
  @Prop({ required: true }) list!: ProjectItem[]
  @Prop({ required: true }) requestData!: () => Promise<unknown>
  @Prop({ required: true }) refreshData!: () => Promise<unknown>
  @Prop({ required: true }) finished!: boolean

  bscroll: any = null
  tipText = ''
  isPullUpLoad = false

  async pullingDownHandler() {
    this.setTipText(PHASE.top)
    // this.setTipText(PHASE.fetching)
    // await this.refreshData()
    // this.setTipText(PHASE.succeed)
    // tell BetterScroll to finish pull down
    this.bscroll.finishPullDown()
    // waiting for BetterScroll's bounceAnimation then refresh size
    setTimeout(() => {
      this.bscroll.refresh()
    }, TIME_BOUNCE + 50)
  }

  /** 下拉 */
  async pullingUpHandler() {
    if (!this.finished) {
      this.isPullUpLoad = true
      await this.requestData()
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('')
        }, 2000)
      })
    }
    this.bscroll.finishPullUp()
    this.bscroll.refresh()
    this.isPullUpLoad = false
  }

  scrollToTop() {
    this.bscroll.scrollTo(0, 0, 300)
  }

  setTipText(phase: string) {
    this.tipText = TEXTS_MAP[phase]
  }

  initBscroll() {
    this.bscroll = new BScroll(this.$refs.bsWrapper as HTMLElement, {
      scrollY: true,
      bounceTime: TIME_BOUNCE,
      useTransition: false,
      pullUpLoad: true,
      pullDownRefresh: {
        threshold: THRESHOLD,
        stop: STOP
      },
      mouseWheel: true
    })

    this.bscroll.on('pullingDown', this.pullingDownHandler)
    this.bscroll.on('pullingUp', this.pullingUpHandler)
    this.bscroll.on('scrollEnd', () => {
      // console.log('scrollEnd')
    })
    this.bscroll.on('enterThreshold', () => {
      this.setTipText(PHASE.top)
      // this.setTipText(PHASE.moving.enter)
    })
    this.bscroll.on('leaveThreshold', () => {
      this.setTipText(PHASE.top)
      // this.setTipText(PHASE.moving.leave)
    })
  }

  mounted() {
    this.$nextTick(() => {
      this.initBscroll()
    })
  }

  @Watch('list', { deep: true })
  listChange (newVal: string, oldVal: string) {
    this.$nextTick(() => {
      if (this.bscroll) {
        this.bscroll.refresh()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.pulldown-sina {
  height: 100%;
}

.pulldown-bswrapper {
  position: relative;
  height: 100%;
  padding: 0px 12px 16px;
  overflow: hidden;
}

.pulldown-tips {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}

.pullup-tips {
  padding: 20px;
  text-align: center;
  color: #999;
}

</style>
