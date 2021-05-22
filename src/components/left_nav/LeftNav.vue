<template>
  <div class="left-nav">
    <div class="logo-box" @click="testAPI">
      <div class="logo">
        <img src="@/assets/logo.svg" width="50px" />
      </div>
      <div class="app-name">迷你音乐</div>
    </div>
    <div class="router-button-box">
      <router-link to="/DiscoverPage" class="nav-item">
        <img class="nav-icon" src="@/assets/discover.svg" />
        <div class="nav-text">发现</div>
      </router-link>
      <router-link to="/SearchPage" class="nav-item">
        <img class="nav-icon" src="@/assets/search.svg" />
        <div class="nav-text">搜索</div>
      </router-link>
      <router-link to="/LikedPage" class="nav-item">
        <img class="nav-icon" src="@/assets/liked.svg" />
        <div class="nav-text">喜欢</div>
      </router-link>
      <router-link to="/LyricPage" class="nav-item">
        <img class="nav-icon" src="@/assets/lyric.svg" />
        <div class="nav-text">歌词</div>
      </router-link>
      <div
        class="nav-item mark-item"
        id="markListDiv"
        @click.self="markBox"
        @blur="hideMarkBox"
        tabindex="0"
      >
        <img class="nav-icon" src="@/assets/marked.svg" @click="markBox" />
        <div class="nav-text" @click="markBox">收藏</div>
        <img
          class="nav-arrow-down-icon"
          src="@/assets/arrow-down.svg"
          @click="markBox"
          :style="arrowStytle"
        />
        <div class="nav-mark-song-box" v-show="isShowMarkBox" :style="markBoxStyle">
          <div
            class="nav-mark-song-item"
            v-for="(item, index) in markList"
            :key="item.name"
            @click="clickList(index)"
            :class="{ active: activeListIndex === index }"
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = null"
          >
            <div class="nav-mark-song-text">
              {{ item.name }}
            </div>
            <div class="nav-edit-box" v-if="hoverIndex === index">
              <div class="nav-rename-box" @click="showRenameInput(index)">
                <img src="@/assets/edit.svg" />
              </div>
              <div class="nav-delete-box" @click="removeSongList(index)">
                <img src="@/assets/delete.svg" />
              </div>
            </div>
            <div class="nav-rename-input-box" v-if="renameIndex === index">
              <input
                type="text"
                id="nav-rename-input"
                @focus="inputFocus"
                @blur="hideRenameInput"
                @change="renameInputChange(index)"
                v-model="renameInputText"
              />
            </div>
          </div>
          <div class="nav-mark-add-item">
            <div class="nav-mark-input-box" v-if="isShowAddInput">
              <input
                type="text"
                id="nav-mark-input"
                @focus="inputFocus"
                @blur="hideAddInput"
                @change="addInputChange"
                v-model="addInputText"
                maxlength="10"
              />
            </div>
            <div class="nav-mark-add-box" v-else @click="showAddInput">
              <div class="nav-mark-add-icon">
                <img src="@/assets/add.svg" />
              </div>
              <div class="nav-mark-add-text">新建歌单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="playing-box">
      <div class="album-img-box">
        <album-img></album-img>
      </div>
      <div class="playing-song-name">
        {{ currentList.length === 0 ? "" : currentList[currentListIndex].songName }}
      </div>
      <div class="playing-singer-name">
        {{ currentList.length == 0 ? "" : showSingerName }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AlbumImg from "./album_img/AlbumImg.vue";

import { getSearch, getSongVkey, getCdn, getLyric, getCategory } from "@/network/spider";

export default {
  name: "left-nav",
  data() {
    return {
      markBoxStyle: {},
      arrowStytle: {},
      isShowMarkBox: false,
      isShowAddInput: false,
      renameIndex: null,
      addInputText: "",
      renameInputText: "",
      activeListIndex: null,
      hoverIndex: null,
    };
  },
  components: { AlbumImg },
  computed: {
    ...mapState(["currentList", "currentListIndex", "markList", "isInputFocus"]),

    showSingerName() {
      let singer = this.currentList[this.currentListIndex].singer;
      let singerNameArr = [];
      singer.forEach((item) => {
        singerNameArr.push(item.name);
      });

      let singerNames = singerNameArr.join("/");
      return singerNames;
    },
  },
  methods: {
    async testAPI() {
      let cat = await getCategory();
      console.log(cat);
    },

    //点击收藏时展示下拉框的下拉和收起动画
    markBox() {
      this.$router.push("MarkPage");
      //展开动画
      if (this.isShowMarkBox === false) {
        //收藏框向下滚出
        this.markBoxStyle = {
          "max-height": "200px",
          transition: "max-height 0.3s ease-out",
        };
        //箭头旋转到朝上
        this.arrowStytle = {
          transform: "rotate(-180deg)",
          transition: "all 0.3s ease-out",
        };
        this.isShowMarkBox = true;
      } else {
        //收起动画
        this.markBoxStyle = {
          "max-height": "0px",
          transition: "max-height 0.3s ease-in",
        };
        this.arrowStytle = {
          transform: "rotate(0deg)",
          transition: "all 0.3s ease-in",
        };
        this.isShowMarkBox = false;
      }
    },

    hideMarkBox() {
      if (this.isInputFocus === false) {
        this.markBoxStyle = {
          "max-height": "0px",
          transition: "max-height 0.3s ease-in",
        };
        this.arrowStytle = {
          transform: "rotate(0deg)",
          transition: "all 0.3s ease-in",
        };
        this.isShowMarkBox = false;
      }
    },

    removeSongList(index) {
      this.$store.commit("sendRemoveMarkListIndex", index);
      this.$store.commit("showDialog", "remove-song-list");
    },

    inputFocus() {
      this.$store.commit("sendInputFocus", true);
    },

    showAddInput() {
      this.isShowAddInput = true;

      this.$store.commit("sendInputFocus", true);
      setTimeout(() => {
        document.getElementById("nav-mark-input").focus();
      }, 50);
    },

    showRenameInput(index) {
      this.renameIndex = index;
      let oldName = this.markList[index].name;
      this.renameInputText = oldName;

      this.$store.commit("sendInputFocus", true);
      setTimeout(() => {
        document.getElementById("nav-rename-input").focus();
      }, 50);
    },

    hideAddInput(whichInput) {
      this.isShowAddInput = false;
      this.$store.commit("sendInputFocus", false);
      document.getElementById("markListDiv").focus();
    },

    hideRenameInput() {
      this.renameIndex = null;
      this.$store.commit("sendInputFocus", false);
      document.getElementById("markListDiv").focus();
    },

    addInputChange() {
      let haveSameListName = false;

      this.markList.forEach((item) => {
        if (item.name === this.addInputText) {
          haveSameListName = true;
        }
      });

      if (haveSameListName === false) {
        this.isShowAddInput = false;
        this.$store.commit("addSongList", this.addInputText);
        this.activeIndex = this.markList.length - 1;
        this.addInputText = "";
      } else {
        this.$message.showMessage({
          type: "warning",
          message: "已存在此歌单名，请使用其他名称",
        });
        this.addInputText = "";
      }
    },

    renameInputChange(index) {
      let payload = {
        newName: this.renameInputText,
        index: index,
      };

      this.$store.commit("renameSongList", payload);
      this.renameIndex = null;
      this.renameInputText = "";
    },

    clickList(index) {
      this.activeListIndex = index;
      this.$store.commit("sendMarkListIndex", this.activeListIndex);
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
  background-color: rgba(255, 255, 255, 0.2);
}

.logo {
  width: 50px;
  height: 50px;
  float: left;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
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

.router-button-box {
  width: 100%;
  height: 470px;
  overflow: hidden;
}

.nav-item {
  width: 160px;
  height: 30px;
  display: block;
  margin-left: 20px;
  margin-bottom: 15px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-item:first-child {
  margin-top: 50px;
}

.nav-item:hover {
  background-color: var(--highlight-color);
}

.nav-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}

.nav-text {
  float: left;
  height: 30px;
  margin-left: 5px;
  line-height: 30px;
  font-size: var(--font-size);
  color: var(--font-color);
}

.nav-arrow-down-icon {
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 20px;
  margin-top: 5px;
}

.mark-item {
  position: relative;
}

.mark-item:focus {
  outline: none;
}

.nav-mark-song-box {
  width: 100%;
  max-height: 100px;
  margin-top: 35px;
  overflow-y: scroll;
  position: absolute;
  border-radius: 10px;
  background-color: var(--background-color);
  box-shadow: 0 0 6px var(--highlight-deep-color);
}

.active {
  background-color: var(--highlight-color) !important;
}

.nav-mark-song-item {
  position: relative;
  height: 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-top: 4px;
  border-radius: 8px;
  background-color: rgba(197, 181, 240, 0.3);
}

.nav-mark-song-item:last-child {
  margin-bottom: 4px;
}

.nav-mark-song-item:hover {
  cursor: pointer;
  background-color: var(--highlight-color);
}

.nav-mark-song-text {
  float: left;
  padding-left: 5px;
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.nav-edit-box {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.nav-rename-box {
  position: relative;
  width: 14px;
  height: 14px;
  margin-right: 5px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-rename-box > img {
  width: 100%;
  height: 100%;
}

.nav-rename-box > img:hover {
  transform: scale(1.2);
}

.nav-rename-box > img:active {
  transform: scale(1.3);
}

.nav-delete-box {
  position: relative;
  width: 14px;
  height: 14px;
  margin-right: 5px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-delete-box > img {
  width: 100%;
  height: 100%;
}

.nav-delete-box > img:hover {
  transform: scale(1.2);
}

.nav-delete-box > img:active {
  transform: scale(1.3);
}

.nav-rename-input-box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-rename-input-box > input {
  border: none;
  width: 90%;
  height: 20px;
  font-size: 14px;
  border-radius: 5px;
  text-align: center;
}

.nav-rename-input-box > input:focus {
  outline: none;
  box-shadow: 0 0 5px var(--highlight-deep-color);
}

.nav-mark-add-item {
  height: 30px;
  margin-left: 10px;
  margin-top: 4px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(197, 181, 240, 0.3);
}

.nav-mark-input-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-mark-input-box > input {
  border: none;
  width: 90%;
  height: 20px;
  font-size: 14px;
  border-radius: 5px;
  text-align: center;
}

.nav-mark-input-box > input:focus {
  outline: none;
  box-shadow: 0 0 5px var(--highlight-deep-color);
}

.nav-mark-add-box {
  display: flex;
}

.nav-mark-add-icon {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-mark-add-icon > img {
  width: 25px;
  height: 25px;
}

.router-link-active {
  background-color: var(--highlight-color);
}

.playing-box {
  width: 200px;
  height: 240px;
}

.album-img-box {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.playing-song-name {
  width: 180px;
  height: 20px;
  margin-top: 5px;
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
