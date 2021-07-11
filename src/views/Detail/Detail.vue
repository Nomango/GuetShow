<template>
  <div class="detail-container">
    <van-nav-bar
      fixed
      left-arrow
      :title="projectInfo.name"
      @click-left="handleonClickLeft"
    />
    <div class="detail-main">
      <!-- <h2 class="article-title">{{ projectInfo.name }}</h2> -->
      <div class="article-info">
        <div class="article-info-item">
          <span class="article-info-icon">
            <img src="../../assets/Image/people.svg" alt="" />
          </span>
          <span class="article-info-text">
            {{ studentName }}
          </span>
        </div>
        <div class="article-info-item" v-if="teachers">
          <span class="article-info-icon">
            <img src="../../assets/Image/people.svg" alt="" />
          </span>
          <span class="article-info-text">{{ teachers }}</span>
        </div>
      </div>
      <div class="markdown-body" v-html="detailContent" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";

import { getWorkListById, fetchMentors } from "@/api/list";
import { ProjectItem, TeacherItem } from "@/types/home";

@Component({
  beforeRouteEnter: async (to: Route, form, next) => {
    Promise.allSettled([
      fetchMentors(),
      getWorkListById({
        id: Number(to.params.id)
      })
    ])
      .then(res => {
        const [{ value: mentorVal }, { value: workVal }] = res as any;

        const { data: mentorData } = mentorVal || {};
        const { data: workData } = workVal || {};

        const teachers = (mentorData?.teachers || []).map(
          (item: TeacherItem) => {
            return (workData?.teachers || []).includes(item.id)
              ? item.name
              : "";
          }
        );

        next((vm: any) => {
          vm.loading = false;
          vm.projectInfo = {
            ...(workData || {}),
            teachers: teachers.filter(Boolean)
          };
        });
      })
      .catch(() => {
        next();
      });
  }
})
export default class Detail extends Vue {
  projectInfo: ProjectItem = {} as ProjectItem;

  loading = true;

  get studentName() {
    return (this.projectInfo.student && this.projectInfo.student.name) || "";
  }

  get teachers() {
    const newTeachers = this.projectInfo.teachers;
    return newTeachers?.length ? "导师：" + newTeachers.join("、") : "";
  }

  get detailContent() {
    return this.projectInfo.content || "";
  }

  handleonClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss">
@import "../../styles/editor.css";
</style>
<style lang="scss" scoped>
.detail-container ::v-deep .van-nav-bar {
  background-color: transparent;
  &::after {
    display: none;
  }
}

.detail-container {
  width: 100%;
  height: 100%;
  font-family: Arial, Helvetica, "STHeiti STXihei", "Microsoft YaHei", Tohoma,
    sans-serif;
  padding-top: 46px;
}

.article-title {
  font-size: 18px;
  text-align: center;
}

.article-info {
  margin-top: 12px;
  text-align: center;
}

.article-info-item {
  display: inline-flex;
  align-items: center;

  .article-info-text {
    margin-left: 6px;
  }
}

.article-info-icon {
  width: 20px;
  display: inline-block;

  img {
    width: 100%;
  }
}

.markdown-body {
  padding: 16px;
}
</style>
