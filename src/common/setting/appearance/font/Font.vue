<template>
  <div class="setting-font">
    <div class="font-family">
      <div class="font-family-text">界面字体</div>
      <div class="font-family-drop-down-box-wrap">
        <div class="font-family-drop-down-box" @click="showFontFamilyOption()">
          <div class="font-family-using">
            {{ fontFamily }}
          </div>
          <img src="@/assets/arrow-down.svg" />
          <div
            class="font-family-option-box"
            id="font-family-option-box"
            tabindex="0"
            v-show="isShowFontFamilyOption"
            @blur="hideFontFamilyOption()"
          >
            <div
              class="font-family-option"
              v-for="(item, index) in fontFamilyList"
              :key="item + index"
              @click.stop="changeFontFamily(item)"
              :style="{ fontFamily: item }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="font-family">
      <div class="font-family-text">歌词字体</div>
      <div class="font-family-drop-down-box-wrap">
        <div class="font-family-drop-down-box" @click="showLyricFontOption()">
          <div class="font-family-using" :style="{ fontFamily: lyricFontFamily }">
            {{ lyricFontFamily }}
          </div>
          <img src="@/assets/arrow-down.svg" />
          <div
            class="font-family-option-box"
            id="lyric-font-family-option-box"
            tabindex="0"
            v-show="isShowLyricFontOption"
            @blur="hideLyricFontOption()"
          >
            <div
              class="font-family-option"
              v-for="(item, index) in lyricFontFamilyList"
              :key="item + index"
              @click.stop="changeLyricFontFamily(item)"
              :style="{ fontFamily: item }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下面的字体粗细就直接copy上面的class了 -->
    <div class="font-family">
      <div class="font-family-text">界面字体粗细</div>
      <div class="font-family-drop-down-box-wrap">
        <div class="font-family-drop-down-box" @click="showFontWeightOption">
          <div class="font-family-using">
            {{ fontWeight.text }}
          </div>
          <img src="@/assets/arrow-down.svg" />
          <div
            class="font-family-option-box"
            id="font-weight-option-box"
            tabindex="0"
            v-show="isShowFontWeightOption"
            @blur="hideFontWeightOption"
          >
            <div
              class="font-family-option"
              v-for="(item, index) in fontWeightList"
              :key="item.text + index"
              @click.stop="changeFontWeight(item)"
              :style="{ fontWeight: item.value }"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="font-family">
      <div class="font-family-text">歌词字体粗细</div>
      <div class="font-family-drop-down-box-wrap">
        <div class="font-family-drop-down-box" @click="showLyricFontWeightOption">
          <div class="font-family-using">
            {{ lyricFontWeight.text }}
          </div>
          <img src="@/assets/arrow-down.svg" />
          <div
            class="font-family-option-box"
            id="lyric-font-weight-option-box"
            tabindex="0"
            v-show="isShowLyricFontWeightOption"
            @blur="hideLyricFontWeightOption"
          >
            <div
              class="font-family-option"
              v-for="(item, index) in lyricFontWeightList"
              :key="item.text + index"
              @click.stop="changeLyricFontWeight(item)"
              :style="{ fontWeight: item.value }"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="font-size">
      <div class="font-size-name">界面字体大小</div>
      <div class="font-small">小</div>
      <div class="font-slider">
        <div class="font-slider-bar"></div>
        <div
          class="font-size-option-box"
          id="font-size-option-box"
          @mousemove="fontSizeThumbMove"
        >
          <div
            class="font-size-thumb"
            @mousedown="fontSizeThumbStartMove"
            :style="{ left: fontSizeThumbMoveLength + 'px' }"
          ></div>
          <div
            class="font-size-option"
            v-for="(item, index) in fontSizeList"
            :key="item + index"
          >
            <div
              class="font-size-dot"
              :style="{ transform: fontSize === item ? 'scale(1.4)' : '' }"
            ></div>
            <div class="font-size-label">{{ index % 2 === 1 ? "" : item }}</div>
          </div>
        </div>
      </div>
      <div class="font-large">大</div>
    </div>
    <div class="font-size">
      <div class="font-size-name">歌词字体大小</div>
      <div class="font-small lyric-font-size-text">小</div>
      <div class="font-slider">
        <div class="font-slider-bar"></div>
        <div
          class="font-size-option-box"
          id="lyric-font-size-option-box"
          @mousemove="lyricFontSizeThumbMove"
        >
          <div
            class="font-size-thumb"
            @mousedown="fontSizeThumbStartMove"
            :style="{ left: lyricFontSizeThumbMoveLength + 'px' }"
          ></div>
          <div
            class="font-size-option"
            v-for="(item, index) in lyricFontSizeList"
            :key="item + index"
          >
            <div
              class="font-size-dot"
              :style="{ transform: lyricFontSize === item ? 'scale(1.4)' : '' }"
            ></div>
            <div class="font-size-label">{{ index % 2 === 1 ? "" : item }}</div>
          </div>
        </div>
      </div>
      <div class="font-large lyric-font-size-text">大</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "setting-font",
  data() {
    return {
      isShowFontFamilyOption: false,
      isShowLyricFontOption: false,
      isShowFontWeightOption: false,
      isShowLyricFontWeightOption: false,
      fontFamily: "系统默认",
      lyricFontFamily: "跟随界面字体",
      fontWeight: { text: "常规", value: "normal" },
      lyricFontWeight: { text: "常规", value: "normal" },
      fontFamilyList: [
        "系统默认",
        "阿朱泡泡体",
        "点点像素体",
        "方正楷体简体",
        "方正楷体繁体",
        "寒蝉手拙体",
        "汉字拼音体",
        "品如手写体",
        "清松手写体",
        "新叶念体",
        "杨任东竹石体",
        "站酷快乐体",
        "OPPO Sans",
      ],
      lyricFontFamilyList: [
        "跟随界面字体",
        "阿朱泡泡体",
        "点点像素体",
        "方正楷体简体",
        "方正楷体繁体",
        "寒蝉手拙体",
        "汉字拼音体",
        "品如手写体",
        "清松手写体",
        "新叶念体",
        "杨任东竹石体",
        "站酷快乐体",
        "OPPO Sans",
      ],
      fontSizeList: [
        "10px",
        "11px",
        "12px",
        "13px",
        "14px",
        "15px",
        "16px",
        "17px",
        "18px",
        "19px",
        "20px",
      ],
      lyricFontSizeList: [
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "22px",
        "24px",
        "26px",
        "28px",
        "30px",
      ],
      fontWeightList: [
        { text: "细", value: "lighter" },
        { text: "常规", value: "normal" },
        { text: "粗", value: "bold" },
      ],
      lyricFontWeightList: [
        { text: "常规", value: "normal" },
        { text: "粗", value: "bold" },
      ],
      fontSize: "16px",
      lyricFontSize: "20px",
      isFontSizeThumbMoveable: false,
      isLyricFontSizeThumbMoveable: false,
    };
  },
  computed: {
    ...mapState(["setting"]),

    //字体大小调节指针移动的距离由字体大小计算得出
    fontSizeThumbMoveLength: function () {
      let fonSizeNum = Number(this.fontSize.match(/\d+/));
      return (fonSizeNum - 10) * (500 / 11) + 500 / 22;
    },

    lyricFontSizeThumbMoveLength: function () {
      let fonSizeNum = Number(this.lyricFontSize.match(/\d+/));
      return ((fonSizeNum - 10) / 2) * (500 / 11) + 500 / 22;
    },
  },
  mounted() {
    document.addEventListener("mouseup", this.mouseup);

    //获取历史数据
    this.fontFamily = this.setting.appearance.font.fontFamily;
    this.lyricFontFamily = this.setting.appearance.font.lyricFontFamily;
    this.fontWeight = this.setting.appearance.font.fontWeight;
    this.lyricFontWeight = this.setting.appearance.font.lyricFontWeight;
    this.fontSize = this.setting.appearance.font.fontSize;
    this.lyricFontSize = this.setting.appearance.font.lyricFontSize;
  },
  methods: {
    showFontFamilyOption() {
      this.isShowFontFamilyOption = true;
      setTimeout(() => {
        document.querySelector("#font-family-option-box").focus();
      });
    },

    showLyricFontOption() {
      this.isShowLyricFontOption = true;
      setTimeout(() => {
        document.querySelector("#lyric-font-family-option-box").focus();
      });
    },

    showFontWeightOption() {
      this.isShowFontWeightOption = true;
      setTimeout(() => {
        document.querySelector("#font-weight-option-box").focus();
      });
    },

    showLyricFontWeightOption() {
      this.isShowLyricFontWeightOption = true;
      setTimeout(() => {
        document.querySelector("#lyric-font-weight-option-box").focus();
      });
    },

    hideFontFamilyOption() {
      this.isShowFontFamilyOption = false;
    },

    hideLyricFontOption() {
      this.isShowLyricFontOption = false;
    },

    hideFontWeightOption() {
      this.isShowFontWeightOption = false;
    },

    hideLyricFontWeightOption() {
      this.isShowLyricFontWeightOption = false;
    },

    changeFontFamily(fontFamily) {
      this.fontFamily = fontFamily;

      document.body.style.setProperty("--font-family", fontFamily);

      if (this.lyricFontFamily === "跟随界面字体") {
        document.body.style.setProperty("--lyric-font-family", fontFamily);
      }

      this.$store.commit("setFontFamily", fontFamily);
    },

    changeLyricFontFamily(lyricFontFamily) {
      if (lyricFontFamily === "跟随界面字体") {
        document.body.style.setProperty("--lyric-font-family", this.fontFamily);
      } else {
        document.body.style.setProperty("--lyric-font-family", lyricFontFamily);
      }
      this.lyricFontFamily = lyricFontFamily;
      this.isShowLyricFontOption = false;

      this.$store.commit("setLyricFontFamily", lyricFontFamily);
    },

    changeFontWeight(fontWeight) {
      if (fontWeight.text === "细") {
        document.body.style.setProperty("--font-weight", fontWeight.value);
      }
      if (fontWeight.text === "常规") {
        document.body.style.setProperty("--font-weight", fontWeight.value);
      }
      if (fontWeight.text === "粗") {
        document.body.style.setProperty("--font-weight", fontWeight.value);
      }
      this.fontWeight = fontWeight;
      this.isShowFontWeightOption = false;

      this.$store.commit("setFontWeight", fontWeight);
    },

    changeLyricFontWeight(lyricFontWeight) {
      if (lyricFontWeight.text === "常规") {
        document.body.style.setProperty("--lyric-font-weight", lyricFontWeight.value);
      }
      if (lyricFontWeight.text === "粗") {
        document.body.style.setProperty("--lyric-font-weight", lyricFontWeight.value);
      }
      this.lyricFontWeight = lyricFontWeight;
      this.isShowLyricFontWeightOption = false;

      this.$store.commit("setLyricFontWeight", lyricFontWeight);
    },

    fontSizeThumbStartMove(e) {
      this.isFontSizeThumbMoveable = true;
      this.isLyricFontSizeThumbMoveable = true;
    },

    fontSizeThumbMove(e) {
      if (this.isFontSizeThumbMoveable === true) {
        let fontSizeOptionBoxDom = document.querySelector("#font-size-option-box");
        let fontSizeOptionBoxPosition = fontSizeOptionBoxDom.getBoundingClientRect().left;
        let moveLength = e.pageX - fontSizeOptionBoxPosition;
        let leftLimit = 500 / 22;
        let rightLimit = 500 - 500 / 22;
        if (moveLength < leftLimit) {
          moveLength = leftLimit;
        }
        if (moveLength > rightLimit) {
          moveLength = rightLimit;
        }
        let num = Math.round((moveLength - 500 / 22) / (500 / 11));
        this.fontSize = num + 10 + "px";
        document.body.style.setProperty("--font-size", this.fontSize);
      }
    },

    lyricFontSizeThumbMove(e) {
      if (this.isLyricFontSizeThumbMoveable === true) {
        let fontSizeOptionBoxDom = document.querySelector("#lyric-font-size-option-box");
        let fontSizeOptionBoxPosition = fontSizeOptionBoxDom.getBoundingClientRect().left;
        let moveLength = e.pageX - fontSizeOptionBoxPosition;
        let leftLimit = 500 / 22;
        let rightLimit = 500 - 500 / 22;
        if (moveLength < leftLimit) {
          moveLength = leftLimit;
        }
        if (moveLength > rightLimit) {
          moveLength = rightLimit;
        }
        let num = Math.round((moveLength - 500 / 22) / (500 / 11));
        this.lyricFontSize = num * 2 + 10 + "px";
        document.body.style.setProperty("--lyric-font-size", this.lyricFontSize);
      }
    },

    mouseup() {
      this.isFontSizeThumbMoveable = false;
      this.isLyricFontSizeThumbMoveable = false;

      this.$store.commit("setFontSize", this.fontSize);
      this.$store.commit("setLyricFontSize", this.lyricFontSize);
    },
  },
};
</script>

