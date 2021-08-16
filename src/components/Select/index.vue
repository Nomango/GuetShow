<template>
  <div class="guet-select-wrap">
    <div
      @click="showPicker"
      class="guet-select"
      :class="{ 'guet-select_active': active, 'guet-select_disabled': disabled }"
    >
      <span v-if="selectedText" class="guet-select-text">
        {{ selectedText }}
      </span>
      <span v-else class="guet-select-placeholder">
        {{ _placeholder }}
      </span>
      <i v-if="!selectedText" class="guet-select-icon" />
    </div>
    <!-- <div class="guet-select-close" v-if="selectedText" @click="handleClose">
      <van-icon name="close" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

const EVENT_PICKER_SHOW = "picker-show";
const EVENT_SELECT_CLOSE = "select-close";

@Component
export default class Select extends Vue {
  @Prop() placeholder!: string;
  @Prop({ default: false }) active!: boolean;
  @Prop() value!: string;
  @Prop({ default: false }) disabled!: boolean;

  get _placeholder() {
    return this.placeholder;
  }

  get selectedText() {
    return this.value;
  }

  showPicker() {
    this.$emit(EVENT_PICKER_SHOW);
  }

  handleClose() {
    this.$emit(EVENT_SELECT_CLOSE);
  }
}
</script>

<style lang="scss" scoped>
.guet-select-wrap {
  position: relative;
}

.guet-select {
  position: relative;
  padding: 0 20px 0 10px;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  color: #666;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.guet-select_active {
  border-color: #409eff;

  .guet-select-icon {
    transform: translateY(-50%) rotate(180deg);
  }
}

.guet-select-text {
  width: 100%;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: -7px;
}

.guet-select-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border-style: solid;
  border-color: #c0c4cc transparent transparent;
  border-width: 4px 4px 0;
  transition: transform 0.3s ease-in-out;
}

.guet-select-placeholder {
  color: #ccc;
}

.guet-select-close {
  position: absolute;
  right: 6px;
  top: 50%;
  margin-top: 2px;
  color: #c0c4cc;
  transform: translateY(-50%);
}
</style>
