<template>
  <div class="right-bar">
    <div @click="closeMainWindow" class="close-button"></div>
    <div @click="minimizeMainWindow" class="minimize-button"></div>
    <div @click="isShowAboutDialog = true" class="about-button"></div>
    <div class="drag-bar"></div>
    <div class="about-page" v-show="isShowAboutDialog">
      <div @click="closeAboutDialog" class="close-dialog-button"></div>
      <div class="about-box">
        <div class="aboutItem">
          <div>作者：</div>
          <div>凤舞九天</div>
        </div>
        <div class="aboutItem">
          <div>项目地址：</div>
          <div class="Link" @click="openLink0">gitee链接</div>
        </div>
        <div class="aboutItem">
          <div>开源协议：</div>
          <div>MulanPSL2</div>
        </div>
        <div class="programDescription">
          <div class="descriptionHeader">声明：</div>
          <div class="descriptionBody">
            此项目仅用于代码学习和技术交流，不提供任何音乐下载或vip付费服务。请尊重音乐平台和创作者的版权，切勿做出任何损害音乐平台和创作者利益的行为。如若此项目无意侵犯了你的利益，请及时联系作者（1833608478@qq.com）删除源代码。
          </div>
        </div>
        <div class="programDescription">
          <div class="descriptionHeader">提示：</div>
          <div class="descriptionBody">
            此app为无边框应用，右侧宽40px的区域为拖动区，按住左键进行窗口拖动。
          </div>
        </div>
        <div class="thanks">
          <div>致谢：</div>
          <div class="thanksItem">
            <div class="Link" @click="openLink1">Vue.js</div>
            <div class="Link" @click="openLink2">electron</div>
            <div class="Link" @click="openLink3">Element</div>
            <div class="Link" @click="openLink4">node-music-api</div>
            <div class="Link" @click="openLink5">
              vue-cli-plugin-electron-builder
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
const { shell } = window.require("electron");

export default {
  name: "right-bar",
  data() {
    return {
      isShowAboutDialog: false,
    };
  },
  methods: {
    closeMainWindow() {
      ipcRenderer.send("closeMainWindow");
      
    },

    minimizeMainWindow() {
      ipcRenderer.send("minimizeMainWindow");
    },

    closeAboutDialog() {
      this.isShowAboutDialog = false
    },

    openLink0() {
      shell.openExternal("https://gitee.com/cgper/miniMusic");
    },
    openLink1() {
      shell.openExternal("https://cn.vuejs.org/");
    },
    openLink2() {
      shell.openExternal("https://www.electronjs.org/");
    },
    openLink3() {
      shell.openExternal("https://element.eleme.cn/#/zh-CN");
    },
    openLink4() {
      shell.openExternal("https://github.com/lunhui1994/node-music-api");
    },
    openLink5() {
      shell.openExternal(
        "https://github.com/nklayman/vue-cli-plugin-electron-builder"
      );
    },
  },
};
</script>

<style>
.right-bar {
  width: 40px;
  height: 100%;
  position: relative;
  float: left;
  border-radius: 0 20px 20px 0;
}

.close-button {
  margin-left: 10px;
  margin-top: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
}

.close-button:hover {
  background-color: transparent;
  background-image: url("../../assets/close.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}

.close-button:active {
  transform: scale(1.5);
}

.minimize-button {
  margin-left: 10px;
  margin-top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: orange;
}

.minimize-button:hover {
  background-color: transparent;
  background-image: url("../../assets/minimize.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}

.minimize-button:active {
  transform: scale(1.5);
}

.about-button {
  margin-left: 10px;
  margin-top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #28ca42;
}

.about-button:hover {
  background-color: transparent;
  background-image: url("../../assets/about.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}

.about-button:active {
  transform: scale(1.5);
}

.about-page {
  width: 700px;
  position: absolute;
  left: -800px;
  top: 200px;
  z-index: 5;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.close-dialog-button {
  margin-left: 670px;
  margin-top: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
}

.close-dialog-button:hover {
  background-color: transparent;
  background-image: url("../../assets/close.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}

.close-dialog-button:active {
  transform: scale(1.5);
}

.about-box {
  width: 650px;
  margin-top: 20px;
  margin-left: 25px;
}

.aboutItem {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
}

#programLink {
  font-size: 16px;
}

.programDescription {
  border: 1px solid #c5b5f0;
  padding: 8px;
  border-radius: 10px;
  margin-top: 10px;
}

.descriptionHeader {
  font-size: 16px;
}

.descriptionBody {
  margin-top: 10px;
  font-size: 14px;
  text-indent: 2em;
  line-height: 18px;
}

.thanks {
  border: 1px solid #c5b5f0;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 16px;
}

.thanksItem {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.thanksItem > div {
  margin-top: 10px;
}

.Link {
  color: #409eff;
}

.Link:hover {
  cursor: pointer;
}

.drag-bar {
  width: 100%;
  height: 100%;
  border-radius: 0 0 20px 0;
  -webkit-app-region: drag;
}

.drag-bar:hover {
  cursor: move;
}

.drag-bar:active {
  cursor: move;
}
</style>