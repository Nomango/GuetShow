<template>
  <div class="guet-list" ref="root">
    <slot />
    <div class="guet-loading" v-if="loading && !finished">
      <Loading class="guet-loading-icon">
        {{ loadingText || "loading" }}
      </Loading>
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
import { getScrollParent } from "@/utils/dom";

@Component({
  components: {
    Loading
  }
})
export default class List extends Vue {
  @Prop() value!: boolean;
  @Prop() error!: boolean;
  @Prop() loading!: boolean;
  @Prop() finished!: boolean;
  @Prop() errorText!: string;
  @Prop() loadingText!: string;
  @Prop() finishedText!: string;
  @Prop({ default: 300, type: [String, Number] }) offset!: number | string;

  scrollParent: Element | null = null;

  init() {
    // eslint-disable-next-line dot-notation
    const el = this.$refs["root"] as Element;
    const scrollParent = getScrollParent(el);

    if (scrollParent) {
      this.scrollParent = scrollParent as Element;
      scrollParent.addEventListener("scroll", this.check);
    }
  }

  check() {
    this.$nextTick(() => {
      if (this.loading || this.finished || this.error) {
        return;
      }

      const offset = this.offset;
      const scrollParentRect = this.scrollParent?.getBoundingClientRect();

      if (!scrollParentRect?.height) {
        return;
      }

      let isReachEdge = false;

      isReachEdge = 0 - scrollParentRect.bottom <= offset;

      if (isReachEdge) {
        this.$emit("update:loading", true);
        this.$emit("load");
      }
    });
  }

  removeInit() {
    if (this.scrollParent) {
      this.scrollParent.removeEventListener("scroll", this.check);
    }
  }

  @Watch("loading")
  @Watch("finished")
  @Watch("error")
  statusChange() {
    this.check();
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
</style>
