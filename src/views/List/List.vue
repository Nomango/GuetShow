<template>
  <div class="list-wrapper">
    <div class="list-header-left" @click="handleonClickLeft">
      <i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
    </div>
    <Title title="优秀毕设" subTitle="Excellent Graduation Design &amp; Thesis Exhibition" />
    <div class="list-content">
      <div class="list-form">
        <div class="list-select-group">
          <Select
            v-model="listQuery.school"
            placeholder="请选择学院"
            :active="activeType === 1"
            @picker-show="handlePickerShow(1)"
            @select-close="handleSelectClose(1)"
          />
          <Select
            v-model="listQuery.level"
            placeholder="选择奖项"
            :active="activeType === 3"
            @picker-show="handlePickerShow(3)"
            @select-close="handleSelectClose(3)"
          />
        </div>
        <Input
          v-model="listQuery.query"
          placeholder="搜索毕设名称 / 学生名称"
        />
      </div>
      <div class="guet-list-wrap">
        <GList
          v-if="list.length"
          :requestData="handleLoadMore"
          :refreshData="handleRefreshData"
          :list="list"
        >
          <template v-slot:default="{item}">
            <div
              :key="item.id"
              :data-index="index"
              class="project-item"
              @click="handleItemClick(item.id)"
            >
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
                <h2 class="project-title u-ellipsis">{{ item.name }}</h2>
                <div class="project-info">
                  <div class="project-info-image">
                    <img src="../../assets/Image/people.svg" alt="" />
                  </div>
                  <span class="project-owner-name">
                    {{ item.student && item.student.name }}
                  </span>
                  <span class="project-school">
                    {{ item.school }}
                  </span>
                </div>
                <div class="project-description u-mutiple-ellipsis">
                  <span>{{ item.brief }}</span>
                </div>
              </div>
            </div>
          </template>
        </GList>
      </div>
      <!-- <GList
        v-show="list.length"
        :loading.sync="loading"
        :finished="finished"
        finished-text="没有更多了～"
        @load="onLoad"
      >
        <transition-group
          name="more"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
        >
          <div
            v-for="(item, index) in list"
            :key="item.id"
            :data-index="index"
            class="project-item"
            @click="handleItemClick(item.id)"
          >
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
              <h2 class="project-title u-ellipsis">{{ item.name }}</h2>
              <div class="project-info">
                <div class="project-info-image">
                  <img src="../../assets/Image/people.svg" alt="" />
                </div>
                <span class="project-owner-name">
                  {{ item.student && item.student.name }}
                </span>
                <span class="project-school">
                  {{ item.school }}
                </span>
              </div>
              <div class="project-description u-mutiple-ellipsis">
                <span>{{ item.brief }}</span>
              </div>
            </div>
          </div>
        </transition-group>
      </GList> -->
      <!-- <van-empty
        v-show="!list.length"
        class="list-custom-image"
        description="暂无数据～"
      /> -->
    </div>

    <van-popup
      v-model="showPicker"
      round
      position="bottom"
      @close="handleClosePopup"
    >
      <van-picker
        show-toolbar
        :columns="curColumns"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import { Select, GList, Input, Title } from "@/components";
import { fetchWorks, fetchSchools, fetchMentors } from "@/api/list";
import { SELECTTYPE, defaultWorksConfig, defaultLevel } from "@/libs/constant";
import { ProjectItem, TeacherItem } from "@/types/home";
import { debounce, throttle } from "@/utils/tools";
import { EventBus } from "@/utils/eventBus";

@Component({
  components: {
    Select,
    GList,
    Input,
    Title
  },

  beforeRouteEnter(to, from, next) {
    EventBus.$emit("toggleLoading", true);
    Promise.allSettled([
      fetchWorks({
        ...defaultWorksConfig
      }),
      fetchSchools(),
      fetchMentors()
    ]).then(res => {
      const [
        { value: projectRes },
        { value: schoolRes },
        { value: mentorRes }
      ] = res as any;

      const { data: projectResData } = projectRes;
      const { data: schoolResData } = schoolRes;
      const { data: mentorResData } = mentorRes;

      setTimeout(() => {
        EventBus.$emit("toggleLoading");

        next((vm: any) => {
          const totalCount = projectResData?.total_count || 0;
          const listData = projectResData?.works || [];

          vm.temp[SELECTTYPE.school].origin = schoolResData || [];
          vm.temp[SELECTTYPE.school].target = schoolResData || [];

          vm.temp[SELECTTYPE.mentor].origin = mentorResData?.teachers || [];
          vm.temp[SELECTTYPE.mentor].target = (
            mentorResData?.teachers || []
          ).map((item: TeacherItem) => {
            return item.name;
          });

          vm.list = listData;
          vm.totalCount = totalCount;

          if (listData.length === totalCount) {
            vm.finished = true;
          }
        });
      }, 200);
    });
  }
})
export default class List extends Vue {
  LevelImage = {
    1: require("../../assets/Image/ranking-1.png"),
    2: require("../../assets/Image/ranking-2.png"),
    3: require("../../assets/Image/ranking-3.png")
  };

  activeType: SELECTTYPE = SELECTTYPE.default;

  listQuery = {
    query: "",
    mentor: "",
    level: "",
    school: ""
  };

  temp = {
    [SELECTTYPE.school]: {
      origin: [],
      target: []
    },
    [SELECTTYPE.mentor]: {
      origin: [],
      target: []
    },
    [SELECTTYPE.level]: defaultLevel
  };

