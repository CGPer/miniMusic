<template>
  <div class="lyric-page" ref="lyricPage">
    <div class="lyric-item" v-for="(item, index) in lyricTextArr" :key="index">
      <div class="lyric-text-line" :style="setplayingLyricStyle(item, index)">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "lyric-page",
  data() {
    return {
      playingLyricStytle: {
        transform: "scale(1.5)",
        color: "var(--highlight-deep-color)",
      },
      currentLyricIndex: 0,
      scrollTop: 0,
    };
  },
  computed: {
    ...mapState({
      lyricTextArr: (state) => state.lyricTextArr,
      currentTime: (state) => state.currentTime,
    }),
  },
  watch: {
    //将正在唱的歌词滚动到中间位置
    currentLyricIndex: function () {
      this.$refs.lyricPage.scrollTop = 0;
      if (this.currentLyricIndex > 7) {
        this.$refs.lyricPage.scrollTop = 40 * (this.currentLyricIndex - 7);
      }
    },
  },
  methods: {
    setplayingLyricStyle(item, index) {
      //判断歌词时间并设置当前歌词样式
      if (
        this.currentTime > item.time &&
        (index === this.lyricTextArr.length - 1
          ? true
          : this.currentTime < this.lyricTextArr[index + 1].time)
      ) {
        this.currentLyricIndex = index;
        return this.playingLyricStytle;
      }
    },
  },
};
</script>

<style>
.lyric-page {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.lyric-text-line {
  margin-top: 10px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>