<style>
.setting-font {
  width: 100%;
  height: 100%;
}

.font-family {
  width: 560px;
  height: 50px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.font-family:nth-child(2) {
  margin-top: 20px;
}

.font-family-text {
  height: 30px;
  padding: 2px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-family-drop-down-box-wrap {
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-family-drop-down-box {
  position: relative;
  height: 30px;
  padding: 0px 5px;
  display: flex;
  align-items: center;
  border: 1px var(--highlight-color) solid;
  border-radius: 8px;
}

.font-family-using {
  padding: 0px 2px;
}

.font-family-using + img {
  width: 16px;
  height: 16px;
  padding: 0px 4px;
}

.font-family-option-box {
  position: absolute;
  left: 50%;
  top: 34px;
  transform: translateX(-50%);
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  border-radius: 10px;
  backdrop-filter: blur(50px);
  box-sizing: border-box;
  border: 1px solid var(--highlight-color);
  box-shadow: 0 0 15px var(--highlight-color);
}

.font-family-option-box:focus {
  outline: none;
}

.font-family-option {
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 8px;
}

.font-family-option:hover {
  cursor: pointer;
  transform: scale(1.05);
  background-color: var(--highlight-color);
}

.font-size {
  position: relative;
  width: 560px;
  height: 100px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 2px var(--highlight-color) solid;
}

.font-size-name {
  position: absolute;
  padding: 4px 4px;
  top: 0;
  left: 20px;
  transform: translateY(-50%);
  background-color: var(--highlight-color);
  border-radius: 8px;
}

.font-small {
  width: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-large {
  width: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lyric-font-size-text {
  font-family: var(--lyric-font-family);
  font-size: var(--lyric-font-size);
}

.font-slider {
  width: 500px;
  position: relative;
}

.font-slider-bar {
  width: calc(500px - 500px / 11);
  height: 2px;
  margin-left: calc(500px / 22);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--progress-bar-color);
}

.font-size-option-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.font-size-thumb {
  position: absolute;
  width: 14px;
  height: 14px;
  left: calc(100% / 22);
  top: calc(50% - 5px);
  transform: translateX(-50%) translateY(-200%);
  background-color: var(--highlight-color);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.font-size-thumb:hover {
  cursor: pointer;
}

.font-size-thumb::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: 100%;
  border-top: 7px var(--highlight-color) solid;
  border-bottom: 0px var(--highlight-color) solid;
  border-left: 7px transparent solid;
  border-right: 7px transparent solid;
}

.font-size-option {
  width: calc(500px / 11);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
}

.font-size-dot {
  margin-top: 45px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 100;
  background-color: var(--highlight-color);
}

.font-size-label {
  padding: 3px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
