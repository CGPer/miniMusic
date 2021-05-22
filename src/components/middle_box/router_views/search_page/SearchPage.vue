<template>
  <div class="search-list-page">
    <loading :isLoading="isLoading" :isBlur="true"></loading>
    <song-list
      :list="searchList"
      :isShowLoadMore="true"
      @loadMore="loadMoreSearchSong"
      :loadMoreText="loadMoreText"
    ></song-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import standardizeAPI from "@/network/standardizeAPI.js";
import { getSearch } from "@/network/spider";

import SongList from "@/common/SongList.vue";
import Loading from "@/common/Loading.vue";

export default {
  name: "search-page",
  data() {
    return {
      searchList: [],
      loadMoreText: "加载更多",
      currentPage: 1,
      isLoading: false,
      loadMoreText: "加载更多",
    };
  },
  components: {
    SongList,
    Loading,
  },
  computed: {
    ...mapState(["searchText"]),
  },
  watch: {
    searchText(newValue) {
      console.log(newValue);
      this.searchSong();
    },
  },
  mounted() {
    this.searchSong();
  },
  methods: {
    async searchSong() {
      let searchText = this.searchText;
      this.currentPage = 1;
      this.isLoading = true;
      this.loadMoreText = "加载更多";

      let searchListData;
      try {
        searchListData = await getSearch({
          keyword: searchText,
          page: 1,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isLoading = false;
      }
      console.log("searchListData", searchListData);
      this.isLoading = false;

      let searchList = standardizeAPI(searchListData.songList);
      this.searchList = searchList;
    },
    async loadMoreSearchSong() {
      this.currentPage += 1;
      this.loadMoreText = "加载中...";

      let searchText = this.searchText;

      let searchListData;
      try {
        searchListData = await getSearch({
          keyword: searchText,
          page: this.currentPage,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.loadMoreText = "加载更多";
      }
      console.log("searchListData", searchListData);

      let searchList = standardizeAPI(searchListData.songList);
      this.searchList.push(...searchList);

      if (searchList.length < 50) {
        this.loadMoreText = "没有更多了q(≧▽≦q)";
      } else {
        this.loadMoreText = "加载更多";
      }
    },
  },
};
</script>

<style>
.search-list-page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
