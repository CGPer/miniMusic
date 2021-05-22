<template>
  <div class="album-page">
    <div class="album-header">
      <div class="album-page-album-img">
        <img :src="albumInfo.albumImgUrl" />
      </div>
      <div class="album-page-album-name">{{ albumInfo.albumName }}</div>
    </div>
    <div class="album-list-box">
      <song-list :list="albumInfo.musicList"></song-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import SongList from "@/common/SongList.vue";

export default {
  name: "album-page",
  components: {
    SongList,
  },
  computed: {
    ...mapState(["albumInfo"]),
  },
};
</script>

<style>
.album-page {
  width: 100%;
  height: 100%;
}

.album-header {
  width: 100%;
  height: 200px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.album-page-album-img {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  overflow: hidden;
}

.album-page-album-img > img {
  width: 100%;
  height: 100%;
}

.album-page-album-name {
  margin-left: 20px;
}

.album-list-box {
  width: 100%;
  height: 460px;
}
</style>
