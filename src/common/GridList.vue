<template>
  <div class="grid-list">
    <div class="grid-list-back-top" @click="backTop" v-show="isShowBackTop">
      <img src="@/assets/backtop.svg" width="30px" />
    </div>
    <div class="grid-list-scroll" @scroll="scroll" ref="gridListScrollDOM">
      <div class="grid-item-box">
        <div
          class="grid-item"
          v-for="item in list"
          @click="userClick(item)"
          :key="item.id"
        >
          <img :src="item.imgUrl" />
          <div class="grid-item-name">{{ item.text }}</div>
        </div>
      </div>
      <div class="grid-load-more" @click="loadMore" v-show="isShowLoadMore">
        {{ loadMoreText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grid-list",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loadMoreText: {
      type: String,
      default() {
        return "加载更多";
      },
    },
    isShowLoadMore: {
      type: Boolean,
      default: true,
    },
    isKeepScrollPositon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scrollerPosition: 0,
    };
  },
  computed: {
    //将list的第一个item的id作为list的id
    listId() {
      if (this.list.length > 0) {
        return this.list[0].id;
      }
    },
  },
  watch: {
    //如果list的id变化则自动回到顶端
    listId() {
      this.backTop();
    },
  },
  data() {
    return {
      isShowBackTop: false,
      scrollerPosition: 0,
    };
  },
  activated() {
    //返回后保持原来的滚动位置
    if (this.isKeepScrollPositon === true) {
      this.$refs.gridListScrollDOM.scrollTop = this.scrollerPosition;
    }
  },
  methods: {
    userClick(item) {
      this.$emit("clickItem", item);
    },

    loadMore() {
      this.$emit("loadMore");
    },

    //监听页面滚动事件
    scroll(e) {
      //当滑块滑动到一定距离一键回顶才出现
      this.scrollerPosition = e.target.scrollTop;

      if (this.scrollerPosition > 600) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },

    backTop() {
      //如丝般流畅地滑到顶端
      let timer = setInterval(() => {
        this.$refs.gridListScrollDOM.scrollTop -= 100;
        if (this.$refs.gridListScrollDOM.scrollTop <= 0) {
          clearInterval(timer);
        }
      }, 10);
    },
  },
};
</script>

<style>
.grid-list {
  position: relative;
  width: 100%;
  height: 100%;
}

.grid-list-back-top {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 45px;
  right: 10px;
  border-radius: 10px;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.3);
}

.grid-list-back-top:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.grid-list-back-top:active {
  transform: scale(1.2);
}

.grid-list-scroll {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.grid-item-box {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-items: center;
  align-items: center;
  grid-row-gap: 10px;
}

.grid-item {
  width: 160px;
  height: 220px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.grid-item > img {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  box-shadow: 0 0 15px grey;
}

.grid-item > img:hover {
  transform: scale(1.1);
}

.grid-item-name {
  width: 160px;
  height: 60px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.grid-load-more {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

grid-load-more:hover {
  cursor: pointer;
}
</style>
