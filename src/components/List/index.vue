<template>
  <div class="guet-list" ref="root">
    <slot />
    <div class="guet-loading-box" v-if="loading && !finished">
      <Loading class="guet-loading-icon" text="加载中..." />
    </div>
    <div class="guet-finished" v-if="!loading && finished">
      <span class="guet-finished-text">{{ finishedText }}</span>
    </div>
    <div class="guet-error" v-if="error" onClick="{clickErrorText}">
      <span class="guet-error-text">{{ errorText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import Loading from "../Loading/index.vue";
import { throttle } from "@/utils/tools";

@Component({
  components: {
    Loading
  }
})
export default class List extends Vue {
  @Prop() error!: boolean;
  @Prop() loading!: boolean;
  @Prop() finished!: boolean;
  @Prop() errorText!: string;
  @Prop() loadingText!: string;
  @Prop() finishedText!: string;
  @Prop({ default: 200, type: [String, Number] }) offset!: number | string;

  scrollParent: Element | null = null;
  throttleCheck = throttle(this.check, 100);

  init() {
    // eslint-disable-next-line dot-notation
    const el = this.$refs["root"] as Element;

    if (el) {
      this.scrollParent = el;
      el.addEventListener("scroll", this.throttleCheck);
    }
  }

  check() {
    // 设置节流函数

    this.$nextTick(() => {
      if (this.loading || this.finished || this.error) {
        return;
      }

      const offset = this.offset;
      const scrollParent = this.scrollParent;

      if (!scrollParent) {
        return;
      }

      let isReachEdge = false;
      const bottom =
        scrollParent.scrollHeight -
        (scrollParent.clientHeight + scrollParent.scrollTop);

      isReachEdge = bottom <= offset;

      if (isReachEdge) {
        this.$emit("update:loading", true);
        this.$emit("load");
      }
    });
  }

  removeInit() {
    if (this.scrollParent) {
      this.scrollParent.removeEventListener("scroll", this.throttleCheck);
    }
  }

  @Watch("loading")
  @Watch("finished")
  @Watch("error")
  statusChange() {
    this.throttleCheck();
  }

  mounted() {
    this.init();
  }

  destroyed() {
    this.removeInit();
  }
}
</script>

<style lang="scss" scoped>
.guet-finished,
.guet-error,
.guet-loading {
  color: #969799;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}

.guet-finished-text {
  font-size: 12px;
  color: #ccc;
}

.guet-loading-box {
  margin-top: 5px;
}
</style>
