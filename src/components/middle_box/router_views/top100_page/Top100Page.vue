<template>
  <div class="top-100-page">
    <div class="top-100-backtop" @click="backTop" v-show="isShowBackTop">
        <img src="@/assets/backtop.svg" width="30px">
    </div>
    <div class="top-100-title">Top 100</div>
    <div class="top-100-item-box" ref="top100ItemBoxDom">
      <div
        class="top-100-item"
        v-for="(item, index) in top100List"
        :key="index"
        :style="
          currentList.length === 0
            ? ''
            : currentList[currentListIndex].songmid === item.songmid
            ? playingSongStyle
            : ''
        "
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
import { mapState } from 'vuex'

export default {
  name: "top-100-page",
  data() {
    return {
      markImgUrl: require("@/assets/mark.svg"),
      markedImgUrl: require("@/assets/marked.svg"),
      scrollerPosition: 0,
      isShowBackTop: false,
      playingSongStyle: {
        "transform": "scale(1.1)",
      },
    };
  },
  computed: {
    ...mapState({
      currentList: (state) => state.currentList,
      currentListIndex: (state) => state.currentListIndex,
      top100List: state => state.top100List,
      markedList: state => state.markedList,
    }),
  },
  mounted() {
    this.$store.commit('handleTop100List')

    //当滑块滑动到一定距离再出现
    this.$refs.top100ItemBoxDom.addEventListener('scroll', () => {
      if(this.$refs.top100ItemBoxDom.scrollTop > 600) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    //记下离开时滑块位置
    this.scrollerPosition = this.$refs.top100ItemBoxDom.scrollTop
    next()
  },
  activated() {
    //激活后恢复滑块位置
    this.$refs.top100ItemBoxDom.scrollTop = this.scrollerPosition
  },
  methods: {
    playThisSong(item, index) {
      var payload = {
        index: index,
        activatedPage: 'top100Page'
      }

      this.$store.commit("sendCurrentIndex", payload)
      this.$store.commit("playCurrentSong");
    },

    markSong(item) {
      this.$store.commit("sendMarkedSong", item);
    },

    setMarkImgUrl(item) {
      if (this.markedList.length !== 0) {
        //将已mark的歌曲逐一与Top100列表对比，如有mark中的歌曲，则红心点亮
        var haveMatchedId = false;
        for (let i = 0; i < this.markedList.length; i++) {
          if (item.songmid === this.markedList[i].songmid) {
            haveMatchedId = true;
          }
        }
      }
      return haveMatchedId === true ? this.markedImgUrl : this.markImgUrl;
    },

    backTop() {
      this.$refs.top100ItemBoxDom.scrollTop = 0
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

.top-100-backtop {
  width: 30px;
  height: 30px;
  margin-left: 715px;
  margin-top: 640px;
  position: fixed;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 3;
}

.top-100-backtop:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.top-100-backtop:active {
  transform: scale(1.2);
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