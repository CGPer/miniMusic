<template>
  <div class="loading-page" v-if="isLoading" :class="{ blur: isBlur }">
    <div class="loading-box">
      <div class="loading-ring-out">
        <div class="loading-ring-inner"></div>
      </div>
      <div class="loading-box-1">
        <div class="loading-dot-1"></div>
      </div>
      <div class="loading-box-2">
        <div class="loading-dot-2"></div>
      </div>
      <div class="loading-box-3">
        <div class="loading-dot-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isBlur: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.loading-page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.blur {
  backdrop-filter: blur(10px);
}

.loading-box {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate 0.5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.loading-ring-out {
  width: 62px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  filter: blur(3px);
  opacity: 0.4;
  background: conic-gradient(white, #c5b5f0, white, orange, white, #28ca42);
}
.loading-ring-inner {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: white;
}

.loading-box-1 {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 100px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-15deg);
  transform-origin: 0 0;
}

.loading-box-2 {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 100px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(105deg);
  transform-origin: 0 0;
}

.loading-box-3 {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 100px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-135deg);
  transform-origin: 0 0;
}

.loading-dot-1 {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #c5b5f0;
}

.loading-dot-2 {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: orange;
}

.loading-dot-3 {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #28ca42;
}
</style>
