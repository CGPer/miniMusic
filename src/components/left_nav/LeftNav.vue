<template>
  <div class="left-nav">
    <div class="logo-box">
      <div class="logo">
        <img src="@/assets/logo.svg" width="50px">
      </div>
      <div class="app-name">迷你音乐</div>
    </div>
    <router-link to="/Top100Page" class="discover">
      <img class="discover-icon" src="@/assets/discover.svg">
      <div class="discover-text">发现</div>
    </router-link>
    <router-link to="/SearchListPage" class="search">
      <img class="search-icon" src="@/assets/search.svg">
      <div class="search-text">搜索</div>
    </router-link>
    <router-link to="/MarkedListPage" class="marked">
      <img class="marked-icon" src="@/assets/marked.svg">
      <div class="marked-text">喜欢</div>
    </router-link>
    <router-link to="/LyricPage" class="lyric">
      <img class="lyric-icon" src="@/assets/lyric.svg">
      <div class="lyric-text">歌词</div>
    </router-link>
    <div class="playing-box">
      <img
        :src="getAlbumImgUrl"
        :style="
          haveStarted === true ? albumImgStyle : ''
        "
      />
      <div class="playing-song-name">
        {{
          currentList.length === 0
            ? ""
            : currentList[currentListIndex].songname
        }}
      </div>
      <div class="playing-singer-name">
        {{
          currentList.length == 0
            ? ""
            : currentList[currentListIndex].singer.name
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "left-nav",
  data() {
    return {
      defaultAlbumImgUrl: require("@/assets/default-album-img.jpg"),
      albumImgUrl: null,
    };
  },
  computed: {
    ...mapState({
      haveStarted: state => state.haveStarted,
      albumImgStyle: state => state.albumImgStyle,
      currentList: state => state.currentList,
      currentListIndex: state => state.currentListIndex,
    }),

    getAlbumImgUrl() {
      //刚启动和歌曲没有专辑图片时，使用默认专辑图片作为背景
      if (
        this.currentList.length === 0 ||
        this.currentList[this.currentListIndex].albumname === "   "
      ) {
        this.albumImgUrl = this.defaultAlbumImgUrl;
      } else {
        this.albumImgUrl = this.currentList[this.currentListIndex].albumimg;
      }
      return this.albumImgUrl;
    },
  },
};
</script>

<style>
.left-nav {
  width: 200px;
  height: 100%;
  float: left;
  position: relative;
  border-radius: 20px 0 0 20px;
}

.logo-box {
  width: 160px;
  height: 50px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 25px;
  background-color: rgba(255,255,255,0.2);
}

.logo {
  width: 50px;
  height: 50px;
  float: left;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.3);
}

.app-name {
  width: 110px;
  height: 50px;
  float: left;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  border-radius: 25px;
}

.discover {
  width: 160px;
  height: 30px;
  display: block;
  margin-left: 20px;
  margin-top: 120px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.2);
}

.discover:hover {
  background-color: var(--highlight-color);
}

.discover-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}

.discover-text {
  float: left;
  height: 30px;
  color: black;
  margin-left: 5px;
  line-height: 30px;
}

.search {
  width: 160px;
  height: 30px;
  display: block;
  margin-left: 20px;
  margin-top: 20px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.2);
}

.search:hover {
  background-color: var(--highlight-color);
}

.search-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}

.search-text {
  float: left;
  height: 30px;
  color: black;
  margin-left: 5px;
  line-height: 30px;
}

.marked {
  width: 160px;
  height: 30px;
  display: block;
  margin-left: 20px;
  margin-top: 20px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.2);
}

.marked:hover {
  background-color: var(--highlight-color);
}

.marked-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}

.marked-text {
  float: left;
  height: 30px;
  color: black;
  margin-left: 5px;
  line-height: 30px;
}

.lyric {
  width: 160px;
  height: 30px;
  display: block;
  margin-left: 20px;
  margin-top: 20px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.2);
}

.lyric:hover {
  background-color: var(--highlight-color);
}

.lyric-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}

.lyric-text {
  float: left;
  height: 30px;
  color: black;
  margin-left: 5px;
  line-height: 30px;
}

.router-link-active {
  background-color: var(--highlight-color);
}

.playing-box {
  width: 180px;
  height: 220px;
  margin-top: 190px;
  margin-left: 10px;
}

.playing-box > img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

@keyframes albumRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.playing-song-name {
  width: 180px;
  height: 20px;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.playing-singer-name {
  width: 180px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>