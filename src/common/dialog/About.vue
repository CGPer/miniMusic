<template>
  <div class="about-page">
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
          <div class="Link" @click="openLink4">node-music-api</div>
          <div class="Link" @click="openLink5">
            vue-cli-plugin-electron-builder
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { shell } = window.require("electron");

export default {
  name: "about",
  data() {
    return {};
  },
  methods: {
    closeAboutDialog() {
      this.$store.commit("hideDialog");
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
.about-page {
  width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 20px;
  background-color: var(--background-color);
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
</style>