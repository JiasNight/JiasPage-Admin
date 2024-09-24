<template>
  <div
    class="image-wrapper"
    :style="{
      width: props.width + 'px',
      height: props.height + 'px',
    }"
    @click="handleClick"
  >
    <img :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" />
  </div>
</template>

<script lang="ts" setup name="MyImage">
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 50,
  },
  height: {
    type: Number,
    default: 50,
  },
});

const handleClick = () => {
  let bodyDom = document.createElement("div");
  bodyDom.className = "image-mask";
  bodyDom.style.position = "fixed";
  bodyDom.style.left = "0";
  bodyDom.style.top = "0";
  bodyDom.style.width = "calc(100vw)";
  bodyDom.style.height = "calc(100vh)";
  bodyDom.style.background = "rgba(0,0,0,0.5)";

  let imgDom = document.createElement("img");
  imgDom.src = props.src + `?t=${new Date().getTime()}`;
  imgDom.style.width = "500px";
  imgDom.style.minWidth = "20px";
  imgDom.style.maxWidth = "2000px";
  // imgDom.style.height = '500px';
  imgDom.style.position = "absolute";
  imgDom.style.top = "50%";
  imgDom.style.left = "50%";
  imgDom.style.transform = "translate(-50%,-50%)";

  // 操作栏
  let optDom = document.createElement("div");
  optDom.style.position = "absolute";
  optDom.style.bottom = "0";
  optDom.style.left = "0";
  optDom.style.width = "100%";
  optDom.style.height = "50px";
  optDom.style.background = "rgba(0,0,0,0.5)";
  optDom.style.zIndex = "1";
  // 文字
  let textDom = document.createElement("div");
  textDom.style.position = "absolute";
  textDom.style.top = "50%";
  textDom.style.left = "50%";
  textDom.style.transform = "translate(-50%,-50%)";
  textDom.style.color = "#fff";
  textDom.innerHTML = "操作";
  optDom.appendChild(textDom);

  bodyDom.appendChild(optDom);
  bodyDom.appendChild(imgDom);
  document.body.appendChild(bodyDom);
  optDom.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  imgDom.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  imgDom.ondragstart = (e) => {
    e.preventDefault();
  };
  bodyDom.onwheel = (e) => {
    let scale = 1 - e.deltaY / 1000;
    imgDom.style.width = imgDom.clientWidth * scale + "px";
  };
  bodyDom.onclick = (e) => {
    imgDom.remove();
    bodyDom.remove();
  };
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;
  cursor: pointer;
  border-radius: 0.125rem;
  overflow: hidden;
  &:hover::after {
    content: "预览";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.75rem;
    text-align: center;
  }
}
</style>
