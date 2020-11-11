<template>
  <div class="middle-box">
    <top-box></top-box>
    <view-box></view-box>
    <bottom-box></bottom-box>
  </div>
</template>

<script>

import TopBox from './top_box/TopBox'
import ViewBox from './router_views/ViewBox'
import BottomBox from './bottom_box/BottomBox'

export default {
  name: 'middle-box',
  components: {
    TopBox,
    BottomBox,
    ViewBox
  }
}
</script>

<style>

.middle-box {
  width: 760px;
  height: 100%;
  float: left;
}

</style>