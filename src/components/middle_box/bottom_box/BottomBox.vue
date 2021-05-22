<template>
  <div class="bottom-box">
    <div class="progress-box" @click="setSongDot" ref="progressBox">
      <div class="progress-bar">
        <div
          class="progressed"
          :style="{
            width: duration === null ? 0 : (currentTime / duration) * 760 + 'px',
          }"
        ></div>
      </div>
      <div
        class="slider-dot"
        :style="{
          'margin-left':
            (duration === null ? -6 : (currentTime / duration) * 760 - 6) + 'px',
        }"
        @mousedown="songDotDown"
        @mousemove="songDotMove"
      >
        <div class="breath-dot" :style="breathStyle"></div>
      </div>
    </div>
    <div class="time-box">{{ showTime }}</div>
    <div class="speed-box">
      <div
        class="speed-text-box"
        tabindex="0"
        @click="isShowSpeedOptions = true"
        @blur="hideSpeedOptions"
      >
        <div class="speed-text">{{ speedText }}</div>
        <img src="@/assets/arrow-up.svg" />
      </div>
      <div class="speed-options-box" v-show="isShowSpeedOptions">
        <div class="speed-option" @click="changeSpeed(2, '2x')">2.0x</div>
        <div class="speed-option" @click="changeSpeed(1.5, '1.5x')">1.5x</div>
        <div class="speed-option" @click="changeSpeed(1.25, '1.25x')">1.25x</div>
        <div class="speed-option" @click="changeSpeed(1, '1.0x')">1.0x</div>
        <div class="speed-option" @click="changeSpeed(0.75, '0.75x')">0.75x</div>
        <div class="speed-option" @click="changeSpeed(0.5, '0.5x')">0.5x</div>
      </div>
    </div>
    <div class="play-mode-box">
      <img
        :src="modeStateImgUrl"
        tabindex="0"
        @click="isShowModeOptions = true"
        @blur="hideModeOptions"
        width="20px"
      />
      <div class="mode-options-box" v-show="isShowModeOptions">
        <div class="mode-option" @click="changePlayMode('listForwardMode')">
          <img src="@/assets/list-forward.svg" />
          <div class="mode-option-text">顺序播放</div>
        </div>
        <div class="mode-option" @click="changePlayMode('singleCycleMode')">
          <img src="@/assets/single-cycle.svg" />
          <div class="mode-option-text">单曲循环</div>
        </div>
        <div class="mode-option" @click="changePlayMode('listCycleMode')">
          <img src="@/assets/list-cycle.svg" />
          <div class="mode-option-text">列表循环</div>
        </div>
        <div class="mode-option" @click="changePlayMode('randomMode')">
          <img src="@/assets/random.svg" />
          <div class="mode-option-text">随机播放</div>
        </div>
      </div>
    </div>
    <div class="like-box">
      <img
        @click="likeSong"
        :src="currentList[currentListIndex] === null ? likeImgUrl : setLikeImgUrl"
      />
    </div>
    <div class="mark-box">
      <img
        @click="addMarkSong"
        :src="currentList[currentListIndex] === null ? markImgUrl : setMarkImgUrl"
      />
    </div>
    <div class="play-contral-box">
      <div class="previous-song" @click="playPreviousSong">
        <img src="@/assets/previous-song.svg" width="40px" />
      </div>
      <div class="palying-or-paused" @click="playContral">
        <img :src="playStateImgUrl" width="40px" />
      </div>
      <div class="next-song" @click="playNextSong">
        <img src="@/assets/next-song.svg" width="40px" />
      </div>
    </div>
    <div class="volume-box">
      <img :src="volumeStateImgUrl" width="24px" @click="mute" />
      <div class="volume-percentage">
        {{ parseInt((volumeDotX / 120) * 100) + "%" }}
      </div>
      <div class="volume-adjust-box" @click="setVolumeDot" ref="volumeAdjustBox">
        <div class="volume-adjust-bar">
          <div class="volume-progressed" :style="{ width: volumeDotX + 'px' }"></div>
        </div>
        <div
          class="slider-dot"
          :style="{ 'margin-left': volumeDotX - 6 + 'px' }"
          @mousedown="volumeDotDown"
          @mousemove="volumeDotMove"
        >
          <div class="volume-dot"></div>
        </div>
      </div>
    </div>
    <audio id="audio" :src="currentSongUrl" autoplay></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "bottom-box",
  data() {
    return {
      audio: null,
      currentTime: null,
      duration: null,
      isSongDotMovable: false,
      isVolumeDotMovable: false,
      songDotX: null,
      volumeDotX: 24,
      playStateImgUrl: require("@/assets/paused.svg"),
      playingImgUrl: require("@/assets/playing.svg"),
      pausedImgUrl: require("@/assets/paused.svg"),
      volumeStateImgUrl: require("@/assets/volume.svg"),
      volumeImgUrl: require("@/assets/volume.svg"),
      volumeMuteImgUrl: require("@/assets/volume-mute.svg"),
      modeStateImgUrl: require("@/assets/list-forward.svg"),
      listForwardImgUrl: require("@/assets/list-forward.svg"),
      singleCycleImgUrl: require("@/assets/single-cycle.svg"),
      listCycleImgUrl: require("@/assets/list-cycle.svg"),
      randomImgUrl: require("@/assets/random.svg"),
      likeImgUrl: require("@/assets/like.svg"),
      likedImgUrl: require("@/assets/liked.svg"),
      markImgUrl: require("@/assets/mark.svg"),
      markedImgUrl: require("@/assets/marked.svg"),
      isMuteNow: false,
      speedText: "倍速",
      playSpeed: 1,
      isShowSpeedOptions: false,
      isShowModeOptions: false,
      breathStyle: {},
    };
  },
  computed: {
    ...mapState([
      "currentList",
      "currentListIndex",
      "currentSongUrl",
      "likedList",
      "markList",
      "playMode",
      "isInputFocus",
    ]),

    songUrl() {
      if (this.currentList.length !== 0) {
        return this.currentList[this.currentListIndex];
      } else {
        return "";
      }
    },

    showTime() {
      //实时显示歌曲播放时间进度
      var current_m = Math.floor(this.currentTime / 60);
      var current_s = parseInt(this.currentTime % 60);
      var duration_m = Math.floor(this.duration / 60);
      var duration_s = parseInt(this.duration % 60);

      current_m += "";
      current_s += "";
      duration_m += "";
      duration_s += "";

      current_m = current_m.length == 1 ? "0" + current_m : current_m;
      current_s = current_s.length == 1 ? "0" + current_s : current_s;
      duration_m = duration_m.length == 1 ? "0" + duration_m : duration_m;
      duration_s = duration_s.length == 1 ? "0" + duration_s : duration_s;

      return current_m + ":" + current_s + "/" + duration_m + ":" + duration_s;
    },

    setLikeImgUrl() {
      let currentSongID = null;

      if (this.currentList.length !== 0) {
        currentSongID = this.currentList[this.currentListIndex].songID;
      }

      let isThisSongLiked = false;

      //检测当前歌曲是否已在喜欢列表中
      //在，则点亮红心。否则不点亮。
      this.likedList.forEach((item, index) => {
        if (item.songID === currentSongID) {
          isThisSongLiked = true;
        }
      });

      return isThisSongLiked ? this.likedImgUrl : this.likeImgUrl;
    },

    setMarkImgUrl() {
      let currentSongID = null;

      if (this.currentList.length !== 0) {
        currentSongID = this.currentList[this.currentListIndex].songID;
      }

      let isThisSongMarked = false;

      //检测当前歌曲是否已在收藏列表中
      //在，则点亮star。否则不点亮。
      this.markList.forEach((songList) => {
        songList.list.forEach((item) => {
          if (item.songID === currentSongID) {
            isThisSongMarked = true;
          }
        });
      });

      return isThisSongMarked ? this.markedImgUrl : this.markImgUrl;
    },
  },
  watch: {
    //由于按键监听(快捷键)会干扰搜索输入，所以这里监测用户是否正在搜索输入
    //搜索时一定要移除按键监听,搜索结束再添加监听
    isInputFocus(newValue) {
      console.log("isInputFocus", newValue);
      if (newValue === true) {
        document.removeEventListener("keydown", this.keyDown);
      } else {
        document.addEventListener("keydown", this.keyDown);
      }
    },
  },
  mounted() {
    //获取历史音量值
    if (localStorage.hasOwnProperty("volumeDotX")) {
      this.volumeDotX = parseInt(localStorage.getItem("volumeDotX"));
    }

    //初始化audio
    let audio = document.querySelector("#audio");
    this.audio = audio;
    this.audio.volume = this.volumeDotX / 120;
    this.audio.playbackRate = this.playSpeed;

    //添加监听
    this.addAudioEventListeners();
    this.addKeyboardEventListener();
    this.addMouseUpEventListener();
  },
  methods: {
    //音乐播放状态监听
    addAudioEventListeners() {
      this.audio.addEventListener("canplay", this.getDuration);
      this.audio.addEventListener("timeupdate", this.getCurrentTime);
      this.audio.addEventListener("ended", this.autoPlayNextSong);
      this.audio.addEventListener("playing", this.playing);
      this.audio.addEventListener("pause", this.pause);
    },

    //键盘事件监听
    addKeyboardEventListener() {
      document.addEventListener("keydown", this.keyDown);
    },

    //MouseUp事件监听
    addMouseUpEventListener() {
      document.addEventListener("mouseup", this.mouseUp);
    },

    keyDown(e) {
      //阻止按键默认事件，比如按空格键页面向下滚动
      e.preventDefault();

      switch (e.code) {
        //空格键为暂停或播放
        case "Space":
          this.playContral();
          break;

        //方向右键为下一首
        case "ArrowRight":
          this.playNextSong();
          break;

        //方向左键为上一首
        case "ArrowLeft":
          this.playPreviousSong();
          break;

        //方向上键为音量加10%
        case "ArrowUp":
          if (this.volumeDotX < 120) {
            this.volumeDotX += 12;
            if (this.volumeDotX > 120) {
              this.volumeDotX = 120;
            }
            this.audio.volume = this.volumeDotX / 120;
          }
          break;

        //方向下键为音量减10%
        case "ArrowDown":
          if (this.volumeDotX > 0) {
            this.volumeDotX -= 12;
            if (this.volumeDotX < 0) {
              this.volumeDotX = 0;
            }
            this.audio.volume = this.volumeDotX / 120;
          }
          break;
      }
    },

    mouseUp() {
      this.isSongDotMovable = false;
      this.isVolumeDotMovable = false;
      this.audio.volume = this.volumeDotX / 120;

      //保存音量到本地
      localStorage.setItem("volumeDotX", this.volumeDotX.toString());
    },

    getDuration() {
      this.$store.commit("albumRotateRunning");
      this.duration = this.audio.duration;
      this.playStateImgUrl = this.playingImgUrl;

      //将上一首的播放速率延续到下一首
      this.audio.playbackRate = this.playSpeed;

      //音乐开始播放，播放歌曲专辑图片开始转动
      this.$store.commit("albumRotateRunning");
    },

    getCurrentTime() {
      //实时获取歌曲的当前播放时间
      this.currentTime = this.audio.currentTime;
      this.$store.commit("sendCurrentTime", this.currentTime);
    },

    playing() {
      //正在播放歌曲，呼吸灯闪烁
      this.breathStyle = {
        animation: "breath 1.5s linear infinite",
      };
    },

    pause() {
      //暂停播放，songDot变红色
      this.breathStyle = {
        backgroundColor: "#ff6a6a",
      };
    },

    changeCurrentTime(value) {
      this.audio.currentTime = value;
    },

    changeSpeed(rate, text) {
      this.playSpeed = rate;
      this.audio.playbackRate = this.playSpeed;
      this.speedText = text;
      this.isShowSpeedOptions = false;
    },

    hideSpeedOptions() {
      setTimeout(() => {
        this.isShowSpeedOptions = false;
      }, 200);
    },

    changePlayMode(mode) {
      this.$store.commit("sendPlayMode", mode);
      switch (mode) {
        case "listForwardMode":
          this.modeStateImgUrl = this.listForwardImgUrl;
          break;
        case "singleCycleMode":
          this.modeStateImgUrl = this.singleCycleImgUrl;
          break;
        case "listCycleMode":
          this.modeStateImgUrl = this.listCycleImgUrl;
          break;
        case "randomMode":
          this.modeStateImgUrl = this.randomImgUrl;
          break;
      }
    },

    hideModeOptions() {
      setTimeout(() => {
        this.isShowModeOptions = false;
      }, 200);
    },

    likeSong() {
      //防止当前没歌却点击like
      if (this.currentList.length !== 0) {
        this.$store.commit("sendLikedSong", this.currentList[this.currentListIndex]);
      }
    },

    addMarkSong() {
      if (this.currentList.length !== 0) {
        let selectedSong = this.currentList[this.currentListIndex];
        this.$store.commit("sendSelectedSong", selectedSong);
        this.$store.commit("showDialog", "add-mark-song");
      }
    },

    playPreviousSong() {
      //随机播放模式下，上一首也是随机
      if (this.playMode === "randomMode") {
        this.$store.dispatch("handleRandomMode");
      } else {
        //其他模式上一首按顺序播放上一首
        this.$store.dispatch("playPreviousSong");
      }

      //将上一首的播放速度延续到下一首
      //因为切歌后播放速度会自动恢复到1
      setTimeout(() => {
        this.audio.playbackRate = this.playSpeed;
      }, 1000);
    },

    playContral() {
      //确保当前有歌单才能播放或暂停
      if (this.currentList.length !== 0) {
        if (this.audio.paused) {
          this.audio.play();
          this.playStateImgUrl = this.playingImgUrl;
          this.$store.commit("albumRotateRunning");
        } else {
          this.audio.pause();
          this.playStateImgUrl = this.pausedImgUrl;
          this.$store.commit("albumRotatePaused");
        }
      } else {
        this.audio.pause();
        this.playStateImgUrl = this.pausedImgUrl;
        this.$store.commit("albumRotatePaused");
      }
    },

    autoPlayNextSong() {
      this.$store.commit("albumRotatePaused");
      switch (this.playMode) {
        case "listForwardMode":
          //默认顺序播放，不做处理,直接下一首
          this.$store.dispatch("playNextSong");
          break;

        case "singleCycleMode":
          //单曲循环，播完又开始播
          this.audio.play();
          break;

        case "listCycleMode":
          //列表循环，处理已嵌入vuex中的playNextSong中，所以直接下一首
          this.$store.dispatch("playNextSong");
          break;

        case "randomMode":
          //随机播放
          this.$store.dispatch("handleRandomMode");
          break;
      }

      setTimeout(() => {
        this.audio.playbackRate = this.playSpeed;
      }, 1000);
    },

    playNextSong() {
      if (this.playMode == "randomMode") {
        this.$store.dispatch("handleRandomMode");
      } else {
        this.$store.dispatch("playNextSong");
      }

      setTimeout(() => {
        this.audio.playbackRate = this.playSpeed;
      }, 1000);
    },

    songDotDown(e) {
      this.isSongDotMovable = true;
      this.audio.removeEventListener("timeupdate", this.getCurrentTime);
      this.audio.volume = 0;
    },

    songDotMove(e) {
      if (this.isSongDotMovable) {
        //呼吸点调成橙色
        this.breathStyle = {
          backgroundColor: "orange",
        };

        //滑动距离等于点击位置坐标减去progressBox左侧坐标
        this.songDotX = e.x - this.$refs.progressBox.getBoundingClientRect().left;
        if (this.songDotX < 0) {
          //防止滑块滑出界
          this.songDotX = 0;
        }
        if (this.songDotX > 760) {
          //防止滑块滑出界
          this.songDotX = 760;
        }
        this.audio.currentTime = (this.songDotX / 760) * this.duration;
        this.audio.addEventListener("timeupdate", this.getCurrentTime);
      }
    },

    setSongDot(e) {
      this.songDotX = e.x - this.$refs.progressBox.getBoundingClientRect().left;
      this.audio.currentTime = (this.songDotX / 760) * this.duration;
      this.audio.play();
    },

    volumeDotDown() {
      this.isVolumeDotMovable = true;
    },

    volumeDotMove(e) {
      if (this.isVolumeDotMovable) {
        //音量坐标等于移动后坐标减去volume-adjust-box左侧的坐标
        this.volumeDotX = e.x - this.$refs.volumeAdjustBox.getBoundingClientRect().left;
        if (this.volumeDotX < 0) {
          this.volumeDotX = 0;
        }
        if (this.volumeDotX > 120) {
          this.volumeDotX = 120;
        }
        this.audio.volume = this.volumeDotX / 120;
      }
    },

    setVolumeDot(e) {
      this.volumeDotX = e.x - this.$refs.volumeAdjustBox.getBoundingClientRect().left;
      if (this.volumeDotX < 0) {
        this.volumeDotX = 0;
      }
      if (this.volumeDotX > 120) {
        this.volumeDotX = 120;
      }
      this.audio.volume = this.volumeDotX / 120;
    },

    mute() {
      if (this.isMuteNow == false) {
        this.audio.volume = 0;
        this.lastVolumeDotX = this.volumeDotX;
        this.volumeDotX = 0;
        this.isMuteNow = true;
        this.volumeStateImgUrl = this.volumeMuteImgUrl;
      } else {
        this.volumeDotX = this.lastVolumeDotX;
        this.audio.volume = this.volumeDotX / 120;
        this.isMuteNow = false;
        this.volumeStateImgUrl = this.volumeImgUrl;
      }
    },
  },
};
</script>

