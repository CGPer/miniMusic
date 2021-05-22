<template>
  <div class="setting-hightlight-color">
    <div class="hightlight-color-radio-box">
      <label
        class="hightlight-color-option"
        v-for="(item, index) in highlightColorList"
        :key="item.text + index"
      >
        <div
          class="hightlight-color-dot"
          :style="{
            backgroundColor: item.value,
            transform: item.value == picked.value ? 'scale(1.3)' : '',
          }"
        ></div>
        <input type="radio" name="hightlight-color" :value="item" v-model="picked" />
        <div class="hightlight-color-option-text">{{ item.text }}</div>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "setting-hightlight-color",
  computed: {
    ...mapState(["setting"]),
  },
  data() {
    return {
      highlightColorList: [
        {
          text: "罗兰紫",
          value: "#c5b5f0",
        },
        {
          text: "活力橙",
          value: "#ff5d00",
        },
        {
          text: "柠檬黄",
          value: "#f8cb00",
        },
        {
          text: "青葱绿",
          value: "#99f158",
        },
        {
          text: "妖艳红",
          value: "#f74f9e",
        },
        {
          text: "天空蓝",
          value: "skyblue",
        },
      ],
      picked: {
        text: "罗兰紫",
        value: "#c5b5f0",
      },
    };
  },
  mounted() {
    this.picked = this.setting.appearance.highlightColor;
  },
  watch: {
    picked(newPicked) {
      document.body.style.setProperty("--highlight-color", newPicked.value);
      this.$store.commit("setHighlightColor", newPicked);
    },
  },
};
</script>

<style>
.setting-hightlight-color {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hightlight-color-radio-box {
  width: 500px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 40px;
}

.hightlight-color-option {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.hightlight-color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.hightlight-color-option input {
  display: none;
}

.hightlight-color-option input:checked + .hightlight-color-option-text {
  background-color: var(--highlight-color);
}

.hightlight-color-option-text {
  position: relative;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
