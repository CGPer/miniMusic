<template>
  <div class="remove-song-list">
    <div class="remove-song-list-title">
      确定将收藏歌单<span>{{ markList[removeMarkListIndex].name }}</span
      >删除吗？
    </div>
    <div class="remove-song-list-footer">
      <div class="remove-song-list-cancel" @click="cancel">取消</div>
      <div class="remove-song-list-confirm" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "remove-song-list",
  computed: {
    ...mapState(["markList", "removeMarkListIndex"]),
  },
  methods: {
    cancel() {
      this.$store.commit("hideDialog");
    },

    confirm() {
      this.$store.commit("removeSongList");
      this.$store.commit("hideDialog");
    },
  },
};
</script>

<style>
.remove-song-list {
  width: 200px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 10px var(--highlight-deep-color);
  background-color: var(--background-color);
}

.remove-song-list-title {
  font-size: 14px;
  padding: 5px;
}

.remove-song-list-title > span {
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  padding: 2px 5px;
  border-radius: 6px;
  background-color: var(--highlight-color);
  color: var(--highlight-deep-color);
}

.remove-song-list-footer {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
}

.remove-song-list-cancel {
  width: 100%;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border-top: 1px var(--progress-bar-color) solid;
  border-right: 1px var(--progress-bar-color) solid;
}

.remove-song-list-cancel:hover {
  cursor: pointer;
  color: var(--highlight-deep-color);
}

.remove-song-list-confirm {
  width: 100%;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border-top: 1px var(--progress-bar-color) solid;
}

.remove-song-list-confirm:hover {
  cursor: pointer;
  color: var(--highlight-deep-color);
}
</style>