<style>
.bottom-box {
  width: 100%;
  height: 80px;
}

.progress-box {
  width: 100%;
  height: 12px;
  margin-top: 10px;
  position: relative;
}

.progress-box:hover {
  cursor: pointer;
}

.progress-bar {
  width: 100%;
  height: 2px;
  margin-top: 5px;
  position: absolute;
  background-color: var(--progress-bar-color);
}

.progressed {
  height: 100%;
  background-color: #c5b5f0;
}

.slider-dot {
  width: 12px;
  height: 12px;
  position: absolute;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.slider-dot:hover {
  cursor: pointer;
}

.slider-dot:active {
  transform: scale(1.5);
}

.breath-dot {
  width: 6px;
  height: 6px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 50%;
  background-color: var(--highlight-deep-color);
}

@keyframes breath {
  0% {
    background-color: #28ca42;
  }
  49% {
    background-color: #28ca42;
  }
  50% {
    background-color: #fff;
  }
  100% {
    background-color: #fff;
  }
}

.time-box {
  width: 80px;
  height: 50px;
  float: left;
  font-size: 13px;
  line-height: 50px;
}

.speed-box {
  width: 58px;
  height: 50px;
  position: relative;
  float: left;
}

.speed-box:hover {
  cursor: pointer;
}

.speed-text-box {
  width: 56px;
  height: 20px;
  margin-top: 15px;
  border-radius: 5px;
  border: 1px solid var(--highlight-deep-color);
}

.speed-text-box:focus {
  outline: none;
}

.speed-text {
  width: 30px;
  height: 20px;
  float: left;
  margin-left: 4px;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
}

.speed-text-box img {
  width: 14px;
  height: 14px;
  margin-top: 3px;
  margin-left: 3px;
}

.speed-options-box {
  position: absolute;
  width: 56px;
  height: 165px;
  z-index: 999;
  top: 0px;
  transform: translateY(-100%);
  border-radius: 8px;
  background-color: var(--background-color);
  filter: drop-shadow(0 0 10px var(--highlight-deep-color));
}

.speed-options-box::before {
  position: absolute;
  width: 12px;
  height: 12px;
  content: "";
  left: 50%;
  bottom: -6px;
  border-radius: 2px;
  transform: translateX(-50%) rotate(45deg);
  background-color: var(--background-color);
}

.speed-option {
  width: 50px;
  height: 20px;
  margin-left: 3px;
  margin-top: 5px;
  line-height: 20px;
  text-align: center;
  border-radius: 5px;
}

.speed-option:first-child {
  margin-top: 10px;
}

.speed-option:hover {
  transform: scale(1.05);
  background-color: var(--highlight-color);
}

.speed-option:active {
  transform: scale(1.1);
}

.play-mode-box {
  width: 30px;
  height: 50px;
  position: relative;
  float: left;
}

.play-mode-box > img {
  width: 20px;
  height: 20px;
  margin-top: 15px;
  margin-left: 5px;
  float: left;
}

.play-mode-box > img:hover {
  cursor: pointer;
}

.play-mode-box > img:focus {
  outline: none;
}

.mode-options-box {
  width: 100px;
  height: 115px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-100%);
  border-radius: 10px;
  background-color: var(--background-color);
  filter: drop-shadow(0 0 10px var(--highlight-deep-color));
}

