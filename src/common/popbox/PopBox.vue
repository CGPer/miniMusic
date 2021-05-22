<template>
  <div
    class="pop-box"
    v-show="isShow"
    :style="setPopBoxStyle"
    tabindex="0"
    @blur="popBoxBlur"
    ref="popBoxDOM"
  >
    <div class="pop-box-item" @click="markSong">
      <div class="pop-box-item-icon-box">
        <img class="pop-box-item-icon" src="@/assets/mark.svg" />
      </div>
      <div class="pop-box-item-text">收藏</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pop-box",
  data() {
    return {
      positionX: 0,
      positionY: 0,
      isShow: false,
    };
  },
  computed: {
    setPopBoxStyle() {
      let popBoxStyle = {
        left: this.positionX + "px",
        top: this.positionY + "px",
      };

      return popBoxStyle;
    },
  },
  methods: {
    showPopBox(options) {
      this.positionX = options.positionX || 0;
      this.positionY = options.positionY || 0;
      this.isShow = true;
      setTimeout(() => {
        this.$refs.popBoxDOM.focus();
      }, 200);
    },

    popBoxBlur() {
      this.isShow = false;
      this.$EventBus.$emit("popBoxBlur");
    },

    markSong() {
      this.$EventBus.$emit("markSong");
      this.isShow = false;
    },
  },
};
</script>

<style>
.pop-box {
  position: absolute;
  padding: 8px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.pop-box:focus {
  outline: none;
}

.pop-box-item {
  height: 20px;
  display: flex;
  line-height: 20px;
  font-size: 14px;
  padding: 0 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.pop-box-item:last-child {
  margin-bottom: 0;
}

.pop-box-item:hover {
  cursor: pointer;
  background-color: var(--highlight-color);
}

.pop-box-item-icon-box {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop-box-item-icon {
  width: 16px;
  height: 16px;
}

.pop-box-item-text {
  height: 20px;
  line-height: 20px;
  padding: 0 5px;
  font-size: 12px;
  text-align: center;
}
</style>
