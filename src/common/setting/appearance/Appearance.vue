<template>
  <div class="setting-appearance">
    <div class="sub-setting-option">
      <router-link to="/Appearance/Background" class="setting-option">背景</router-link>
      <router-link to="/Appearance/HighlightColor" class="setting-option">高亮色</router-link>
      <router-link to="/Appearance/Font" class="setting-option">字体</router-link>
    </div>
    <keep-alive>
      <router-view name="appearanceSettingView" class="sub-setting-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "setting-appearance",
};
</script>

<style>
.setting-appearance {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.sub-setting-option {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-setting-view {
  width: 100%;
  height: 100%;
}

.router-link-active {
  background-color: var(--highlight-color);
}
</style>