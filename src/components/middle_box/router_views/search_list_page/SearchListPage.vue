<template>
  <div class="search-list-page">
    <div class="search-list-title">
      <div></div>
      <div>歌名</div>
      <div>歌手</div>
      <div>专辑</div>
    </div>
    <div class="search-list-box" ref="searchListBoxDom">
      <div class="search-list-backtop" @click="backTop" v-show="isShowBackTop">
        <img src="@/assets/backtop.svg" width="30px" />
      </div>
      <div
        class="search-list-item"
        v-for="(item, index) in searchList"
        :key="index"
        :style="
          currentList.length === 0
            ? ''
            : currentList[currentListIndex].songmid === item.songmid
            ? playingSongStyle
            : ''
        "
      >
        <div class="mark-img">
          <img
            :src="setMarkImgUrl(item)"
            @click="markSong(item, index)"
            width="18px"
          />
        </div>
        <div class="search-list-song-name" @click="playThisSong(item, index)">
          {{ item.songname }}
        </div>
        <div class="search-list-singer-name" @click="playThisSong(item, index)">
          {{ item.singer.name }}
        </div>
        <div class="search-list-album-name" @click="playThisSong(item, index)">
          {{ item.albumname }}
        </div>
      </div>
      <div class="load-more" @click="loadMore" v-show="haveSearched">
        {{ loadMoreText }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "search-list-page",
  data() {
    return {
      markImgUrl: require("@/assets/mark.svg"),
      markedImgUrl: require("@/assets/marked.svg"),
      scrollerPosition: 0,
      isShowBackTop: false,
      playingSongStyle: {
        "background-color": "var(--highlight-color)",
        "border-radius": "10px",
      },
    };
  },
  computed: {
    ...mapState({
      currentList: (state) => state.currentList,
      currentListIndex: (state) => state.currentListIndex,
      searchList: (state) => state.searchList,
      markedList: (state) => state.markedList,
      haveSearched: (state) => state.haveSearched,
      loadMoreText: (state) => state.loadMoreText,
    }),
  },
  mounted() {
    //添加监听scrollToTop事件，使新的搜索发生后立即回到顶端
    this.$EventBus.$on("scrollToTop", () => {
      this.$refs.searchListBoxDom.scrollTop = 0;
    });

    //当滑块滑动到一定距离再出现
    this.$refs.searchListBoxDom.addEventListener("scroll", (e) => {
      if (this.$refs.searchListBoxDom.scrollTop > 600) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    //记下离开时滑块位置
    this.scrollerPosition = this.$refs.searchListBoxDom.scrollTop;
    next();
  },
  activated() {
    //激活后恢复滑块位置
    this.$refs.searchListBoxDom.scrollTop = this.scrollerPosition;
  },
  methods: {
    playThisSong(item, index) {
      var payload = {
        index: index,
        activatedPage: 'searchListPage'
      }

      this.$store.commit("sendCurrentIndex", payload)
      this.$store.commit("playCurrentSong");
    },

    markSong(item, index) {
      this.$store.commit("sendMarkedSong", item);
    },

    setMarkImgUrl(item) {
      //将已mark的歌曲逐一与搜索列表对比，如有mark中的歌曲，则红心点亮
      var haveMatchedId = false;
      for (let i = 0; i < this.markedList.length; i++) {
        if (item.songmid === this.markedList[i].songmid) {
          haveMatchedId = true;
        }
      }
      return haveMatchedId === true ? this.markedImgUrl : this.markImgUrl;
    },

    backTop() {
      this.$refs.searchListBoxDom.scrollTop = 0;
    },

    loadMore() {
      this.$store.commit("handleLoadMore");
    },
  },
};
</script>

<style>
.search-list-page {
  width: 100%;
  height: 100%;
}

.search-list-title {
  width: 750px;
  height: 20px;
  line-height: 20px;
  display: flex;
  font-weight: bold;
}

.search-list-title div:nth-child(1) {
  width: 4%;
}

.search-list-title div:nth-child(2) {
  width: 40%;
}

.search-list-title div:nth-child(3) {
  width: 16%;
}

.search-list-title div:nth-child(4) {
  width: 40%;
}

.search-list-box {
  width: 100%;
  height: 660px;
  overflow-x: hidden;
}

.search-list-backtop {
  width: 30px;
  height: 30px;
  margin-left: 710px;
  margin-top: 580px;
  position: fixed;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.search-list-backtop:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.search-list-backtop:active {
  transform: scale(1.2);
}

.search-list-item {
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

.search-list-song-name {
  width: 40%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.search-list-singer-name {
  width: 16%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.search-list-album-name {
  width: 40%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.load-more {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.load-more:hover {
  cursor: pointer;
}
</style>
