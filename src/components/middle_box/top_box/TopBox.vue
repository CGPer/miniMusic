<template>
  <div class="top-box">
    <div class="back-or-forward">
      <img @click="goBack" src="@/assets/back.svg" width="20px" />
      <img @click="goForward" src="@/assets/forward.svg" width="20px" />
    </div>
    <div class="input-box">
      <input
        type="text"
        class="search-input"
        v-model.trim="searchText"
        @change="searchSong"
        placeholder="搜索音乐"
        @focus="showSearchHistory"
        @blur="hideSearchHistory"
        @input="isShowSearchHistory = true"
      />
      <div class="search-history-box" v-show="isShowSearchHistory">
        <div
          class="search-history-item"
          v-for="(item, index) in searchHistoryArr"
          :key="index"
        >
          <div class="search-history-block">
            <div class="search-history-block-text" @click="searchThisText(item)">
              {{ item.searchText }}
            </div>
            <div class="delete-this-search-text" @click="deleteSearchText(index)">
              <img src="@/assets/delete-search-text.svg" width="20px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-box",
  data() {
    return {
      searchText: "",
      searchHistoryArr: [],
      isShowSearchHistory: false,
      isDeletingSearchText: false,
    };
  },
  mounted() {
    //获取历史搜索记录
    if (localStorage.hasOwnProperty("serachHistoryArr")) {
      this.searchHistoryArr = JSON.parse(localStorage.getItem("serachHistoryArr"));
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    goForward() {
      this.$router.go(1);
    },

    searchSong() {
      this.isShowSearchHistory = false;
      if (this.searchText !== "") {
        //防止无输入搜索

        //切换到搜索页面
        this.$router.push({ path: "/SearchPage" });

        this.$store.commit("setSearchText", this.searchText);
      }

      //下面开始记录搜索历史和搜索频率
      let thisSearchText = this.searchText;

      if (thisSearchText !== "") {
        //防止空格加入搜索历史
        let searchHistoryObj = {
          searchText: thisSearchText,
          searchFrequency: 1,
        };
        let haveSameSearchText = false;

        //如果有相同的搜索内容，频率加一
        this.searchHistoryArr.some((item) => {
          if (item.searchText === thisSearchText) {
            item.searchFrequency += 1;
            haveSameSearchText = true;
            return true;
          }
        });

        //如果输入新的内容，则直接加入历史搜索
        if (haveSameSearchText === false) {
          //限制最多存放20条历史搜索记录
          //防止占用过多的浏览器的localStorage空间
          if (this.searchHistoryArr.length > 20) {
            this.searchHistoryArr.pop();
            this.searchHistoryArr.unshift(searchHistoryObj);
          } else {
            this.searchHistoryArr.unshift(searchHistoryObj);
          }
        }

        //将搜索词条按频率降序排列
        function descendingOrder(a, b) {
          return b.searchFrequency - a.searchFrequency;
        }

        this.searchHistoryArr.sort(descendingOrder);

        //将搜索历史保存到浏览器
        localStorage.setItem("serachHistoryArr", JSON.stringify(this.searchHistoryArr));
      }
    },

    searchThisText(item) {
      this.searchText = item.searchText;
      this.searchSong();

      //隐藏搜索提示框
      this.isShowSearchHistory = false;
    },

    showSearchHistory() {
      this.isShowSearchHistory = true;

      //用户正在输入，需要暂时移除快捷键功能。
      this.$store.commit("sendInputFocus", true);
    },

    hideSearchHistory() {
      //用户结束输入，需要继续开启快捷键监听
      this.$store.commit("sendInputFocus", false);
      //延时隐藏历史搜索，不然点击历史搜索无法输入
      setTimeout(() => {
        //删除历史搜索词条时，防止失焦隐藏搜索历史
        if (this.isDeletingSearchText === false) {
          this.isShowSearchHistory = false;
        }
      }, 200);
    },

    deleteSearchText(index) {
      this.isDeletingSearchText = true;

      //删除用户想要删除的历史搜索词条
      this.searchHistoryArr.splice(index, 1);

      //将搜索历史保存到浏览器
      localStorage.setItem("serachHistoryArr", JSON.stringify(this.searchHistoryArr));

      //这个延时大于历史搜索关闭延时，
      //防止在删除历史搜索词条时隐藏历史搜索
      setTimeout(() => {
        this.isDeletingSearchText = false;
      }, 500);
    },
  },
};
</script>

<style>
.top-box {
  width: 100%;
  height: 50px;
  position: relative;
}

.back-or-forward {
  height: 20px;
  margin-top: 15px;
  float: left;
}

.back-or-forward img {
  border-radius: 6px;
}

.back-or-forward img:hover {
  cursor: pointer;
  transform: scale(1.2);
  background-color: var(--highlight-color);
}

.back-or-forward img:active {
  transform: scale(1.5);
}

.back-or-forward img:nth-child(2) {
  margin-left: 10px;
}

.input-box {
  position: absolute;
  width: 400px;
  height: 30px;
  float: left;
  margin-left: 150px;
  margin-top: 10px;
}

.search-input {
  border: none;
  width: 400px;
  height: 30px;
  box-sizing: border-box;
  padding-left: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.search-input:focus {
  outline: 0;
  box-shadow: 0 0 5px var(--highlight-deep-color);
  background-color: rgba(255, 255, 255, 0.6);
}

.search-history-box {
  width: 400px;
  max-height: 100px;
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: var(--background-color);
  box-shadow: 0 0 5px var(--highlight-deep-color);
}

.search-history-item {
  height: 20px;
  float: left;
  margin-left: 5px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 0 5px var(--highlight-deep-color);
}

.search-history-item:last-child {
  margin-bottom: 10px;
}

.search-history-item:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.search-history-item:active {
  transform: scale(1.2);
}

.search-history-block-text {
  float: left;
  margin-left: 5px;
  line-height: 20px;
  font-size: 14px;
}

.delete-this-search-text {
  width: 20px;
  height: 20px;
  float: left;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.delete-this-search-text:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.delete-this-search-text:active {
  transform: scale(1.5);
}
</style>
