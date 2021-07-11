<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
    <router-view class="view"></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "fold-left"
    };
  },
  watch: {
    $route(to, from) {
      console.log("asdfasd", to);
      const routerDeep = ["/list", "/detail"];

      const toDepth = routerDeep.indexOf(to.path);
      const fromDepth = routerDeep.indexOf(from.path);
      console.log(toDepth, fromDepth);
      this.transitionName = toDepth > fromDepth ? "fold-left" : "fold-right";
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

.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: 0.3s;
}

.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: 0.3s;
}

@keyframes fold-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fold-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: 0.3s;
}

.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: 0.3s;
}

@keyframes fold-right-in {
  0% {
    width: 100%;
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    width: 100%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fold-right-out {
  0% {
    width: 100%;
    transform: translate3d(0, 0, 0);
  }

  100% {
    width: 100%;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
