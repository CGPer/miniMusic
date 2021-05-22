<template>
  <div class="liked-list-page">
    <song-list :list="likedList"></song-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "@/common/SongList.vue";

export default {
  name: "liked-list-page",
  components: {
    SongList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["likedList"]),
  },
  methods: {},
};
</script>

<style>
.liked-list-page {
  width: 100%;
  height: 100%;
}
</style>
