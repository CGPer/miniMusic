<template>
  <div class="search-list-page">
    <div class="search-list-title">
      <div></div>
      <div>歌名</div>
      <div>歌手</div>
      <div>专辑</div>
    </div>
    <div class="search-list-box">
      <div
        class="search-list-item"
        v-for="(item, index) in this.$store.state.searchList"
        :key="index"
        
        :style="{
          'background-color':
            $store.state.searchListIndex == index
              ? 'var(--highlight-color)'
              : '',
          'border-radius': $store.state.searchListIndex == index ? '10px' : '0',
        }"
      >
        <div class="mark-img">
          <img :src="setMarkImgUrl(item)" @click="markSong(item, index)" width="18px" />
        </div>
        <div class="search-list-song-name" @click="playThisSong(item, index)">{{ item.songname }}</div>
        <div class="search-list-singer-name" @click="playThisSong(item, index)">{{ item.singer.name }}</div>
        <div class="search-list-album-name" @click="playThisSong(item, index)">{{ item.albumname }}</div>
      </div>
      <div class="load-more" @click="loadMore" v-show="$store.state.haveSearched">{{$store.state.loadMoreText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-list-page",
  data() {
    return {
      markImgUrl: require("@/assets/mark.svg"),
      markedImgUrl: require("@/assets/marked.svg"),
      scrollerPosition: 0
    }
  },
  beforeRouteLeave(to, from, next) {
    //记下离开时滑块位置
    this.scrollerPosition = document.querySelector('.search-list-box').scrollTop
    next()
  },
  activated() {
    //激活后恢复滑块位置
    document.querySelector('.search-list-box').scrollTop = this.scrollerPosition
  },
  methods: {
    playThisSong(item, index) {
      var searchListIndex = index;
      this.$store.commit("sendSearchPageActive");
      this.$store.commit("sendSearchListIndex", searchListIndex);
      this.$store.commit("playCurrentSong");
    },

    markSong(item, index) {
      this.$store.commit('sendMarkedSong', item)
    },

    setMarkImgUrl(item) {
      //将已mark的歌曲逐一与搜索列表对比，如有mark中的歌曲，则红心点亮
      var haveMatchedId = false
      for(let i=0; i<this.$store.state.markedList.length; i++) {
        if(item.songmid === this.$store.state.markedList[i].songmid) {
          haveMatchedId = true
        }
      }
      return haveMatchedId === true ? this.markedImgUrl : this.markImgUrl
    },

    loadMore() {
      this.$store.commit('handleLoadMore')
    }
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
  background-color: rgba(255,255,255,0.2);
}

.load-more:hover {
  cursor: pointer;
}
</style>