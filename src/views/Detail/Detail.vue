<template>
  <div class="detail-container">
    <header class="detail-header">
      <div class="detail-header-left" @click="handleonClickLeft">
        <i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
      </div>
      <div class="detail-header-right">
        <img
          class="detail-header-logo"
          src="https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/logo_compress.png"
          alt=""
        />
      </div>
    </header>
    <div class="detail-main">
      <h2 class="article-title">{{ projectInfo.name }}</h2>
      <hr class="article-info-hr" />
      <div class="article-info">
        <div class="article-info-item big" v-if="level">
          <span class="article-info-icon">
            <img src="../../assets/Image/price.svg" alt="" />
          </span>
          <span class="article-info-text">{{ level }}</span>
        </div>
        <br />
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
            <img src="../../assets/Image/teacher.svg" alt="" />
          </span>
          <span class="article-info-text">{{ teachers }}</span>
        </div>
        <br />
        <div class="article-info-item">
          <span class="article-info-text">{{ projectInfo.school }}</span>
          <span class="article-info-text">{{ projectInfo.major }}专业</span>
        </div>
        <br />
        <div class="article-info-item" v-if="phoneNumber">
          <!-- <span class="article-info-icon">
            <img src="../../assets/Image/phone.svg" alt="" />
          </span> -->
          <span class="article-info-text">
            联系方式：<a :href="'tel:' + phoneNumber" v-if="phoneNumber">{{
              phoneNumber
            }}</a>
          </span>
        </div>
        <div class="article-info-item" v-if="studentEmail">
          <!-- <span class="article-info-icon">
            <img src="../../assets/Image/email.svg" alt="" />
          </span> -->
          <span class="article-info-text">
            联系方式：
            <a :href="'mailto:' + studentEmail" v-if="studentEmail">
              {{ studentEmail }}
            </a>
          </span>
        </div>
        <div
          class="article-info-item"
          v-if="!phoneNumber && !studentEmail && projectInfo.connect"
        >
          <span class="article-info-text">
            联系方式：{{ projectInfo.connect }}
          </span>
        </div>
      </div>
      <!-- <img class="article-cover" :src="projectInfo.cover" alt="" /> -->
      <hr class="article-info-hr" />
      <div class="markdown-body" v-html="detailContent" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";

import { getWorkListById, fetchMentors } from "@/api/list";
import { ProjectItem, TeacherItem } from "@/types/home";
import { EventBus } from "@/utils/eventBus";

@Component({
  beforeRouteEnter: async (to: Route, form, next) => {
    EventBus.$emit("toggleLoading", true);

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

        setTimeout(() => {
          EventBus.$emit("toggleLoading");

          next((vm: any) => {
            vm.projectInfo = {
              ...(workData || {}),
              teachers: teachers.filter(Boolean)
            };
          });
        }, 200);
      })
      .catch(e => {
        console.log(e);
      });
  }
})
export default class Detail extends Vue {
  projectInfo: ProjectItem = {} as ProjectItem;

  get studentName() {
    return (this.projectInfo.student && this.projectInfo.student.name) || "";
  }

  get level() {
    switch (this.projectInfo.level) {
      case 1:
        return "一等奖";
      case 2:
        return "二等奖";
      case 3:
        return "三等奖";
    }
    return "";
  }

  get phoneNumber() {
    return /^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.projectInfo.connect)
      ? this.projectInfo.connect
      : "";
  }

  get studentEmail() {
    return /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
      this.projectInfo.connect
    )
      ? this.projectInfo.connect
      : "";
  }

  get teachers() {
    const newTeachers = this.projectInfo.teachers;
    return newTeachers?.length ? "导师：" + newTeachers.join("、") : "";
  }

  get detailContent() {
    return this.projectInfo.content || "";
  }

  handleonClickLeft() {
    this.$router.replace({
      path: "/list"
    });
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
  padding-top: 16px;
  overflow: auto;
}

.detail-header {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 40px;
}

.detail-header-left {
  position: absolute;
  top: -8px;
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

.detail-main {
  padding-bottom: 16px;
}

.detail-header-right {
  color: #323233;
  height: 40px;

  .detail-header-logo {
    width: 38%;
    display: block;
    margin: 0 auto;
  }

  .detail-header-title {
    max-width: 60%;
    margin: 0 auto;
    font-weight: 500;
    font-size: 18px;
  }
}

.article-cover {
  width: 85%;
  margin: 10px auto 5px;
  display: block;
  border-radius: 8px;
}

.article-title {
  margin: 15px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.article-info {
  padding: 12px 0 10px;
  text-align: center;
}

.article-info-item {
  display: inline-flex;
  align-items: center;
  padding-bottom: 5px;

  &:not(:first-of-type) {
    margin-left: 12px;
  }

  .article-info-text {
    margin-left: 6px;
    font-size: 14px;

    a {
      color: #434343;
    }
  }
}

.article-info-item.big {
  margin-bottom: 8px;

  .article-info-text {
    font-size: 18px;
  }
}

.article-info-icon {
  width: 20px;
  display: inline-block;

  img {
    width: 100%;
  }
}

.article-info-hr {
  width: 80%;
  margin: 0 auto;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0));
}

.markdown-body {
  height: 110%;
  padding: 22px 16px;
}
</style>
