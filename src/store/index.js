import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import { getSongVkey, getCdn,  getLyric } from "@/network/spider";

export default new Vuex.Store({
  state: {
    appVersion: "1.3.0",
    canShowThemeAnimation: false, 
    currentList: [],   //当前歌单
    currentListIndex: null, //当前歌曲index
    currentSongUrl: '',  //当前歌曲播放链接
    discoverList: [],  //发现歌单
    likedList: [],  //喜欢歌单
    markList: [],   //收藏歌单
    markListIndex: 0,
    playList: [], 
    singerInfo: {},
    albumInfo: {},
    MVUrl: '',
    chooseSingerList: [],
    playMode: 'listForwardMode',  //播放模式
    albumImgRotateStyle: {},  //控制专辑图片旋转
    searchText: '',  //用户搜索内容
    lyric: [],  //歌词
    currentTime: null,  //当前歌曲正在播放的时刻
    isInputFocus: false,  //用户是否正在输入，用于决定是否移除快捷键监听
    selectedSong: {},    //被选中的歌曲，用于暂存需要收藏的歌曲
    dialog: "",          //需要显示对话框组件的名称
    isShowDialog: false, //是否显示对话框
    isShowSettingPanel: false,  //是否显示设置面板
    removeMarkListIndex: null,  //暂存需要删除的歌单的index
    routerHistory: {       //记录最后一次路由跳转历史，用于导航路由和设置路由切换时自动回到上一次路由位置
      navRouter: '/Discover',
      settingRouter: '/Appearance/Background',
    },
    setting: {        //记录用户的设置信息
      appVersion: '1.3.0',
      appearance: {
        background: {
          text: '变色龙',
          value: 'chameleon-theme'
        },
        highlightColor: {
          text: '罗兰紫',
          value: '#c5b5f0'
        },
        font: {
          fontFamily: '系统默认',
          lyricFontFamily: '跟随界面字体',
          fontWeight: { text: "常规", value: "normal" },
          lyricFontWeight: { text: "常规", value: "normal" },
          fontSize: '16px',
          lyricFontSize: '20px',
        }
      }
    },
  },
  mutations: {

    getHistoryData(state) {
      if (localStorage.hasOwnProperty('likedList')) {
        state.likedList = JSON.parse(localStorage.getItem('likedList'))
      }

      if (localStorage.hasOwnProperty('markList')) {
        state.markList = JSON.parse(localStorage.getItem('markList'))
      }

      if (localStorage.hasOwnProperty('setting')) {
        let setting = JSON.parse(localStorage.getItem('setting'))
        if (setting.appVersion === state.appVersion) {
          state.setting = setting
        } else {
          //做一些不同版本兼容性工作

        }
      }

      this.commit('initApp')
    },

    initApp(state) {
      document.body.style.setProperty("--highlight-color", state.setting.appearance.highlightColor.value);
      document.body.style.setProperty("--font-family", state.setting.appearance.font.fontFamily);
      document.body.style.setProperty("--lyric-font-family", state.setting.appearance.font.lyricFontFamily);
      document.body.style.setProperty("--font-weight", state.setting.appearance.font.fontWeight.value);
      document.body.style.setProperty("--lyric-font-weight", state.setting.appearance.font.lyricFontWeight.value);
      document.body.style.setProperty("--font-size", state.setting.appearance.font.fontSize);
      document.body.style.setProperty("--lyric-font-size", state.setting.appearance.font.lyricFontSize);

      //暗主题需要改变文字、进度条等颜色
      if (state.setting.appearance.background.value === "dark-highlight-theme") {
        document.body.style.setProperty("--font-color", "#eee");
        document.body.style.setProperty("--progress-bar-color", "rgba(255,255,255,0.1)");
      }

      //根据不同主题改变背景颜色
      switch (state.setting.appearance.background.value) {
        case "chameleon-theme":
          document.body.style.setProperty("--background-color", "white");
          break;

        case "milk-white-theme":
          document.body.style.setProperty("--background-color", "#fdfdfd");
          break;

        case "dark-highlight-theme":
          document.body.style.setProperty("--background-color", "#171717");
          break;

        case "simple-green-theme":
          document.body.style.setProperty("--background-color", "#dffff5");
          break;

        case "colorful-theme":
          document.body.style.setProperty("--background-color", "white");
          break;
      }
    },

    setCanShowThemeAnimation(state,canShowThemeAnimation){
      state.canShowThemeAnimation = canShowThemeAnimation
    },

    sendCurrentIndex(state, payload) {
      state.currentListIndex = payload.index

      //将点击歌曲所在的歌单复制一份给当前歌单
      //不要直接两者相等，不然两歌单可能会相互干扰
      state.currentList = []
      state.currentList.push(...payload.list)
    },

    setCurrentListIndex(state, currentListIndex) {
      state.currentListIndex = currentListIndex
    },

    setCurrentSongUrl(state, songUrl) {
      state.currentSongUrl = songUrl
    },

    setLyric(state, lyric) {
      state.lyric = lyric
    },

    setSearchList(state, searchList) {
      state.searchList = searchList
    },

    setSearchText(state, searchText) {
      state.searchText = searchText
      console.log(state.searchText)
    },

    setSearchPage(state, searchPage) {
      state.searchPage = searchPage
    },

    setPlayList(state, playList) {
      state.playList = playList
    },

    setSingerInfo(state, singerInfo) {
      state.singerInfo = singerInfo
    },

    setAlbumInfo(state, albumInfo) {
      state.albumInfo = albumInfo
    },

    setMVUrl(state, MVUrl) {
      state.MVUrl = MVUrl
    },

    setChooseSingerList(state, chooseSingerList) {
      state.chooseSingerList = chooseSingerList
    },

    pushSearchLoadMore(state, loadMoreList) {
      state.searchList.push(...loadMoreList)
    },

    sendMarkListIndex(state, markListIndex) {
      state.markListIndex = markListIndex
    },

    sendPlayMode(state, mode) {
      state.playMode = mode
    },

    sendCurrentTime(state, currentTime) {
      state.currentTime = currentTime
    },

    sendInputFocus(state, isInputFocus) {
      state.isInputFocus = isInputFocus
    },

    sendSelectedSong(state, selectedSong) {
      state.selectedSong = selectedSong
    },

    sendRemoveMarkListIndex(state, removeMarkListIndex) {
      state.removeMarkListIndex = removeMarkListIndex
    },

    showDialog(state, dialog) {
      state.dialog = dialog
      console.log('state.dialog',state.dialog)
      state.isShowDialog = true
    },

    hideDialog(state) {
      state.isShowDialog = false
    },

    showSettingPanel(state) {
      state.isShowSettingPanel = true
    },

    hideSettingPanel(state) {
      state.isShowSettingPanel = false
    },

    setRouterHistory(state, payload) {
      if (payload.router === 'nav') {
        state.routerHistory.navRouter = payload.path
      }
      if (payload.router === 'setting') {
        state.routerHistory.settingRouter = payload.path
      }
    },

    setBackground(state, background) {
      state.setting.appearance.background = background
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setHighlightColor(state, highlightColor) {
      state.setting.appearance.highlightColor = highlightColor
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setFontFamily(state, fontFamily) {
      state.setting.appearance.font.fontFamily = fontFamily
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setLyricFontFamily(state, lyricFontFamily) {
      state.setting.appearance.font.lyricFontFamily = lyricFontFamily
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setFontWeight(state, fontWeight) {
      state.setting.appearance.font.fontWeight = fontWeight
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setLyricFontWeight(state, lyricFontWeight) {
      state.setting.appearance.font.lyricFontWeight = lyricFontWeight
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setFontSize(state, fontSize) {
      state.setting.appearance.font.fontSize = fontSize
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setLyricFontSize(state, lyricFontSize) {
      state.setting.appearance.font.lyricFontSize = lyricFontSize
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    //新建歌单
    addSongList(state, inputText) {
      let newSongList = {
        name: inputText,
        list: []
      }
      state.markList.push(newSongList)

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    //删除歌单
    removeSongList(state) {
      state.markList.splice(state.removeMarkListIndex, 1)
      Vue.prototype.$message.showMessage({
        type: 'success',
        message: '歌单已被删除'
      })

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    renameSongList(state, payload) {
      let index = payload.index
      let newName = payload.newName
      state.markList[index].name = newName
    },

    addMarkSong(state, markListIndex) {
      state.markList[markListIndex].list.unshift(state.selectedSong)
      Vue.prototype.$message.showMessage({
        type: "success",
        message: "收藏成功，歌曲已加入歌单",
      });

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    //收藏歌曲只能从收藏页面移除
    removeMarkSong(state, songIndex) {
      state.markList[state.markListIndex].list.splice(songIndex, 1)
      Vue.prototype.$message.showMessage({
        type: 'success',
        message: '已将此歌曲从收藏列表移除'
      })

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    sendLikedSong(state, item) {

      let isThisSongLiked = false
      let likedSongIndex = null

      //检测当前歌曲是否已在喜欢的列表中
      state.likedList.forEach((likedItem, index) => {
        if (likedItem.songID === item.songID) {
          isThisSongLiked = true
          likedSongIndex = index
        }
      })

      if (isThisSongLiked === false) {

        //喜欢列表没有此歌曲，则加入喜欢列表
        state.likedList.unshift(item)

      } else {

        //喜欢列表已有此歌曲，则将此歌曲从喜欢列表移除
        state.likedList.splice(likedSongIndex, 1)

      }

      localStorage.setItem('likedList', JSON.stringify(state.likedList))
    },

    //修改专辑图片样式，使专辑图片开始转动
    albumRotateRunning(state) {
      state.albumImgRotateStyle = {
        'animation': 'albumRotate 20s linear infinite running'
      }
    },

    //修改专辑图片样式，使专辑图片暂停转动（保持已转动的角度）
    albumRotatePaused(state) {
      state.albumImgRotateStyle = {
        'animation': 'albumRotate 20s linear infinite paused'
      }
    },
  },
  actions: {

    async playCurrentSong({ state, commit }) {

      let currentSong = state.currentList[state.currentListIndex]

      function generateGuid() {
        const t = new Date().getUTCMilliseconds();
        const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
        window.localStorage.guid = guid;
        return guid;
      }

      let guid = generateGuid();
      console.log("guid", guid);

      let songID = currentSong.songID
      console.log("songID", songID);

      let purl = await getSongVkey({
        songMid: songID,
      });
      console.log("purl", purl);

      //提示vip歌曲无法播放
      if(purl == '') {
        Vue.prototype.$message.showMessage({
          type: 'error',
          message: "无法请求播放数据，可能为vip付费歌曲，即将播放下一首。"
        })
        commit('albumRotatePaused')
        setTimeout(() => {
          this.dispatch('playNextSong')
        },5000)
      }
      let cdn = await getCdn(guid);
      console.log("cdn", cdn);
      console.log("url", cdn + purl);

      let songUrl = cdn + purl

      commit('setCurrentSongUrl', songUrl)
      console.log('state.currentSongUrl', state.currentSongUrl)

      let lyric = []
      try{
        lyric = await getLyric(songID)
      }catch(err) {
        Vue.prototype.$message.showMessage({
          type: 'error',
          message: "请求歌词出错：" + err
        })
      }
      
      commit('setLyric', lyric.lyricList)
    },

    playNextSong({ state, commit , dispatch}) {

      commit('setCurrentListIndex',state.currentListIndex + 1)

      //各个列表下一首到头了，则将index停留在最后一位
      if (state.currentListIndex < state.currentList.length) {
        dispatch('playCurrentSong')
      } else {
        //当播放列表index超出，如果是列表循环模式，则将index置零，从头开始播放
        if (state.playMode === "listCycleMode") {
          commit('setCurrentListIndex', 0)
          dispatch('playCurrentSong')
        } else {
          //如果不是列表循环模式，则index停留在最后
          commit('setCurrentListIndex', state.currentList.length - 1)
        }
      }
    },

    playPreviousSong({ state, commit , dispatch}) {
      //各个列表上一首到头则index重新置零
      commit('setCurrentListIndex',state.currentListIndex - 1)
      if (state.currentListIndex >= 0) {
        dispatch('playCurrentSong')
      } else {
        commit('setCurrentListIndex',0)
      }
    },

    //处理随机播放模式下的下一首
    handleRandomMode({ state, commit , dispatch}) {
      let randomIndex = Math.floor(Math.random() * state.currentList.length)
      commit('setCurrentListIndex', randomIndex)
      this.dispatch('playCurrentSong')
    },
    
  },
  modules: {
  }
})
