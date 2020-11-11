<template>
  <div class="top-100-page">
    <div class="top-100-title">Top 100</div>
    <div class="top-100-item-box">
      <div
        class="top-100-item"
        v-for="(item, index) in $store.state.top100List"
        :key="index"
        :style="{
          transform: $store.state.top100ListIndex == index ? 'scale(1.1)' : '',
        }"
      >
        <img
          class="top-100-mark-img"
          @click="markSong(item)"
          :src="setMarkImgUrl(item)"
        />
        <img
          class="top-100-album-img"
          @click="playThisSong(item, index)"
          :src="item.albumimg"
          width="200px"
        />
        <div class="top-100-album-info">
          <div class="top-100-song-name">{{ item.songname }}</div>
          <div class="top-100-singer-name">{{ item.singer.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-100-page",
  data() {
    return {
      markImgUrl: require("@/assets/mark.svg"),
      markedImgUrl: require("@/assets/marked.svg"),
      scrollerPosition: 0
    };
  },
  created() {
    this.$store.commit('handleTop100List')
  },
  beforeRouteLeave(to, from, next) {
    //记下离开时滑块位置
    this.scrollerPosition = document.querySelector('.top-100-item-box').scrollTop
    next()
  },
  activated() {
    //激活后恢复滑块位置
    document.querySelector('.top-100-item-box').scrollTop = this.scrollerPosition
  },
  methods: {
    playThisSong(item, index) {
      var top100ListIndex = index;
      this.$store.commit("sendTop100PageActive");
      this.$store.commit("sendTop100ListIndex", top100ListIndex);
      this.$store.commit("playCurrentSong");
    },

    markSong(item) {
      this.$store.commit("sendMarkedSong", item);
    },

    setMarkImgUrl(item) {
      if (this.$store.state.markedList.length != 0) {
        //将已mark的歌曲逐一与Top100列表对比，如有mark中的歌曲，则红心点亮
        var haveMatchedId = false;
        for (let i = 0; i < this.$store.state.markedList.length; i++) {
          if (item.songmid === this.$store.state.markedList[i].songmid) {
            haveMatchedId = true;
          }
        }
      }
      return haveMatchedId === true ? this.markedImgUrl : this.markImgUrl;
    },
  },
};
</script>

<style>
.top-100-page {
  width: 100%;
  height: 100%;
}

.top-100-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
}

.top-100-item-box {
  width: 100%;
  height: 640px;
  overflow: hidden scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.top-100-item {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
}

.top-100-item:hover {
  transform: scale(1.1);
  z-index: 1;
}

.top-100-album-img {
  border-radius: 20px;
  box-shadow: 2px 2px 10px 3px grey;
}

.top-100-album-img:hover {
  cursor: pointer;
}

.top-100-mark-img {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 45px;
  left: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 2;
}

.top-100-mark-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.top-100-mark-img:active {
  transform: scale(1.5);
}

.top-100-album-info {
  width: 100%;
}

.top-100-song-name {
  width: 200px;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.top-100-singer-name {
  width: 200px;
  margin-top: 5px;
  font-size: 13px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>