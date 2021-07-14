<template>
  <div class="list-wrapper">
    <van-nav-bar
      title="毕设SHOW"
      fixed
      left-arrow
      border
      @click-left="onClickLeft"
    />
    <div class="list-content">
      <div class="list-select-group">
        <Select
          v-model="listQuery.school"
          placeholder="请选择学院"
          :active="activeType === 1"
          @picker-show="handlePickerShow(1)"
          @select-close="handleSelectClose(1)"
        />
        <Select
          v-model="listQuery.mentor"
          placeholder="请选择导师"
          :active="activeType === 2"
          @picker-show="handlePickerShow(2)"
          @select-close="handleSelectClose(2)"
        />
        <Select
          v-model="listQuery.level"
          placeholder="请选择奖项"
          :active="activeType === 3"
          @picker-show="handlePickerShow(3)"
          @select-close="handleSelectClose(3)"
        />
      </div>
      <GList
        v-show="list.length"
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的～"
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
          >
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
              <div class="project-action">
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
        </transition-group>
      </GList>
      <van-empty
        v-show="!list.length"
        class="list-custom-image"
        description="暂无数据～"
      />
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

import { Select, GList } from "@/components";
import { fetchWorks, fetchSchools, fetchMentors } from "@/api/list";
import { SELECTTYPE, defaultWorksConfig, defaultLevel } from "@/libs/constant";
import { ProjectItem, TeacherItem } from "@/types/home";

@Component({
  components: {
    Select,
    GList
  },

  beforeRouteEnter(to, from, next) {
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

      next((vm: any) => {
        const totalCount = projectResData?.total_count || 0;
        const listData = projectResData?.works || [];

        vm.temp[SELECTTYPE.school].target = schoolResData || [];
        vm.temp[SELECTTYPE.mentor].origin = mentorResData?.teachers || [];
        vm.temp[SELECTTYPE.mentor].target = (mentorResData?.teachers || []).map(
          (item: TeacherItem) => {
            return item.name;
          }
        );

        vm.list = listData;
        vm.totalCount = totalCount;

        if (listData.length === totalCount) {
          vm.finished = true;
        }

        vm.loading = false;
      });
    });
  }
})
export default class List extends Vue {
  activeType: SELECTTYPE = SELECTTYPE.default;

  listQuery = {
    school: "",
    mentor: "",
    level: ""
  };

  temp = {
    [SELECTTYPE.school]: {
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
  loading = true;
  totalCount = 0;
  finished = false;

  onLoad() {
    if (this.finished) {
      return;
    }

    this.page = this.page++;
    this.handleGetWorks();
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

  async handleGetWorks() {
    this.loading = true;
    const res = await fetchWorks(this.handleListQuery());
    const { data } = res || ({} as any);

    const listData = data?.works || [];
    const totalCount = data?.total_count;

    this.list = listData;
    this.loading = false;
    this.totalCount = totalCount;

    if (listData.length === totalCount) {
      this.finished = true;
    }
  }

  handleToDetail(id: string) {
    if (!id) {
      return;
    }

    this.$router.push({
      path: `/detail/${id}`
    });
  }

  onClickLeft() {
    this.$router.go(-1);
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
    this.handleGetWorks();
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
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 46px;
  background-color: #f5f9ff;
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
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  margin-top: 15px;
}

.list-content .guet-list {
  flex: 1;
  overflow: auto;
  margin-top: 20px;
  padding: 0px 32px 16px;
}

.list-select-group {
  display: flex;
  justify-content: space-around;
  padding: 0px 16px;

  .guet-select {
    width: 110.34px;

    &:not(:last-of-type) {
      margin-right: 6px;
    }
  }
}

.project-item {
  width: 100%;
  margin-bottom: 16px;
  background-color: #fff;
  box-shadow: 0 8px 12px #ebedf0;
  border-radius: 12px;

  .project-image-wrap {
    width: 100%;
    height: 200px;

    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px 12px 0 0;
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

.project-action {
  width: 100%;
  text-align: center;
}
</style>
