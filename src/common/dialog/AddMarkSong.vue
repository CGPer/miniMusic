<template>
  <div class="add-mark-song-dialog">
    <div class="mark-dialog-body">
      <div class="mark-dialog-title">
        将
        <span>{{ selectedSong.songName }}</span>
        加入：
      </div>
      <div class="mark-dialog-item-box">
        <div
          class="mark-dialog-item"
          v-for="(item, index) in markList"
          :key="index"
          @click="setActiveIndex(index)"
          :style="setActiveStyle(index)"
        >
          {{ item.name }}
        </div>
        <div class="mark-dialog-add-item">
          <div class="mark-dialog-input-box" v-if="isShowInput">
            <input
              type="text"
              id="mark-dialog-input"
              @focus="inputFocus"
              @blur="hideInput"
              @change="inputChange"
              v-model="inputText"
              maxlength="10"
            />
          </div>
          <div class="mark-dialog-add-box" v-else @click="showInput">
            <div class="mark-dialog-add-icon">
              <img src="@/assets/add.svg" />
            </div>
            <div class="mark-dialog-add-text">新建歌单</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mark-dialog-footer">
      <div class="mark-dialog-cancel" @click="cancel">取消</div>
      <div class="mark-dialog-confirm" @click="confirm">确认</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "add-mark-song",
  data() {
    return {
      activeIndex: null,
      isShowInput: false,
      inputText: "",
    };
  },
  computed: {
    ...mapState(["selectedSong", "markList"]),
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
    },

    setActiveStyle(index) {
      let activeStyle = {};
      if (this.activeIndex === index) {
        activeStyle = {
          "background-color": "var(--highlight-color)",
        };
      }
      return activeStyle;
    },

    confirm() {
      if (this.activeIndex !== null) {
        let list = this.markList[this.activeIndex].list;
        let isThisSongMarked = false;

        //检查要收藏的歌曲是否已被收藏过
        list.forEach((item) => {
          if (item.songmid === this.selectedSong.songmid) {
            isThisSongMarked = true;
          }
        });

        if (isThisSongMarked === false) {
          this.$store.commit("addMarkSong", this.activeIndex);
          this.$store.commit("hideDialog");
        } else {
          this.$message.showMessage({
            type: "warning",
            message: "此歌单已存在此歌曲",
          });
        }
      } else {
        this.$message.showMessage({
          type: "warning",
          message: "请选择需要加入的歌单",
        });
      }
    },

    cancel() {
      this.$store.commit("hideDialog");
    },

    inputFocus() {
      this.$store.commit("sendInputFocus", true);
    },

    showInput() {
      this.isShowInput = true;
      setTimeout(() => {
        document.getElementById("mark-dialog-input").focus();
      }, 50);
    },

    hideInput() {
      this.isShowInput = false;
      this.$store.commit("sendInputFocus", false);
    },

    inputChange() {
      let haveSameListName = false;

      this.markList.forEach((item) => {
        if (item.name === this.inputText) {
          haveSameListName = true;
        }
      });

      if (haveSameListName === false) {
        this.isShowInput = false;
        this.$store.commit("addSongList", this.inputText);
        this.activeIndex = this.markList.length - 1;
        this.inputText = "";
      } else {
        this.$message.showMessage({
          type: "warning",
          message: "已存在此歌单名，请使用其他名称",
        });
        this.inputText = "";
      }
    },
  },
};
</script>

<style>
.add-mark-song-dialog {
  width: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 10px var(--highlight-deep-color);
  background-color: var(--background-color);
}

.mark-dialog-body {
  padding: 10px;
}

.mark-dialog-title {
  font-size: 14px;
}

.mark-dialog-title > span {
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  padding: 2px 5px;
  border-radius: 6px;
  background-color: var(--highlight-color);
  color: var(--highlight-deep-color);
}

.mark-dialog-item-box {
  max-height: 200px;
  overflow-y: scroll;
  margin: 10px 0;
}

.mark-dialog-item {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-left: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: rgba(197, 181, 240, 0.3);
}

.mark-dialog-item:hover {
  cursor: pointer;
  background-color: var(--highlight-color);
}

.mark-dialog-add-item {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-radius: 10px;
  background-color: rgba(197, 181, 240, 0.3);
}

.mark-dialog-add-box {
  display: flex;
}

.mark-dialog-add-icon {
  width: 30px;
  height: 30px;
}

.mark-dialog-add-icon > img {
  width: 100%;
  height: 100%;
}

.mark-dialog-add-text {
  height: 30px;
  line-height: 30px;
}

.mark-dialog-input-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark-dialog-input-box > input {
  border: none;
  width: 90%;
  height: 20px;
  border-radius: 5px;
  text-align: center;
}

.mark-dialog-input-box > input:focus {
  outline: none;
  box-shadow: 0 0 5px var(--highlight-deep-color);
}

.mark-dialog-footer {
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}

.mark-dialog-cancel {
  width: 100%;
  font-size: 14px;
  border-top: 1px var(--progress-bar-color) solid;
  border-right: 1px var(--progress-bar-color) solid;
}

.mark-dialog-cancel:hover {
  cursor: pointer;
  color: var(--highlight-deep-color);
}

.mark-dialog-confirm {
  width: 100%;
  font-size: 14px;
  border-top: 1px var(--progress-bar-color) solid;
}

.mark-dialog-confirm:hover {
  cursor: pointer;
  color: var(--highlight-deep-color);
}
</style>
