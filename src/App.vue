<template>
  <div id="app">
    <div class="app-background" :style="appStyle">
      <background-color></background-color>
    </div>
    <div class="app-background-above" :style="appStyle">
      <!-- 展示需要显示的对话框 -->
      <component v-if="isShowDialog" :is="dialog"></component>
      <left-nav></left-nav>
      <middle-box></middle-box>
      <right-bar></right-bar>
    </div>
    <setting :style="settingPanelStyle"></setting>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BackgroundColor from "@/common/BackgroundColor.vue";
import LeftNav from "./components/left_nav/LeftNav";
import MiddleBox from "./components/middle_box/MiddleBox";
import RightBar from "./components/right_bar/RightBar";
import RemoveSongList from "@/common/dialog/RemoveSongList.vue";
import AddMarkSong from "@/common/dialog/AddMarkSong.vue";
import About from "@/common/dialog/About.vue";
import MvPlayer from "@/common/dialog/MvPlayer.vue";
import ChooseSinger from "@/common/dialog/ChooseSinger.vue";
import Setting from "@/common/setting/Setting.vue";

export default {
  name: "app",
  components: {
    LeftNav,
    MiddleBox,
    RightBar,
    AddMarkSong,
    RemoveSongList,
    About,
    MvPlayer,
    ChooseSinger,
    Setting,
    BackgroundColor,
  },
  data() {
    return {
      appStyle: {},
      settingPanelStyle: {},
    };
  },
  computed: {
    ...mapState(["dialog", "isShowDialog", "isShowSettingPanel", "backgroundTheme"]),
  },
  watch: {
    //绘制设置面板展示和隐藏的翻转动画
    isShowSettingPanel: function (newValue) {
      if (newValue === true) {
        this.appStyle = {
          animation: "Flip_0-90 0.3s linear forwards",
        };
        this.settingPanelStyle = {
          animation: "Flip_90-180 0.3s linear 0.3s forwards",
        };
      } else {
        this.settingPanelStyle = {
          animation: "Flip_180-90 0.3s linear forwards",
        };
        this.appStyle = {
          transform: "rotateY(90deg)",
          animation: "Flip_90-0 0.3s linear 0.3s forwards",
        };
      }
    },
  },
  mounted() {
    this.$store.commit("getHistoryData");
    this.$router.push({ path: "DiscoverPage" });
  },
};
</script>

<style>
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #7e57c2;
  --font-size: 16px;
  --font-color: black;
  --font-family: "";
  --font-weight: normal;
  --lyric-font-family: "";
  --lyric-font-size: 20px;
  --lyric-font-weight: normal;
  --background-color: #fdfdfd;
  --progress-bar-color: rgba(255, 255, 255, 0.1);
}

@font-face {
  font-family: "清松手写体";
  src: url("./assets/font/清松手写体.ttf");
}

@font-face {
  font-family: "新叶念体";
  src: url("./assets/font/新叶念体.otf");
}

@font-face {
  font-family: "点点像素体";
  src: url("./assets/font/点点像素体.otf");
}

@font-face {
  font-family: "汉字拼音体";
  src: url("./assets/font/汉字拼音体.ttf");
}

@font-face {
  font-family: "寒蝉手拙体";
  src: url("./assets/font/寒蝉手拙体.ttf");
}

@font-face {
  font-family: "品如手写体";
  src: url("./assets/font/品如手写体.ttf");
}

@font-face {
  font-family: "阿朱泡泡体";
  src: url("./assets/font/阿朱泡泡体.ttf");
}

@font-face {
  font-family: "OPPO Sans";
  src: url("./assets/font/OPPO Sans.ttf");
}

@font-face {
  font-family: "杨任东竹石体";
  src: url("./assets/font/杨任东竹石体.ttf");
}

@font-face {
  font-family: "方正楷体简体";
  src: url("./assets/font/方正楷体简体.ttf");
}

@font-face {
  font-family: "方正楷体繁体";
  src: url("./assets/font/方正楷体繁体.ttf");
}

@font-face {
  font-family: "站酷快乐体";
  src: url("./assets/font/站酷快乐体.ttf");
}

body {
  position: relative;
  perspective: 20000px;
}

#app {
  width: 1030px;
  height: 830px;
  position: relative;
  border-radius: 20px;
  -webkit-user-select: none;
  overflow: hidden;
  font-family: var(--font-family);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  color: var(--font-color);
}

@keyframes Flip_0-90 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

@keyframes Flip_90-0 {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes Flip_90-180 {
  from {
    transform: rotateY(-90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes Flip_180-90 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(-90deg);
  }
}

.app-background {
  width: 1000px;
  height: 800px;
  position: absolute;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
}

.app-background-above {
  width: 1000px;
  height: 800px;
  position: absolute;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
}

/* 下面修改全局滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
}

::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
