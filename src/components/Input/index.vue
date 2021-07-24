<template>
  <div class="guet-input" :class="wrapClass">
    <input
      class="guet-input__inner"
      :value="inputVal"
      :autocomplete="autocomplete"
      :type="type"
      :placeholder="placeholder"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="guet-input__prefix">
      <van-icon name="search" />
    </span>
    <span class="guet-input__clear" v-show="showClear" @click="handleClear">
      <van-icon name="clear" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @Prop() placeholder!: string;
  @Prop() autocomplete!: string;
  @Prop({ default: "text" }) type!: string;
  @Prop() value!: string | number;

  isFocus = false;

  handleFocus() {
    this.isFocus = true;
    this.$emit("focus", event);
  }

  handleBlur() {
    this.isFocus = false;
    this.$emit("blur", event);
  }

  handleInput(event: any) {
    this.$emit("input", event.target.value);
  }

  handleChange(event: any) {
    this.$emit("change", event.target.value);
  }

  handleClear() {
    this.$nextTick(() => {
      this.$emit("input", "");
      this.$emit("change", "");
      this.$emit("clear");
    });
  }

  get wrapClass() {
    return this.isFocus ? "is-focus" : "";
  }

  get showClear() {
    return this.isFocus && this.value;
  }

  get inputVal() {
    return this.value;
  }
}
</script>

<style lang="scss" scoped>
.guet-input {
  position: relative;
  display: inline-block;
  font-size: 14px;
  width: 100%;
}

.guet-input__inner {
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
  padding: 0 30px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;

  &::placeholder {
    color: #ccc;
  }
}

.guet-input__inner:focus {
  outline: none;
  border-color: #409eff;
}

.guet-input__prefix {
  display: inline-block;
  position: absolute;
  left: 9px;
  top: 56%;
  transform: translate(0, -50%);
  color: #c0c4cc;
  font-size: 18px;
}

.guet-input__clear {
  position: absolute;
  right: 6px;
  top: 51%;
  transform: translate(0, -50%);
  display: inline-block;
  line-height: 1;
  padding: 4px;
  color: #aaa;
}
</style>
