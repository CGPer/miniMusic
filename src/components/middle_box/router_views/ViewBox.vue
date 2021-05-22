<template>
  <div class="view-box">
    <keep-alive>
      <router-view name="nav"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "view-box",
};
</script>

<style>
.view-box {
  width: 100%;
  height: 670px;
}
</style>