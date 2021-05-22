<template>
  <div class="choose-singer">
    <div class="choose-singer-title">请选择歌手：</div>
    <div class="choose-singer-close-button close-button"></div>
    <div class="choose-singer-list">
      <div
        class="choose-singer-item"
        v-for="item in chooseSingerList"
        @click="chooseSinger(item)"
        :key="item.ID"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getSingerInfo } from "@/network/spider";

export default {
  name: "choose-singer",
  computed: {
    ...mapState(["chooseSingerList"]),
  },
  data() {
    return {};
  },
  methods: {
    async chooseSinger(item) {
      console.log(item);
      let singerDescription = "";
      try {
        let singerInfoData = await getSingerInfo({ singerMid: item.ID });
        singerDescription = singerInfoData.desc;
      } catch (err) {
        console.log(err);
        singerDescription = "";
      }
      let singerInfo = {
        singerName: item.name,
        singerMid: item.ID,
        singerPic:
          "http://y.gtimg.cn/music/photo_new/T001R150x150M000" + item.ID + ".jpg",
        singerDescription: singerDescription,
      };
      console.log(singerInfo);
      this.$store.commit("setSingerInfo", singerInfo);
      this.$router.push({ path: "SingerPage" });
      this.$store.commit("hideDialog");
    },

    closeMVPlayerDialog() {
      this.$store.commit("hideDialog");
    },
  },
};
</script>

<style>
.choose-singer {
  width: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 20px;
  background-color: var(--background-color);
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.choose-singer-title {
  width: 100%;
  padding: 5px;
}

.choose-singer-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.choose-singer-item {
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: rgba(197, 181, 240, 0.3);
}

.choose-singer-item:hover {
  background-color: var(--highlight-color);
}

.choose-singer-close-button {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
