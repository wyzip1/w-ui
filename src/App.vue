<template>
  <header id="head">
    <h1>MY - UI_COMPONENTS</h1>
  </header>
  <div class="code-demo">
    <h3>分页组件</h3>
    <div class="component">
      <Pagination
        :total="total"
        @onChange="changePage"
        :sizeOption="[5, 10, 15, 20]"
        @onSizeChange="changeSize"
      />
    </div>
  </div>
  <div class="code-demo">
    <h3>下拉菜单</h3>
    <div class="component flex gap-3">
      <drop-down :switchList="switchList" @onChange="changeTab" />
      <drop-down
        :switchList="[
          { value: 0, disabled: true, text: 'disabled' },
          { value: 1, text: 'enabled', disabled: false },
        ]"
      />
    </div>
  </div>
  <div class="code-demo">
    <h3>播放控件</h3>
    <div class="component">
      <Audio />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Pagination from "./components/Pagination/index.vue";
import DropDown from "./components/DropDown/index.vue";
import Audio from "./components/Audio/index.vue";

const total = ref(15);

const switchList = ref([
  { value: 0, text: "选项一" },
  { value: 1, text: "选项二" },
  { value: 2, text: "选项三" },
  { value: 3, text: "选项四" },
]);

function changePage(page) {
  console.log("page", page);
}

function changeTab(value) {
  console.log("tab", value);
}

function changeSize(size) {
  console.log(size);
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100vh;
  padding: 3vw;
  box-sizing: border-box;
}

#head {
  text-align: center;
}

.code-demo h3 {
  border-bottom: 1px solid #707077;
  padding-bottom: 6px;
  margin-bottom: 6px;
}

.flex {
  display: flex;
}

.gap-3 {
  gap: 15px;
}
</style>
