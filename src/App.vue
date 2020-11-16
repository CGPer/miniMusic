<template>
<div id="app">
  <div class="app-background" :style="getBgStyle"></div>
  <div class="app-background-above">
    <left-nav></left-nav>
    <middle-box></middle-box>
    <right-bar></right-bar>
  </div>
</div>
</template>

<script>
import LeftNav from './components/left_nav/LeftNav'
import MiddleBox from './components/middle_box/MiddleBox'
import RightBar from './components/right_bar/RightBar'

export default {
  name: 'app',
  components: {
    LeftNav,
    MiddleBox,
    RightBar
  },
  data() {
    return {
      defaultAlbumImgUrl: require("@/assets/default-album-img.jpg"),
      albumImgUrl: null,
      bgStyle: {}
    }
  },
  computed: {
    getBgStyle() {
      //刚启动和歌曲没有专辑图片时，使用默认专辑图片作为背景
      if (this.$store.state.currentList.length == 0 || this.$store.state.currentList[this.$store.state.currentListIndex].albumname == "   ") {
        this.albumImgUrl = this.defaultAlbumImgUrl
      } else {
        this.albumImgUrl = this.$store.state.currentList[this.$store.state.currentListIndex].albumimg
      }

      //请求图片需要时间，背景会短暂变成白色形成闪烁
      //所以延迟背景图片改变，给出请求背景图片（专辑图片）的时间
      setTimeout(() => {
        this.bgStyle = {
          'background-image': 'url(' + this.albumImgUrl + ')'
        }
      }, 1000)

      return this.bgStyle
    }
  },
  mounted() {
    this.$store.commit('getHistoryData')
    this.$router.push('Top100Page')
  }
}
</script>

<style>
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #7E57C2;
}

#app {
  width: 1000px;
  height: 800px;
  position: relative;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  -webkit-user-select: none;
  box-shadow: 0 0 10px 5px gray;
  overflow: hidden;
  background-color: white;
}

.app-background {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("./assets/default-album-img.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(150px);
}

.app-background-above {
  width: 100%;
  height: 100%;
  position: absolute;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
}

::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
