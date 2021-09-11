<template>
  <div class="video">
    <video src="http://localhost:5000/video/THZ.mp4" ref="video"></video>
    <div class="control">
      <button @click="play()">播放</button>
      <button @click="pause()">暂停</button>
    </div>
    <div class="process" ref="process">
      <div
        :class="{ activeLength: true, active: allowMove }"
        :style="{ width: processActiveWdith + '%' }"
      ></div>
    </div>
    <div class="move-area" ref="moveArea" v-show="allowMove"></div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const video = ref();

const moveArea = ref();
const allowMove = ref(false);
const process = ref();
const processActiveWdith = ref(0);
const duration = ref(0);
const processTimer = ref();
const load = ref(false);

onMounted(() => {
  const { width: processWidth, left: processLeft } =
    process.value.getBoundingClientRect();

  window.video = video.value;

  video.value.oncanplay = () => {
    duration.value = video.value.duration;
    load.value = true;
    console.log("oncanplay");
  };

  video.value.onplay = () => {
    console.log("video play");
    processTimer.value = setInterval(() => {
      let { currentTime } = video.value;
      processActiveWdith.value = (currentTime / duration.value) * 100;
    }, 10);
  };

  video.value.onpause = () => clearInterval(processTimer.value);

  process.value.addEventListener("mousedown", ({ clientX }) => {
    if (!load.value) return;
    clearInterval(processTimer.value);
    allowMove.value = true;
    processActiveWdith.value = ((clientX - processLeft) / processWidth) * 100;
  });
  moveArea.value.addEventListener("mousemove", ({ clientX }) => {
    if (allowMove.value) {
      let activeWidth = ((clientX - processLeft) / processWidth) * 100;
      processActiveWdith.value = activeWidth > 100 ? 100 : activeWidth;
    }
  });
  moveArea.value.addEventListener("mouseup", ({ clientX }) => {
    allowMove.value = false;
    video.value.currentTime = (processActiveWdith.value / 100) * duration.value;
    play();
  });
});

function play() {
  if (!load.value) return;
  video.value.play();
}

function pause() {
  video.value.pause();
}
</script>


<style scoped>
* {
  user-select: none;
}

.video {
  padding: 10px 0;
  background-color: #fff;
}

.video .control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.video .process {
  background: #f2f2f2;
  height: 5px;
  border-radius: 100px;
  cursor: pointer;
}

.video .process .activeLength {
  width: 10%;
  height: 100%;
  background-color: #599bf1;
  position: relative;
  border-radius: 100px;
}

.video .process .activeLength::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #3887ee;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
  transition: 0.3s transform;
  transform-origin: right top;
}

.video .process:hover .activeLength::after {
  transform: scale(1.5) translate(50%, -50%);
}

.video .process .activeLength.active::after {
  transform: scale(1.5) translate(50%, -50%);
}

.move-area {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  cursor: pointer;
}
</style>

