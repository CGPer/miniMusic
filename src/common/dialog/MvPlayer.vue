<template>
  <div
    class="mv-player"
    @mouseenter="isShowCloseButton = true"
    @mouseleave="isShowCloseButton = false"
  >
    <div
      class="mv-player-close-button close-button"
      v-show="isShowCloseButton"
      @click="closeMVPlayerDialog"
    ></div>
    <video :src="MVUrl" id="mv-video" autoplay controls></video>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "mv-player",
  computed: {
    ...mapState(["MVUrl"]),
  },
  data() {
    return {
      isShowCloseButton: false,
    };
  },
  mounted() {
    let mvVideoDOM = document.querySelector("#mv-video");
    mvVideoDOM.volume = 0.3;
  },
  methods: {
    closeMVPlayerDialog() {
      this.$store.commit("hideDialog");
    },

    // 下面想实现鼠标拖动窗口，有点难搞，下次再说
    // mouseDownLeft(e) {
    //   this.dialogMovable = true;

    //   this.initPageX = e.pageX;
    //   this.initPageY = e.pageY;
    //   let left = this.$refs.MvPlayerDOM.getBoundingClientRect().left;
    //   let top = this.$refs.MvPlayerDOM.getBoundingClientRect().top;
    //   console.log("left", left);
    //   console.log("top", top);
    //   this.dialogInitPositionX = left;
    //   this.dialogInitPositionY = top;
    //   // console.log(this.dialogInitPositionX, this.dialogInitPositionY);
    // },

    // mouseMove(e) {
    //   // console.log(e);

    //   if (this.dialogMovable === true) {
    //     console.log("marginLeft", e.pageX - this.initPageX + this.dialogInitPositionX);
    //     console.log("marginTop", e.pageY - this.initPageY + this.dialogInitPositionY);
    //     this.MvPlayerStyle = {
    //       marginLeft: e.pageX - this.initPageX + this.dialogInitPositionX + "px",
    //       marginTop: e.pageY - this.initPageY + this.dialogInitPositionY + "px",
    //     };
    //   }
    // },

    // mouseUpLeft() {
    //   this.dialogMovable = false;
    // },
  },
};
</script>

<style>
.mv-player {
  width: 640px;
  height: 360px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 20px;
  overflow: hidden;
  background-color: var(--background-color);
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.mv-player > video {
  width: 100%;
  height: 100%;
}

.mv-player > video:focus {
  outline: none;
}

.mv-player-close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 999;
}
</style>
