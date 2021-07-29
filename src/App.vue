<template>
  <div id="app">
    <img class="hidden-icon" src="./assets/Image/logo_s.png" />
    <router-view class="view"></router-view>
    <transition name="fade">
      <div class="global-loading" v-show="loading">
        <van-loading color="#0094ff" size="24px" vertical>
          加载中...
        </van-loading>
      </div>
    </transition>
  </div>
</template>

<script>
import { EventBus } from "@/utils/eventBus";

export default {
  data() {
    return {
      transitionName: "fold-left",
      loading: true
    };
  },
  mounted() {
    this.setEvent();
  },
  methods: {
    setEvent() {
      EventBus.$on("toggleLoading", status => {
        if (status !== undefined && status !== null) {
          this.loading = status;
        } else {
          this.loading = !this.loading;
        }
      });
    }
  }
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  color: #434343;
  font-family: FZYINGLT_ZHUNJW;
}

.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f9ff;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.hidden-icon {
  position: absolute;
  visibility: hidden;
}
</style>
