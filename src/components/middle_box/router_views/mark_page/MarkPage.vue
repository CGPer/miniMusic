<template>
  <div class="mark-page">
    <song-list
      :list="markList.length === 0 ? [] : markList[markListIndex].list"
      :isShowMarkImg="true"
    ></song-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "@/common/SongList.vue";

export default {
  name: "mark-page",
  data() {
    return {};
  },
  components: {
    SongList,
  },
  computed: {
    ...mapState(["markList", "markListIndex"]),
  },
  methods: {},
};
</script>

<style>
.search-page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
