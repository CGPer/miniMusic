<template>
  <div class="setting-panel">
    <background-color></background-color>
    <div class="setting-option-box">
      <router-link to="/Appearance" class="setting-option">外观</router-link>
    </div>
    <keep-alive>
      <router-view name="settingView" class="setting-view"></router-view>
    </keep-alive>
    <div class="setting-close-button close-button" @click="hideSettingPanel"></div>
  </div>
</template>

<script>
import BackgroundColor from "../BackgroundColor.vue";
export default {
  components: { BackgroundColor },
  name: "setting",
  data() {
    return {};
  },
  mounted() {
    this.$router.push({ path: "Appearance/Background" });
  },
  methods: {
    hideSettingPanel() {
      this.$store.commit("hideSettingPanel");

      //记录离开时的设置路由路径
      let payload = {
        router: "setting",
        path: this.$router.currentRoute.path,
      };
      this.$store.commit("setRouterHistory", payload);

      //回到主页面后重新回到上次离开时的路由位置
      this.$router.push(this.$store.state.routerHistory.navRouter);
    },
  },
};
</script>

<style>
.setting-panel {
  position: relative;
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-top: 15px;
  position: absolute;
  transform: rotateY(90deg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
}

.setting-option-box {
  width: 200px;
  height: 100%;
  z-index: 999;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  border-radius: 20px 0 0 20px;
}

.setting-option {
  width: 160px;
  height: 30px;
  margin-top: 10px;
  display: block;
  text-align: center;
  line-height: 30px;
  font-size: var(--font-size);
  color: var(--color);
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.setting-option:first-child {
  margin-top: 40px;
}

.setting-view {
  z-index: 999;
  width: 600px;
  height: 100%;
}

.setting-close-button {
  z-index: 999;
  position: absolute;
  right: 10px;
  top: 10px;
}

.setting-close-button:hover {
  background-color: transparent;
  background-image: url("../../assets/arrow-right.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}
</style>
