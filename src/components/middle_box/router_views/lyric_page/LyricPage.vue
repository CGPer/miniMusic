<template>
  <div class="lyric-page" ref="lyricPage">
    <div
      class="lyric-item"
      v-for="(item, index) in $store.state.lyricTextArr"
      :key="index"
    >
      <div class="lyric-text-line" :style="setplayingLyricStyle(item, index)">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lyric-page",
  data() {
    return {
      playingLyricStytle: {
        transform: "scale(1.5)",
        color: "var(--highlight-deep-color)",
      },
      currentLyricIndex: 0,
      scrollTop: 0
    };
  },
  watch: {
    currentLyricIndex: function() {
      this.$refs.lyricPage.scrollTop = 0
      if(this.currentLyricIndex > 6) {
        this.$refs.lyricPage.scrollTop = 40 * (this.currentLyricIndex - 6)
      }
    }
  },
  methods: {
    setplayingLyricStyle(item, index) {
      if (
        this.$store.state.currentTime > item.time &&
        (index === this.$store.state.lyricTextArr.length - 1
          ? true
          : this.$store.state.currentTime <
            this.$store.state.lyricTextArr[index + 1].time)
      ) {
        this.currentLyricIndex = index
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