.mode-options-box::before {
  position: absolute;
  width: 12px;
  height: 12px;
  content: "";
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  background-color: var(--background-color);
  border-radius: 2px;
}

.mode-options-box:hover {
  cursor: pointer;
}

.mode-option {
  width: 80px;
  height: 20px;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 5px;
}

.mode-option:hover {
  transform: scale(1.05);
  background-color: var(--highlight-color);
}

.mode-option:active {
  transform: scale(1.1);
}

.mode-option:first-child {
  margin-top: 10px;
}

.mode-option img {
  width: 20px;
  height: 20px;
  float: left;
  border-radius: 5px 0 0 5px;
}

.mode-option-text {
  width: 60px;
  height: 20px;
  float: left;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  border-radius: 0 5px 5px 0;
}

.mark-box {
  width: 30px;
  height: 50px;
  float: left;
}

.mark-box > img {
  width: 20px;
  height: 20px;
  margin-top: 15px;
  margin-left: 5px;
}

.mark-box > img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.mark-box > img:active {
  transform: scale(1.5);
}

.like-box {
  width: 30px;
  height: 50px;
  float: left;
}

.like-box > img {
  width: 20px;
  height: 20px;
  margin-top: 15px;
  margin-left: 5px;
}

.like-box > img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.like-box > img:active {
  transform: scale(1.5);
}

