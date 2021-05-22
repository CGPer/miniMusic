<template>
  <div class="singer-page">
    <div class="singer-header">
      <div class="singer-img">
        <img :src="singerInfo.singerPic" />
      </div>
      <div class="singer-introduction">
        <div class="singer-page-singer-name">{{ singerInfo.singerName }}</div>
        <div class="singer-description">{{ singerInfo.singerDescription }}</div>
      </div>
    </div>
    <div class="singer-tab-box">
      <div
        class="singer-tab"
        @click="getSong"
        :class="{ active: activatedTab === '单曲' }"
      >
        单曲
      </div>
      <div
        class="singer-tab"
        @click="getAlbumList"
        :class="{ active: activatedTab === '专辑' }"
      >
        专辑
      </div>
      <div class="singer-tab" @click="getMV" :class="{ active: activatedTab === 'MV' }">
        MV
      </div>
    </div>
    <div class="singer-list-box">
      <div class="singer-list-item" v-show="isShowSingerSong">
        <loading :isLoading="isSongLoading"></loading>
        <song-list
          :list="songList"
          :isShowLoadMore="true"
          @loadMore="loadMoreSong"
          :loadMoreText="songLoadMoreText"
          :isKeepScrollPositon="false"
        ></song-list>
      </div>
      <div class="singer-list-item" v-show="isShowSingerAlbum">
        <loading :isLoading="isAlbumLoading"></loading>
        <grid-list
          :list="albumList"
          :loadMoreText="albumLoadMoreText"
          @loadMore="loadMoreAlbum"
          @clickItem="getAlbumInfo"
        ></grid-list>
      </div>
      <div class="singer-list-item" v-show="isShowSingerMV">
        <loading :isLoading="isMvLoading"></loading>
        <div class="singer-mv-box">
          <div
            class="singer-mv-item"
            v-for="item in MVList"
            @click="getMVInfo(item)"
            :key="item.mvId"
          >
            <img :src="item.piv" />
            <div class="singer-mv-name">{{ item.mvName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "@/common/SongList.vue";
import GridList from "@/common/GridList.vue";
import Loading from "@/common/Loading.vue";

import {
  getSingerMusicList,
  getSingerAlbumList,
  getAlbum,
  getSingerMvList,
  getMvInfo,
  getMUrl,
} from "@/network/spider";
import standardizeAPI from "@/network/standardizeAPI.js";

export default {
  name: "singer-page",
  data() {
    return {
      isShowSingerSong: true,
      isShowSingerAlbum: false,
      isShowSingerMV: false,
      songList: [],
      songListPage: 0,
      songLoadMoreText: "加载更多",
      albumList: [],
      albumListPage: 0,
      albumLoadMoreText: "加载更多",
      MVList: [],
      MVListPage: 0,
      MVLoadMoreText: "加载更多",
      activatedTab: "单曲",
      isSongLoading: false,
      isAlbumLoading: false,
      isMvLoading: false,
    };
  },
  components: {
    SongList,
    GridList,
    Loading,
  },
  computed: {
    ...mapState(["singerInfo"]),
  },
  watch: {
    singerInfo() {
      this.getSong();
    },
  },
  mounted() {
    //一进入就展示歌手的单曲
    this.getSong();
  },
  methods: {
    //请求歌手的单曲
    async getSong() {
      this.activatedTab = "单曲";
      this.isShowSingerAlbum = false;
      this.isShowSingerMV = false;
      this.isShowSingerSong = true;
      this.songListPage = 0;
      this.songLoadMoreText = "加载更多";
      this.isSongLoading = true;

      let songListData;
      try {
        songListData = await getSingerMusicList({
          page: 0,
          singerMid: this.singerInfo.singerMid,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isSongLoading = false;
      }
      console.log("songListData", songListData);

      this.isSongLoading = false;

      this.songList = standardizeAPI(songListData.list);
    },

    async getAlbumList() {
      this.activatedTab = "专辑";
      this.isShowSingerSong = false;
      this.isShowSingerMV = false;
      this.isShowSingerAlbum = true;
      this.albumListPage = 0;
      this.albumLoadMoreText = "加载更多";
      this.isAlbumLoading = true;

      let albumListData;
      try {
        albumListData = await getSingerAlbumList({
          page: 0,
          singerMid: this.singerInfo.singerMid,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isAlbumLoading = false;
      }
      console.log("albumListData", albumListData);

      this.isAlbumLoading = false;

      let albumList = [];
      albumListData.list.forEach((item) => {
        let gridListItem = {
          id: item.albumMid,
          imgUrl:
            "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
            item.albumMid +
            ".jpg?max_age=2592000",
          text: item.albumName,
        };
        albumList.push(gridListItem);
      });
      this.albumList = albumList;
    },

    async getAlbumInfo(item) {
      this.isAlbumLoading = true;

      let albumInfoData;
      try {
        albumInfoData = await getAlbum({
          albumMid: item.id,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isAlbumLoading = false;
      }
      console.log("albumInfoData", albumInfoData);
      this.isAlbumLoading = false;

      let musicList = standardizeAPI(albumInfoData.musicList);
      let albumInfo = {
        albumID: albumInfoData.album.albumMid,
        albumName: albumInfoData.album.albumName,
        albumImgUrl:
          "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
          albumInfoData.album.albumMid +
          ".jpg?max_age=2592000",
        musicList: musicList,
      };
      this.$store.commit("setAlbumInfo", albumInfo);
      this.$router.push({ path: "AlbumPage" });
    },

    async getMV() {
      this.activatedTab = "MV";
      this.isShowSingerSong = false;
      this.isShowSingerAlbum = false;
      this.isShowSingerMV = true;
      this.isMvLoading = true;

      let MVListData;
      try {
        MVListData = await getSingerMvList({
          singerMid: this.singerInfo.singerMid,
          page: 0,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isMvLoading = false;
      }
      console.log("MVListData", MVListData);
      this.isMvLoading = false;
      this.MVList = MVListData.list;
    },

    async getMVInfo(item) {
      this.isMvLoading = true;

      let MVInfoData;
      try {
        MVInfoData = await getMvInfo({
          mvId: item.mvId,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isMvLoading = false;
      }
      console.log("MVInfoData", MVInfoData);
      this.isMvLoading = false;

      let { mvSourceUrl, cn, vkey } = await getMUrl({
        fileid: MVInfoData.fileid,
      });

      let MVUrl = mvSourceUrl + cn + "?vkey=" + vkey;
      console.log(MVUrl);

      this.$store.commit("setMVUrl", MVUrl);
      this.$store.commit("showDialog", "mv-player");
    },

    async loadMoreSong() {
      //如果可以加载更多单曲则请求更多单曲，否则停止请求单曲
      if (this.songLoadMoreText != "已经到底啦o((>ω< ))o") {
        this.songListPage += 1;
        this.isSongLoading = true;

        let songListData;
        try {
          songListData = await getSingerMusicList({
            page: this.songListPage,
            singerMid: this.singerInfo.singerMid,
          });
        } catch (err) {
          this.$message.showMessage({
            type: "error",
            message: "请求数据出错：" + err,
          });
          this.isSongLoading = false;
        }
        console.log("songListData", songListData);
        this.isSongLoading = false;

        if (songListData.list.length < 30) {
          this.songLoadMoreText = "已经到底啦o((>ω< ))o";
        }
        this.songList.push(...standardizeAPI(songListData.list));
      }
    },

    async loadMoreAlbum() {
      //如果可以加载更多专辑则请求更多专辑，否则停止请求单曲
      if (this.albumLoadMoreText != "已经到底啦o((>ω< ))o") {
        this.albumListPage += 1;
        this.isAlbumLoading = true;

        let albumListData;
        try {
          albumListData = await getSingerAlbumList({
            page: this.albumListPage,
            singerMid: this.singerInfo.singerMid,
          });
        } catch (err) {
          this.$message.showMessage({
            type: "error",
            message: "请求数据出错：" + err,
          });
          this.isAlbumLoading = false;
        }
        console.log("albumListData", albumListData);
        this.isAlbumLoading = false;

        if (albumListData.list.length < 30) {
          this.albumLoadMoreText = "已经到底啦o((>ω< ))o";
        }

        albumListData.list.forEach((item) => {
          let gridListItem = {
            id: item.albumMid,
            imgUrl:
              "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
              item.albumMid +
              ".jpg?max_age=2592000",
            text: item.albumName,
          };
          this.albumList.push(gridListItem);
        });
      }
    },
  },
};
</script>

<style>
.singer-page {
  width: 100%;
  height: 100%;
  position: relative;
}

.singer-header {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.singer-img {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  overflow: hidden;
}

.singer-img > img {
  width: 100%;
  height: 100%;
}

.singer-introduction {
  width: 530px;
  height: 140px;
}

.singer-page-singer-name {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}

.singer-description {
  width: 100%;
  height: 100px;
  line-height: 20px;
  text-indent: 2em;
  text-align: justify;
  overflow-y: scroll;
}

.singer-tab-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.singer-tab {
  padding: 4px 10px;
  height: 20px;
  border-radius: 10px;
}

.singer-tab:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.singer-tab:active {
  transform: scale(1.2);
}

.singer-list-box {
  width: 100%;
  height: 440px;
}

.singer-list-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.singer-mv-box {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  overflow-y: scroll;
}

.singer-mv-item {
  width: 240px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.singer-mv-item > img {
  width: 240px;
  height: 135px;
  border-radius: 20px;
}

.singer-mv-name {
  width: 240px;
  height: 40px;
  line-height: 20px;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
