<template>
  <div class="pagination">
    <div
      class="pagination-item prev"
      :disabled="isFirst"
      @click="change(current - 1, isFirst)"
    >
      <i class="fa fa-angle-left"></i>
    </div>
    <div
      v-for="i in list"
      :key="i"
      :class="{ 'pagination-item': true, active: current === i }"
      @click="change(i)"
    >
      {{ i }}
    </div>
    <div
      class="pagination-item next"
      :disabled="isLast"
      @click="change(current + 1, isLast)"
    >
      <i class="fa fa-angle-right"></i>
    </div>

    <drop-down
      v-if="sizeOption && sizeOption.length"
      :switchList="sizeList"
      @onChange="changePageSize"
    />
  </div>
</template>

<script setup>
import { defineEmits, computed, ref } from "vue";
import DropDown from "../DropDown/index.vue";

const props = defineProps({
  currentPage: Number,
  total: {
    require: true,
    type: Number,
  },
  sizeOption: Array,
});

const emit = defineEmits(["onChange", "onSizeChange"]);

let _sizeList = [];
if (props.sizeOption && props.sizeOption.length)
  props.sizeOption.forEach((item) => {
    _sizeList.push({ value: item, text: item + "条/页" });
  });

const current = ref(props.currentPage || 1);
const isFirst = computed(() => current.value === 1);
const isLast = computed(() => current.value === props.total);
const sizeList = ref(_sizeList);
const list = computed(() => {
  let list = [];
  if (current.value <= 3 || props.total <= 5)
    for (let i = 0; i < 5 && i < props.total; i++) list.push(i + 1);
  else if (current.value >= props.total - 2)
    for (let i = props.total - 4; i <= props.total; i++) list.push(i);
  else for (let i = -2; i <= 2; i++) list.push(current.value + i);
  return list;
});

function change(page, dis) {
  if (dis || current.value === page) return;
  current.value = page;
  emit("onChange", page);
}

function changePageSize(value) {
  emit("onSizeChange", value.value);
}
</script>


<style scoped>
.pagination {
  display: flex;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 12px;
  color: #000000d9;
}

.pagination-item {
  display: inline-block;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  user-select: none;
}

.pagination-item.active,
.pagination-item:hover:not(.pagination-item.prev[disabled="true"], .pagination-item.next[disabled="true"]) {
  font-weight: 500;
  border-color: #1890ff;
  color: #1890ff;
  transition: 0.3s;
}

.pagination-item.prev[disabled="true"],
.pagination-item.next[disabled="true"] {
  cursor: not-allowed;
  color: #00000040;
}
</style>