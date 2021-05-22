<template>
  <div class="lyric-page" ref="lyricPage">
    <div class="lyric-item" v-for="(item, index) in lyric" :key="index">
      <div class="lyric-text-line" :style="setPlayingLyricStyle(item, index)">
        {{ item.lyric }}
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
        color: "var(--highlight-color)",
      },
      currentLyricIndex: 0,
      scrollTop: 0,
    };
  },
  computed: {
    ...mapState(["lyric", "currentTime"]),
  },
  watch: {
    //将正在唱的歌词滚动到中间位置
    currentLyricIndex() {
      this.$refs.lyricPage.scrollTop = 0;
      if (this.currentLyricIndex > 7) {
        this.$refs.lyricPage.scrollTop = 40 * (this.currentLyricIndex - 7);
      }
    },
  },
  activated() {
    this.$refs.lyricPage.scrollTop = 40 * (this.currentLyricIndex - 7);
  },
  methods: {
    setPlayingLyricStyle(item, index) {
      //判断歌词时间并设置当前歌词样式
      if (
        this.currentTime > item.time &&
        (index === this.lyric.length - 1
          ? true
          : this.currentTime < this.lyric[index + 1].time)
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
  font-size: var(--lyric-font-size);
  font-weight: var(--lyric-font-weight);
  font-family: var(--lyric-font-family);
}
</style>
