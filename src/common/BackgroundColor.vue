<template>
  <div class="background-color">
    <div class="background-box">
      <div
        :class="[
          {
            themeChange: index === 0 && canShowThemeAnimation === true,
          },
          item,
        ]"
        v-for="(item, index) in backgroundList"
        :style="{ zIndex: -index }"
        :key="item + item.length"
      >
        <img v-if="item == 'chameleon-theme'" :src="getAlbumImg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "background-color",
  computed: {
    ...mapState(["setting", "currentList", "currentListIndex", "canShowThemeAnimation"]),

    background: function () {
      return this.setting.appearance.background.value;
    },

    getAlbumImg() {
      //启动时以默认专辑图片做为背景图片
      if (this.currentList.length === 0) {
        return this.defaultAlbumImgUrl;
      }

      //获取当前歌曲专辑图片
      let albumimg = this.currentList[this.currentListIndex].albumImgUrl;

      return albumimg;
    },
  },
  data() {
    return {
      defaultAlbumImgUrl: require("@/assets/default-album-img.svg"),
      backgroundList: [
        "chameleon-theme",
        "milk-white-theme",
        "dark-highlight-theme",
        "simple-green-theme",
        "colorful-theme",
      ],
    };
  },
  watch: {
    background(newBackground) {
      console.log("can", this.canShowThemeAnimation);
      //如果监视到背景发生变化，则将用户选择的背景层移到顶层
      for (let i = 0; i < this.backgroundList.length; i++) {
        if (this.backgroundList[i] == newBackground) {
          let item = this.backgroundList.splice(i, 1);
          this.backgroundList.unshift(item);
        }
      }
    },
  },
};
</script>

<style>
.background-color {
  position: absolute;
  width: 100%;
  height: 100%;
}

.background-box {
  width: 100%;
  height: 100%;
  position: relative;
}

.themeChange {
  animation: themeMoveOut 1s cubic-bezier(0.2, 1, 0.9, 0.2);
}

@keyframes themeMoveOut {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.chameleon-theme {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(150px);
  transform: scale(1.4);
  background-color: #fff;
}

.chameleon-theme > img {
  position: absolute;
  width: 100%;
  height: 100%;
}

.milk-white-theme {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}

.dark-highlight-theme {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #171717;
}

.simple-green-theme {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #dffff5;
}

.colorful-theme {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  filter: blur(5px);
  z-index: 999;
  background: linear-gradient(45deg, #af66e1, #efc55f, #4ad073);
}
</style>
