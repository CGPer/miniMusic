<template>
  <div class="setting-background">
    <div class="background-radio-box">
      <label
        class="background-option"
        v-for="(item, index) in backgroundList"
        :key="item.text + index"
      >
        <input type="radio" name="backgorund" :value="item" v-model="picked" />
        <div class="option-text">{{ item.text }}</div>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "setting-background",
  computed: {
    ...mapState(["setting"]),
  },
  data() {
    return {
      backgroundList: [
        {
          text: "变色龙",
          value: "chameleon-theme",
        },
        {
          text: "牛奶白",
          value: "milk-white-theme",
        },
        {
          text: "高亮黑",
          value: "dark-highlight-theme",
        },
        {
          text: "清新绿",
          value: "simple-green-theme",
        },
        {
          text: "炫丽彩",
          value: "colorful-theme",
        },
      ],
      picked: {
        text: "变色龙",
        value: "chameleon-theme",
      },
      count: 0,
    };
  },
  mounted() {
    this.picked = this.setting.appearance.background;
  },
  watch: {
    picked: function (newBackground) {
      //第一次进入不要改变setCanShowThemeAnimation
      if (this.count === 1) {
        console.log(this.count);
        this.$store.commit("setCanShowThemeAnimation", true);
      }
      this.count += 1;

      //暗主题需要改变文字、进度条等颜色
      if (newBackground.value === "dark-highlight-theme") {
        document.body.style.setProperty("--font-color", "#eee");
        document.body.style.setProperty("--progress-bar-color", "rgba(255,255,255,0.1)");
      } else {
        document.body.style.setProperty("--font-color", "black");
        document.body.style.setProperty("--progress-bar-color", "rgba(0,0,0,0.1)");
      }

      //根据不同主题改变背景颜色
      switch (newBackground.value) {
        case "chameleon-theme":
          document.body.style.setProperty("--background-color", "white");
          break;

        case "milk-white-theme":
          document.body.style.setProperty("--background-color", "#fdfdfd");
          break;

        case "dark-highlight-theme":
          document.body.style.setProperty("--background-color", "#171717");
          break;

        case "simple-green-theme":
          document.body.style.setProperty("--background-color", "#dffff5");
          break;

        case "colorful-theme":
          document.body.style.setProperty("--background-color", "white");
          break;
      }

      this.$store.commit("setBackground", newBackground);
    },
  },
};
</script>

<style>
.setting-background {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-radio-box {
  width: 500px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 40px;
}

.background-option input {
  display: none;
}

.background-option input:checked + .option-text {
  background-color: var(--highlight-color);
}

.background-option input:checked + .option-text::before {
  box-shadow: 0 0 0 5px var(--highlight-color) inset;
}

.option-text {
  position: relative;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  transition: all 0.3s;
}

.option-text::before {
  content: "";
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--highlight-color) inset;
}
</style>