.play-contral-box {
  width: 124px;
  height: 50px;
  float: left;
  margin-left: 80px;
}

.previous-song {
  width: 40px;
  height: 40px;
  float: left;
}

.previous-song:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.previous-song:active {
  transform: scale(1.5);
}

.palying-or-paused {
  width: 40px;
  height: 40px;
  border: 2px solid #9a79d2;
  border-radius: 50%;
  float: left;
}

.palying-or-paused:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.palying-or-paused:active {
  transform: scale(1.3);
}

.next-song {
  width: 40px;
  height: 40px;
  float: left;
}

.next-song:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.next-song:active {
  transform: scale(1.5);
}

.volume-box {
  width: 180px;
  height: 50px;
  float: right;
}

.volume-box img {
  float: left;
  margin-top: 13px;
}

.volume-box img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.volume-box img:active {
  transform: scale(1.5);
}

.volume-percentage {
  width: 36px;
  height: 20px;
  float: left;
  margin-top: 15px;
  line-height: 20px;
  text-align: center;
  font-size: 10px;
}

.volume-adjust-box {
  width: 120px;
  height: 12px;
  float: right;
  margin-top: 19px;
}

.volume-adjust-box {
  cursor: pointer;
}

.volume-adjust-bar {
  width: 120px;
  height: 2px;
  margin-top: 5px;
  position: absolute;
  background-color: var(--progress-bar-color);
}

.volume-progressed {
  height: 100%;
  background-color: #c5b5f0;
}

.volume-dot {
  width: 6px;
  height: 6px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 50%;
  background-color: var(--highlight-deep-color);
}
</style>
