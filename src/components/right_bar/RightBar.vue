<template>
  <div class="right-bar">
    <div class="right-bar-buttons">
      <div @click="closeMainWindow" class="right-bar-close-button close-button"></div>
      <div @click="minimizeMainWindow" class="minimize-button"></div>
      <div @click="showAboutDialog" class="about-button"></div>
    </div>
    <div class="drag-bar"></div>
    <div class="setting">
      <img src="@/assets/setting.svg" @click="showSettingPanel">
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  name: "right-bar",
  data() {
    return {};
  },
  methods: {
    closeMainWindow() {
      ipcRenderer.send("closeMainWindow");
    },

    minimizeMainWindow() {
      ipcRenderer.send("minimizeMainWindow");
    },

    showAboutDialog() {
      this.$store.commit("showDialog", "about");
    },

    showSettingPanel() {
      this.$store.commit("showSettingPanel")
      let payload = {
        router: 'nav',
        path: this.$router.currentRoute.path
      }
      this.$store.commit("setRouterHistory", payload)
      this.$router.push(this.$store.state.routerHistory.settingRouter)
    }
  },
};
</script>

<style>
.right-bar {
  width: 40px;
  height: 100%;
  position: relative;
  float: left;
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
}

.right-bar-buttons {
  width: 100%;
  flex-shrink: 0;
}

.close-button {
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

.right-bar-close-button {
  margin-left: 10px;
  margin-top: 10px;
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

.drag-bar {
  width: 100%;
  flex-grow: 1;
  -webkit-app-region: drag;
}

.drag-bar:hover {
  cursor: move;
}

.drag-bar:active {
  cursor: move;
}

.setting {
  width: 40px;
  height: 40px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
}

.setting > img {
  width: 20px;
  height: 20px;
}

.setting > img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.setting > img:active {
  transform: scale(1.5);
}
</style>
