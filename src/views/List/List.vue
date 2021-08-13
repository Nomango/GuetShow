<template>
  <div class="list-wrapper">
    <div class="list-header-left" @click="handleonClickLeft">
      <i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
    </div>
    <Title title="优秀毕设" subTitle="Excellent Graduation Design &amp; Thesis Exhibition" />
    <div class="list-content">
      <div class="list-form" :class="[showFilter ? 'show-filter' : '']">
        <div class="list-select-group">
          <span class="list-order-by list-select-group-item" @click="handleOrderBy">
            <van-icon name="sort" /> {{orderByTitle}}
          </span>
          <span class="list-filter list-select-group-item" @click="handleOpenSearch">
            <van-icon name="filter-o" /> 按条件查找
          </span>
        </div>
        <div class="list-filter-title">
          - 过滤条件 -
        </div>
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
        <div class="list-select-group">
          <Input
            v-model="listQuery.query"
            placeholder="搜索毕设名称 / 学生名称"
          />
        </div>
        <div class="list-select-group">
          <span class="list-query-clear list-select-group-item" @click="handleClear">
            <van-icon name="revoke" /> 重置
          </span>
          <span class="list-query-clear list-select-group-item" @click="handleConfirmSearch">
            <van-icon name="success" /> 确认
          </span>
        </div>
        <div class="list-filter-title">
          <van-icon name="close" @click="handleOpenSearch" />
        </div>
      </div>
      <div class="guet-list-wrap">
        <GList
          v-show="list.length"
          :requestData="handleLoadMore"
          :refreshData="handleRefreshData"
          :list="list"
          :finished="finished"
          ref="gList"
        >
          <template v-slot:default="{item}">
            <div
              class="project-item"
              @click="handleItemClick(item.id)"
            >
              <div class="project-image-wrap">
                <img :src="item.cover" class="project-image" />
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
  showFilter = false;
  orderBy = "level";
  orderByTitle = "按评级排序";

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
      orderBy: this.orderBy,
      page: this.page,
      pageSize: this.pageSize
    };
  }

  async handleGetWorks(isDebounce?: boolean) {
    if (isDebounce) {
      this.page = defaultWorksConfig.page; // 恢复到第一页
    }
    const res = await fetchWorks(this.handleListQuery());
    const { data } = res || ({} as any);

    const listData = data?.works || [];
    const totalCount = data?.total_count;

    if (!isDebounce && listData.length) {
      this.list = this.list.concat(...listData);
    }

    if (isDebounce) {
      this.list = listData;
      setTimeout(() => {
        (this.$refs.gList as GList)?.scrollToTop(); // 列表回到顶部
      }, 100);
    }

    this.loading = false;
    this.totalCount = totalCount;

    if (this.list.length === totalCount) {
      this.finished = true;
    } else {
      this.finished = false;
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

  handleOpenSearch() {
    this.showFilter = !this.showFilter;
  }

  handleOrderBy() {
    if (this.orderBy == "level") {
      this.orderBy = "name";
      this.orderByTitle = "按名称排序";
    } else {
      this.orderBy = "level";
      this.orderByTitle = "按评级排序";
    }
    this.debounceGetWorks();
  }

  handleConfirmSearch() {
    this.showFilter = false;
    this.debounceGetWorks();
  }

  handleClear() {
    this.listQuery = {
      query: "",
      mentor: "",
      level: "",
      school: ""
    };
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

  // @Watch("listQuery", { deep: true })
  // activeTypeChange(val: any, oldVal: any) {
  //   this.debounceGetWorks();
  // }
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
  margin-top: 3px;
}

.guet-list-wrap {
  height: calc(100% - 86px);
  margin-top: 20px;
}

.list-select-group {
  display: flex;
  justify-content: space-around;
  margin-top: 12px;

  .guet-select-wrap {
    flex: 1;

    &:not(:last-of-type) {
      margin-right: 6px;
    }
  }

  .list-select-group-item {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 0 10px;
    width: 100%;
    text-align: center;

    &:not(:last-of-type) {
      margin-right: 6px;
    }

    .van-icon {
      top: 2px;
    }
  }

  .list-query-clear {
    width: 100%;
  }
}

.list-filter-title {
  margin-top: 12px;
  text-align: center;
  font-size: 14px;

  .van-icon {
    padding: 5px 10px;
  }
}

.list-form {
  padding: 0 30px;
  max-height: 50px;
  overflow-y: hidden;
  transition: max-height .5s ease;

  // .guet-input-wrapper {
  //   margin-top: 12px;
  // }
}

.list-form.show-filter {
  max-height: 280px;
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
    width: 84px;
    height: 84px;
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
