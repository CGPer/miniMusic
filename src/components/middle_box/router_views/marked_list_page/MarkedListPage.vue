<template>
  <div class="marked-list-page">
    <div class="marked-list-title">
      <div></div>
      <div>歌名</div>
      <div>歌手</div>
      <div>专辑</div>
    </div>
    <div class="marked-list-box">
      <div
        class="marked-list-item"
        v-for="(item, index) in this.$store.state.markedList"
        :key="index"
        
        :style="{
          'background-color':
            $store.state.markedListIndex == index
              ? 'var(--highlight-color)'
              : '',
          'border-radius': $store.state.markedListIndex == index ? '10px' : '0',
        }"
      >
        <div class="mark-img">
          <img :src="markedImgUrl" @click="markSong(item, index)" width="18px" />
        </div>
        <div class="marked-list-song-name" @click="playThisSong(item, index)">{{ item.songname }}</div>
        <div class="marked-list-singer-name" @click="playThisSong(item, index)">{{ item.singer.name }}</div>
        <div class="marked-list-album-name" @click="playThisSong(item, index)">{{ item.albumname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "marked-list-page",
  data() {
    return {
      markedImgUrl: require("@/assets/marked.svg"),
      scrollerPosition: 0
    }
  },
  beforeRouteLeave(to, from, next) {
    //记下离开时滑块位置
    this.scrollerPosition = document.querySelector('.marked-list-box').scrollTop
    next()
  },
  activated() {
    //激活后恢复滑块位置
    document.querySelector('.marked-list-box').scrollTop = this.scrollerPosition
  },
  methods: {
    playThisSong(item, index) {
      var markedListIndex = index;
      this.$store.commit("sendMarkedPageActive");
      this.$store.commit("sendMarkedListIndex", markedListIndex);
      this.$store.commit("playCurrentSong");
    },

    markSong(item, index) {
      this.$store.commit('sendMarkedSong', item)
    },
  },
};
</script>

<style>
.marked-list-page {
  width: 100%;
  height: 100%;
}

.marked-list-title {
  width: 750px;
  height: 20px;
  line-height: 20px;
  display: flex;
  font-weight: bold;
}

.marked-list-title div:nth-child(1) {
  width: 4%;
}

.marked-list-title div:nth-child(2) {
  width: 40%;
}

.marked-list-title div:nth-child(3) {
  width: 16%;
}

.marked-list-title div:nth-child(4) {
  width: 40%;
}

.marked-list-box {
  width: 100%;
  height: 660px;
  overflow-x: hidden;
}

.marked-list-item {
  height: 40px;
  line-height: 40px;
  display: flex;
}

.mark-img {
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.mark-img:active {
  transform: scale(1.5);
}

.marked-list-song-name {
  width: 40%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.marked-list-singer-name {
  width: 16%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.marked-list-album-name {
  width: 40%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>