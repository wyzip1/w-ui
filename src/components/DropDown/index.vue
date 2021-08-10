<template>
  <div class="dropdown">
    <input type="text" readonly ref="input" />
    <span class="text">
      {{ tab.text }}
      <i class="fa fa-angle-down icon" aria-hidden="true"></i>
    </span>
    <transition name="scale">
      <div
        class="switch"
        :style="style"
        v-show="isFocus"
        @mousedown="mouseDown"
      >
        <div
          :class="{
            tab: true,
            active: tab.value === i.value,
            disabled: i.disabled,
          }"
          v-for="i in switchList"
          :key="i.value"
          @click="changeTab(i)"
        >
          {{ i.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "_vue@3.1.4@vue";

const emit = defineEmits(["onChange"]);

const props = defineProps({
  switchList: { type: Array, required: true },
  defaultTab: Object,
});

const input = ref();
const isFocus = ref(false);
const style = ref("display: none");
const tab = ref(
  props.defaultTab ||
    (props.switchList && props.switchList.length
      ? props.switchList[0]
      : { value: -1, text: "无数据", disabled: true })
);
function mouseDown(e) {
  e.preventDefault();
  return false;
}

function changeTab(value) {
  if (value.disabled) return;
  tab.value = value;
  emit("onChange", value);
  input.value.blur();
}

onMounted(() => {
  input.value.onfocus = function () {
    isFocus.value = true;
  };
  input.value.onblur = function () {
    isFocus.value = false;
  };
});
</script>


<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: auto;
  padding: 0 11px;
  box-sizing: border-box;
  height: 32px;
  text-align: center;
  font-size: 14px;
  line-height: 32px;
  color: #000000d9;
}

.dropdown .text .icon {
  color: #bfbfbf;
  margin-left: 5px;
}
.dropdown input {
  position: absolute;
  width: 100%;
  left: 0;
  cursor: pointer;
  height: 32px;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: 0.3s;
  box-sizing: border-box;
  background-color: transparent;
  z-index: 10;
}

.dropdown input:focus {
  border: 1px solid #40a9ff;
  box-shadow: 0 0 0 2px #1890ff33;
}

.dropdown input:focus + .text {
  color: #bfbfbf;
}

.dropdown .switch {
  width: 100%;
  position: absolute;
  left: 0;
  top: calc(100% + 5px);
  padding: 4px 0;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  box-sizing: border-box;
  background-color: #fff;
  transform-origin: top;
}

.dropdown .switch .tab {
  padding: 5px 12px;
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.dropdown .switch .tab:hover {
  background-color: #f5f5f5;
}

.dropdown .switch .tab.active {
  font-weight: 600;
  background-color: #e6f7ff;
}

.dropdown .switch .tab.disabled {
  background-color: #f5f5f5;
  color: #adadad;
}

.scale-enter-active {
  animation: scaleShow 0.1s;
}
.scale-leave-active {
  animation: scaleShow 0.1s reverse;
}

@keyframes scaleShow {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}
</style>