  page = defaultWorksConfig.page;
  pageSize = defaultWorksConfig.pageSize;
  showPicker = false;
  curColumns = [];
  list: ProjectItem[] = [];
  loading = false; // 列表加载更多
  totalCount = 0;
  finished = false;

  debounceGetWorks = debounce(() => {
    this.handleGetWorks(true);
  }, 300);

  throttleGetWorks = throttle(this.handleLoadMore, 100);

  // onLoad() {
  //   if (this.finished) {
  //     return;
  //   }
  //   this.throttleGetWorks();
  // }

  async handleRefreshData() {
    await this.handleGetWorks();
  }

  async handleLoadMore() {
    const page: number = this.page + 1;
    this.page = page;

    await this.handleGetWorks();
  }

  handleListQuery() {
    const query = { ...this.listQuery };

    if (query.mentor && typeof query.mentor === "string") {
      const mentorOriginData = (this.temp as any)[SELECTTYPE.mentor];

      const mentorItem = (mentorOriginData?.origin || []).find(
        (item: any) => item.name === query.mentor
      );

      if (mentorItem) {
        query.mentor = mentorItem.id;
      }
    }

    if (query.level && typeof query.level === "string") {
      const levelOriginData = (this.temp as any)[SELECTTYPE.level];
      const levelItem = (levelOriginData?.origin || []).find(
        (item: any) => item.name === query.level
      );

      if (levelItem) {
        query.level = levelItem.id;
      }
    }

    return {
      ...query,
      page: this.page,
      pageSize: this.pageSize
    };
  }

  async handleGetWorks(isDebounce?: boolean) {
    const res = await fetchWorks(this.handleListQuery());
    const { data } = res || ({} as any);

    const listData = data?.works || [];
    const totalCount = data?.total_count;

    if (!isDebounce && listData.length) {
      this.list = this.list.concat(...listData);
    }

    if (isDebounce) {
      this.list = listData;
    }

    this.loading = false;
    this.totalCount = totalCount;

    if (this.list.length === totalCount) {
      this.finished = true;
    }
  }

  handleItemClick(id: string) {
    if (!id) {
      return;
    }

    this.$router.push({
      path: `/detail/${id}`
    });
  }

  handleonClickLeft() {
    this.$router.replace({
      path: "/"
    });
  }

  handleClosePopup() {
    this.reset();
  }

  handleCancel() {
    this.reset();
  }

  reset() {
    this.activeType = SELECTTYPE.default;
    this.showPicker = false;
  }

  handleConfirm(value: string) {
    if (this.activeType) {
      const key = SELECTTYPE[this.activeType] as any;
      if (key) {
        (this.listQuery as any)[key] = value;
      }
    }
    this.activeType = SELECTTYPE.default;
    this.showPicker = false;
  }

  handleSelectClose(type: SELECTTYPE) {
    const key = SELECTTYPE[type] as any;
    (this.listQuery as any)[key] = "";
  }

  handlePickerShow(type: SELECTTYPE) {
    this.activeType = type;
    this.showPicker = true;
    const column = (this.temp as any)[type];
    this.curColumns = column?.target || [];
  }

  beforeEnter(el: HTMLDivElement) {
    el.style.opacity = "0";
  }

  enter(el: any, done: () => void) {
    const delay = el.dataset.index * 100;
    setTimeout(() => {
      el.style.transition = "opacity 0.4s ";
      el.style.opacity = "1";
      el.style.animation = "one-in 0.4s infinite";
      el.style["animation-iteration-count"] = 1;
      done();
    }, delay);
  }

  @Watch("listQuery", { deep: true })
  activeTypeChange(val: any, oldVal: any) {
    this.debounceGetWorks();
  }
}
</script>

<style lang="scss">
.list-custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}

@keyframes one-in {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
<style lang="scss" scoped>
.list-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f9ff;
}

.list-header-left {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  cursor: pointer;
  height: 40px;

  .van-icon {
    color: #1989fa;
  }
}

.list-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.list-content {
  position: relative;
  height: calc(100% - 101px);
  margin-top: 15px;
}

.guet-list-wrap {
  height: calc(100% -  110px);
  margin-top: 20px;
}

.list-form {
  padding: 0 30px;

  .guet-input {
    margin-top: 12px;
  }
}

.list-select-group {
  display: flex;
  justify-content: space-around;

  .guet-select-wrap {
    flex: 1;

    &:not(:last-of-type) {
      margin-right: 6px;
    }
  }
}

.project-item {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 12px;
  box-sizing: border-box;
  box-shadow: 0 8px 12px #ebedf0;
  border-radius: 6px;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  .project-image-wrap {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 6px;

    .project-level-image {
      position: absolute;
      left: 10px;
      top: 0;
      width: 24px;
    }

    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
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
  width: 0; // 显示省略号
  flex: 1;
  margin-left: 8px;
  text-align: left;

  .project-title {
    color: #14232a;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
}

.project-info {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .project-owner-name {
    margin-left: 3px;
  }

  .project-school {
    margin-left: 10px;
  }
}

.project-description {
  margin-top: 10px;
  text-align: justify;
}

.project-info-image {
  position: relative;
  display: flex;
  align-items: center;
  width: 15px;

  img {
    width: 100%;
  }
}
</style>
